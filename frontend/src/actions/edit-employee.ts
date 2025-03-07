'use server'

import {NewEmployeeSchema} from "@/schemas";
import {fetcher} from "@/shared/api/fetcher";

export const editEmployee = async (values: typeof NewEmployeeSchema & {id: string}) => {

  const validatedFields = NewEmployeeSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: 'Invalid fields!'}
  }

  const {email, name, departmentId} = validatedFields.data

  try {
    await fetcher(`/employees/${values.id}`, {
    headers: {
      method: 'PUT',
    },
    body: JSON.stringify({email, name, departmentId}),
  });

    return {success: 'New employee created!'}
  } catch (error) {
    console.log('Failed to create new employee:', error)
    return {error: 'Failed to create new employee!'}
  }
}