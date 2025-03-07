import {fetcher} from "@/shared/api/fetcher";
import {EmployeesResponse} from "@/types";

export const getEmployees = async (params?: {
  name?: string;
  email?: string;
  departmentIds?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  pageSize?: number;
}) => {

  if (!params) return await fetcher<EmployeesResponse>('/employees', {
    headers: {
      method: 'GET',
    }
  });
  try {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value.toString());
    });

    const url = `/employees?${queryParams.toString()}`;

    return await fetcher<EmployeesResponse>(url, {
      headers: {
        method: 'GET',
      }
    })

  } catch
    (error) {
    console.error("Failed to fetch employees:", error);
    return {
      data: [],
      totalEmployees: 0,
      total: 0,
    };
  }
}

