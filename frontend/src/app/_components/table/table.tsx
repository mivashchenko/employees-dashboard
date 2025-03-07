'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

import {useState} from "react"
import {
  Cell, ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  Header,
  Row,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";

import {dashboardTableColumns} from "@/app/_components/table/columns";
import {Employee} from "@/types";
import {DashboardTableToolbar} from "@/app/_components/table/toolbar";
import {DashboardTablePagination} from "@/app/_components/table/pagination";
import {deleteEmployee} from "@/actions/delete-employee";
import {useMutation, useSuspenseQuery} from "@tanstack/react-query";
import {queryEmployees} from "@/data/query/query-employees";
import {getQueryClient} from "@/lib/react-query/client";
import {newEmployee} from "@/actions/new-employee";
import {createParamsObject, createSortingParams, exportJsonToCSV, prepareEmployeesDataForExport} from "@/utils";
import {getEmployees} from "@/data/get-employees";
import {editEmployee} from "@/actions/edit-employee";

export const DashboardTable = () => {
  const queryClient = getQueryClient()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 10})
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
  const filters = createParamsObject(columnFilters)


  const params = {
    name: filters.name,
    email: filters.email,
    departmentIds: filters.departmentId,
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    ...createSortingParams(sorting),
  } as {
    // TODO: Define the type of the params object
    name?: string;
    email?: string;
    departmentIds?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    pageSize?: number;
  }

  const {data: employees} = useSuspenseQuery(queryEmployees(params))


  const {
    mutate: newEmployeeMutator,
  } = useMutation(
    {
      mutationFn: newEmployee,
      onMutate: (variables) => {
        console.log('Mutation started with:', variables)
      },
      onSuccess: (data) => {
        console.log('Mutation successful:', data)

        queryClient.invalidateQueries({queryKey: ['employees', params]})
      },
      onError: (error) => {
        console.error('Mutation error:', error);
      },
      onSettled: () => {
        console.log('Mutation settled (either success or error)')
      },
    },
    queryClient,
  )

  const {
    mutate: handleDeleteEmployee,
  } = useMutation(
    {
      mutationFn: deleteEmployee,
      onMutate: (variables) => {
        console.log('Mutation started with:', variables)
      },
      onSuccess: (data) => {
        console.log('Mutation successful:', data)

        queryClient.invalidateQueries({queryKey: ['employees', params]})
      },
      onError: (error) => {
        console.error('Mutation error:', error);
      },
      onSettled: () => {
        console.log('Mutation settled (either success or error)')
      },
    },
    queryClient,
  )

    const {
    mutate: handleEditEmployee,
  } = useMutation(
    {
      mutationFn: editEmployee,
      onMutate: (variables) => {
        console.log('Mutation started with:', variables)
      },
      onSuccess: (data) => {
        console.log('Mutation successful:', data)

        queryClient.invalidateQueries({queryKey: ['employees', params]})
      },
      onError: (error) => {
        console.error('Mutation error:', error);
      },
      onSettled: () => {
        console.log('Mutation settled (either success or error)')
      },
    },
    queryClient,
  )

  const table = useReactTable({
    data: employees?.data,
    columns: dashboardTableColumns({onDeleteEmployee: handleDeleteEmployee, onEditEmployee: handleEditEmployee}),
    getCoreRowModel: getCoreRowModel(),
    rowCount: employees.totalEmployees,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),

    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })


  const renderHeader = () => {
    const cellRenderer = (header: Header<Employee, unknown>) => {
      const content = flexRender(
        header.column.columnDef.header,
        header.getContext()
      )

      return (
        <TableHead key={header.id} colSpan={header.colSpan}>
          {header.isPlaceholder ? null : content}
        </TableHead>
      )
    }

    const rowRenderer = (headerGroup: { id: string; headers: Header<Employee, unknown>[] }) => {

      return (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map(cellRenderer)}
        </TableRow>
      )
    }

    return <TableHeader>
      {table.getHeaderGroups().map(rowRenderer)}
    </TableHeader>
  }


  const renderTableBody = () => {
    const rows = table.getRowModel().rows
    const hasRows = !!rows.length

    const noResultsRow = (
      <TableRow>
        <TableCell
          colSpan={dashboardTableColumns.length}
          className="h-24 text-center"
        >
          No results.
        </TableCell>
      </TableRow>
    )

    const cellRenderer = (cell: Cell<Employee, unknown>) => {
      const content = flexRender(
        cell.column.columnDef.cell,
        cell.getContext()
      )

      return (
        <TableCell key={cell.id}>
          {content}
        </TableCell>
      )
    }

    const rowRenderer = (row: Row<Employee>) => {
      const dataState = row.getIsSelected() && "selected"
      const content = row.getVisibleCells().map(cellRenderer)

      return (
        <TableRow
          key={row.id}
          data-state={dataState}
        >
          {content}
        </TableRow>
      )
    }

    return <TableBody>
      {hasRows ? rows.map(rowRenderer) : noResultsRow}
    </TableBody>
  }

  const handleExportToPdf = async () => {
    const {data} = await getEmployees({
      pageSize: employees.totalEmployees,
    });

    exportJsonToCSV(prepareEmployeesDataForExport(data), `employees ${new Date().toISOString().split('T')[0]}`);
  }

  return <div className="space-y-4">
    <DashboardTableToolbar table={table} onExportToPdf={handleExportToPdf} onAddNewEmployee={newEmployeeMutator}/>
    <div className={'rounded-md border'}>
      <Table>
        {renderHeader()}
        {renderTableBody()}
      </Table>
    </div>
    <DashboardTablePagination table={table}/>
  </div>
}

export default DashboardTable