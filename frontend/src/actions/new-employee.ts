'use server'

import {NewEmployeeSchema} from "@/schemas";
import {fetcher} from "@/shared/api/fetcher";

export const newEmployee = async (values: typeof NewEmployeeSchema) => {
  const validatedFields = NewEmployeeSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: 'Invalid fields!'};
  }

  const {email, name, departmentId} = validatedFields.data;

  try {
    await fetcher('/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, name, departmentId}),
    });

    return {success: 'Employee created successfully!'};
  } catch (error) {
    console.error('Error creating new employee:', error);
    return {error: 'Failed to create new employee.'};
  }
};