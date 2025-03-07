import {queryOptions} from "@tanstack/react-query";
import {Department} from "@/types";
import {getDepartments} from "@/data/get-departments";

export const queryDepartments = () => queryOptions({
  queryKey: ['departments'],
  queryFn: async () => {
    return getDepartments();
  },
  placeholderData: { data: [] as Department[] },
});