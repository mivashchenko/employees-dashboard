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
}

export const DashboardTableActionsDropdown = ({
                                                data,
                                                onDelete
                                              }: DashboardTableActionsDropdownProps) => {

  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-[20px] w-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4"/>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onClick={() => navigator.clipboard.writeText(String(data.id))}
      >
        Copy data
      </DropdownMenuItem>
      <DropdownMenuSeparator/>
      <FormDrawerDialog
        title={'Employees'}
        button={<div>Edit employee</div>}
        form={<EditEmployeeForm defaultValues={data}/>}
      />
      <DropdownMenuItem onClick={() => onDelete(data.id)}>Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}