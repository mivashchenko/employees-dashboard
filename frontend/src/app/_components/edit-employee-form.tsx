'use client'

import {useState, useTransition} from "react";
import {NewEmployeeSchema} from "@/schemas";
import {z} from "zod";
import {EmployeeForm} from "@/app/_components/employee-form";
import {useSuspenseQuery} from "@tanstack/react-query";
import {queryDepartments} from "@/data/query/query-departments";

export const EditEmployeeForm = ({
                                   defaultValues,
  onSubmit,
                                 }) => {

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

   const {data: departments} = useSuspenseQuery(queryDepartments())

  const handleSubmit = (values: z.infer<typeof NewEmployeeSchema> & {
    id: string
  }) => {
    startTransition(() => {
      if (!onSubmit) return

      onSubmit({...defaultValues, ...values}, {
        onSuccess: (data) => {
          setSuccess(data?.success)
          setError(data?.error)
        },
      })

    })

  }

  return <EmployeeForm {...{
    defaultValues,
    onSubmit: handleSubmit,
    isPending,
    error,
    success,
    departments: departments.data,
  }}/>

}