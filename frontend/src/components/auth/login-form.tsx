'use client'

import {Card, CardFooter, CardHeader} from "@/components/ui/card";
import {Header} from "@/components/auth/header";
import {Social} from "@/components/auth/social";


export const LoginForm = () => {

  return (
    <Card className={'w-[400px] shadow-md'}>
      <CardHeader>
        <Header label={'Welcome'}/>
      </CardHeader>
      {(
        <CardFooter>
          <Social/>
        </CardFooter>
      )}
    </Card>
  )
}
