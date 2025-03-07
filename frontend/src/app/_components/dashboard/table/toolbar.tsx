"use client"

import {Table} from "@tanstack/react-table"
import {X} from "lucide-react"

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {DashboardTableFilter} from "@/app/_components/dashboard/table/filter";
import {DashboardTableViewOptions} from "@/app/_components/dashboard/table/view-options";
import {FormDrawerDialog} from "@/components/form-drawer-dialog";
import {NewEmployeeForm} from "@/app/_components/new-employee-form";
import {FaPlus} from "react-icons/fa6";
import {useSuspenseQuery} from "@tanstack/react-query";
import {queryDepartments} from "@/data/query/query-departments";
import {PiFileCsvDuotone} from "react-icons/pi";

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  onExportToPdf: () => void
  onAddNewEmployee: (values: unknown) => void
}

export function DashboardTableToolbar<TData>({
                                               table,
                                               onExportToPdf,
                                               onAddNewEmployee,
                                             }: DataTableToolbarProps<TData>) {

  const {data: departments} = useSuspenseQuery(queryDepartments())

  const isFiltered = table.getState().columnFilters.length > 0

  const renderInput = () => {


    const value = (table.getColumn("name")?.getFilterValue() as string) ?? ""
    const handleChange = (event: { target: { value: string; }; }) =>
      table.getColumn("name")?.setFilterValue(event.target.value)

    return <Input
      className="h-8 w-[150px] lg:w-[250px]"
      placeholder="Filter employees..."
      value={value}
      onChange={handleChange}
    />
  }

  const renderFilters = () => {
    const filters = [
      {
        column: 'departmentId',
        title: 'Department',
        options: departments?.data.map(department => ({
          value: department.id,
          label: department.name
        }))
      }
    ]

    return filters.map(filter => {
      const column = table.getColumn(filter.column)
      if (!column) return null

      return <DashboardTableFilter
        key={filter.column}
        column={column}
        title={filter.title}
        options={filter.options}
      />
    })
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {renderInput()}
        {renderFilters()}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X/>
          </Button>
        )}


      </div>
      <div className="flex items-center justify-between space-x-2">
        <Button onClick={onExportToPdf}><PiFileCsvDuotone /></Button>
        <FormDrawerDialog
          title={'Employees'}
          button={<Button><FaPlus/></Button>}
          form={<NewEmployeeForm onSubmit={onAddNewEmployee}/>}
        />
        <DashboardTableViewOptions table={table}/>
      </div>

    </div>
  )
}