export type Employee = {
  id: number;
  name: string;
  email: string;
  department: Department;
}


export type Department = {
  id: number;
  name: string;
}

export type EmployeesResponse = {
  data: Employee[];
  totalEmployees: number;
  total: number;
}