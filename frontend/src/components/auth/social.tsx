'use client'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/button'
import {login} from "@/actions/login";

export const Social = () => {
  const handleClick = () => {
    login('google')
  }

  return (
    <div className={'flex w-full items-center gap-x-2'}>
      <Button
        className={'w-full'}
        size={'lg'}
        variant={'outline'}
        onClick={() => handleClick()}
      >
        Login with <FcGoogle className={'h-5 w-5'} />
      </Button>
    </div>
  )
}
