'use server'

import {NewEmployeeSchema} from "@/schemas";
import {fetcher} from "@/shared/api/fetcher";

export const editEmployee = async (values: typeof NewEmployeeSchema & { id: string }) => {

  const validatedFields = NewEmployeeSchema.safeParse(values);

  console.log(values, 2222222222222222)

  if (!validatedFields.success) {
    return {error: 'Invalid fields!'}
  }

  const {email, name, departmentId} = validatedFields.data

  try {
    await fetcher(`/employees/${values.id}`, {
      method: 'PUT',
      body: JSON.stringify({email, name, departmentId}),
    });

    return {success: 'Employee info changed!'}
  } catch (error) {
    console.log('Failed to change employee info:', error)
    return {error: 'Failed to change employee info!'}
  }
}