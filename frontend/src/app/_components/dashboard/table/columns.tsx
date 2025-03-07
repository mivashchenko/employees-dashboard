import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Employee} from "@/types";
import {DashboardTableColumnHead} from "@/app/_components/dashboard/table/column-head";
import {DashboardTableActionsDropdown} from "@/app/_components/dashboard/table/actions-dropdown";

export const dashboardTableColumns: ({onDeleteEmployee, onEditEmployee}) => ColumnDef<Employee>[] = ({onDeleteEmployee, onEditEmployee}) => [
  {
    id: "select",
    header: ({table}) => (
      <Checkbox
        checked={
          !!(table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate"))
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
  },
  {
    header: () => {
      return <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
      >
        <span>ID</span>
      </Button>
    },
    accessorKey: 'id',
    enableSorting: false,
    enableColumnFilter: false,
    cell: info => {
      return <Link className={'hover:underline text-blue-500'} href={`/message-details/${info.getValue()}`}>
        {info.getValue<number>()}
      </Link>
    }
  },
  {
    accessorKey: 'name',
    cell: info => {
      return <span className='truncate'>{info.getValue<string>()}</span>
    },
    header: ({column}) => (
      <DashboardTableColumnHead column={column} title="User"/>
    )
  },
  {
    accessorKey: 'email',
    header: ({column}) => (
      <DashboardTableColumnHead column={column} title="Email"/>
    ),
  },
  {
    header: ({column}) => (
      <DashboardTableColumnHead column={column} title="Department"/>
    ),
    accessorKey: 'departmentId',
    cell: ({row}) => {
      const data = row.original
      return <span className='truncate'>{data.department.name}</span>
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({row}) => {
      const data = row.original
      return (
        <DashboardTableActionsDropdown data={data} onDelete={onDeleteEmployee} onEditEmployee={onEditEmployee}/>
      )
    },
  }
]