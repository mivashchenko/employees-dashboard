import {queryOptions} from "@tanstack/react-query";
import {Employee} from "@/types";
import {getEmployees} from "@/data/get-employees";

export const queryEmployees = (params?: {
  name?: string;
  email?: string;
  departmentIds?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  pageSize?: number;
}) => queryOptions({
  queryKey: ['employees', params],
  queryFn: async () => {
    return getEmployees(params);
  },
  placeholderData: { data: [] as Employee[], totalEmployees: 0, total: 0 },
});