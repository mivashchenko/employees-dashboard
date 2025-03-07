'use client'

import {useState, useTransition} from "react";
import {NewEmployeeSchema} from "@/schemas";
import {z} from "zod";
import {EmployeeForm} from "@/app/_components/employee-form";
import {editEmployee} from "@/actions/edit-employee";

export const EditEmployeeForm = ({
                                   defaultValues,
                                 }) => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()


  const handleSubmit = (values: z.infer<typeof NewEmployeeSchema>) => {
    startTransition(() => {
      editEmployee({...defaultValues, ...values}).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })

  }

  return <EmployeeForm {...{
    defaultValues,
    onSubmit: handleSubmit,
    isPending,
    error,
    success,
  }}/>

}