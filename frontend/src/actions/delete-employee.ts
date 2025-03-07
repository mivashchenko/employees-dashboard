'use server'

import {fetcher} from "@/shared/api/fetcher";

export const deleteEmployee = async (id) => {

  if(!id) {
    return {error: 'Invalid id!'}
  }

  return await fetcher(`/employees/${id}`, {
    method: 'DELETE',
  });
}