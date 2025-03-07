'use client'
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {lazy} from "react";

const Dashboard = lazy(() => import("@/app/_components/table/table"))

export function DashboardEmployees() {

  return (
    <div className='flex w-full flex-col'>
      <div className='flex flex-1 flex-col gap-4 md:gap-8 md:p-8'>
        <CardHeader>
          Employees
        </CardHeader>
        <Card className='pt-6'>
          <CardContent>
            <Dashboard/>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}