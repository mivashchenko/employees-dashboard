import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {json2csv} from "json-2-csv";
import {Employee} from "@/types";
import {ColumnFiltersState} from "@tanstack/react-table";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const exportJsonToCSV = (jsonData: object[], filename = "export.csv") => {
  try {
    const csv = json2csv(jsonData);
    const blob = new Blob([csv], {type: "text/csv;charset=utf-8;"});
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting JSON to CSV:", error);
  }
}

export const prepareEmployeesDataForExport = (data: Employee[]) => {
  return data.map((row: Employee) => {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      department: row.department.name,
    }
  })
}

export const createParamsObject = (filters: ColumnFiltersState): Record<string, unknown> => {
  const params: Record<string, unknown> = {};

  filters.forEach(({id, value}) => {
    // Check if the value is an array and handle accordingly
    if (Array.isArray(value)) {
      // Directly assign the array to the property (no conversion to string)
      params[id] = value;
    } else {
      // For single values, just assign them directly
      params[id] = value;
    }
  });

  return params;
}

export const createSortingParams = (sorting: {
  id: string;
  desc: boolean
}[] = [], defaultSortBy = 'id', defaultSortOrder = 'asc') => {
  // Default sorting (if no sorting provided)
  if (sorting.length === 0) {

    return {
      sortBy: defaultSortBy,
      sortOrder: defaultSortOrder.toLowerCase() === 'desc' ? 'desc' : 'asc',
    }
  }


  // Transform sorting array into Prisma orderBy format
  return sorting.reduce((acc, {id, desc}) => {
    acc.sortBy = id;
    acc.sortOrder = desc ? 'desc' : 'asc';
    return acc;
  }, {
    sortBy: '',
    sortOrder: '',
  });
}