import {fetcher} from "@/shared/api/fetcher";
import {EmployeesResponse} from "@/types";

export const getDepartments = async () => {
  try {
    const url = `/departments`;

    return await fetcher<EmployeesResponse>(url, {
      headers: {
        method: 'GET',
      }
    })

  } catch
    (error) {
    console.error("Failed to fetch departments:", error);
    return {
      data: [],
    };
  }
}

