'use client'
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {DashboardTable} from "@/app/_components/dashboard/table/table";

export function Dashboard() {

  return (
    <div className='flex w-full flex-col'>
      <div className='flex flex-1 flex-col gap-4 md:gap-8 md:p-8'>
        <CardHeader>
          Employees
        </CardHeader>
        <Card className='pt-6'>
          <CardContent>
            <DashboardTable/>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}