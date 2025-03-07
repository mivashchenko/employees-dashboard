'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import {NewEmployeeSchema} from "@/schemas";

import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {cn} from "@/utils";
import {Input} from "@/components/ui/input";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Department} from "@/types";

const DEFAULT_VALUES = {
  name: '',
  email: '',
  departmentId: 1,
}

interface EmployeeFormProps {
  className?: string
  defaultValues?: z.infer<typeof NewEmployeeSchema>
  onSubmit: (values: z.infer<typeof NewEmployeeSchema>) => void
  isPending: boolean
  error: string | undefined
  success: string | undefined
  departments: Department[]
}


export const EmployeeForm = ({
                               className,
                               defaultValues = DEFAULT_VALUES,
                               onSubmit,
                               isPending,
                               error,
                               success,
                               departments
                             }: EmployeeFormProps) => {
  const form = useForm<z.infer<typeof NewEmployeeSchema>>({
    resolver: zodResolver(NewEmployeeSchema),
    defaultValues,
  })

  return <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn('space-y-6', className)}
    >
      <div className={'space-y-6'}>
        <FormField
          control={form.control}
          name={'name'}
          render={({field}) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={'Jonh Doe'}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name={'email'}
          render={({field}) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={'jonh.doe@example.com'}
                    type={'email'}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name={'departmentId'}
          render={({field}) => {
            return (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={'Select a department'}/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departments.map(department => (
                      <SelectItem key={department.id} value={String(department.id)}>
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )
          }}
        />
      </div>
      <FormError message={error}/>
      <FormSuccess message={success}/>
      <Button type={'submit'} className={'w-full'} disabled={isPending}>
        Confirm
      </Button>
    </form>
  </Form>

}