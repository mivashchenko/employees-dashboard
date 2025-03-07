import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import {Employee} from "@/types";
import {FormDrawerDialog} from "@/components/form-drawer-dialog";
import {EditEmployeeForm} from "@/app/_components/edit-employee-form";

interface DashboardTableActionsDropdownProps {
  data: Employee;
  onDelete: (id: number) => void;
  onEditEmployee: (values: unknown) => void;
}

export const DashboardTableActionsDropdown = ({
                                                data,
                                                onDelete,
                                                onEditEmployee
                                              }: DashboardTableActionsDropdownProps) => {

  const renderTempEditEmployeeFormTrigger = () => {
    return <div
      className={'hover:bg-accent relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0'}
    >
      Edit Employee
    </div>
  }

  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-[20px] w-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4"/>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator/>
      <FormDrawerDialog
        title={'Employees'}
        button={renderTempEditEmployeeFormTrigger()}
        form={<EditEmployeeForm defaultValues={data} onSubmit={onEditEmployee}/>}
      />
      <DropdownMenuItem onClick={() => onDelete(data.id)}>Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}