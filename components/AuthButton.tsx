"use client"

import { signIn, signOut } from 'next-auth/react'
import { Button } from './ui/button'

export const SignInButton = () => {
  return (
    <Button onClick={() => signIn()}>Sign In</Button>
  )
}

export const SingOutButton = () => {
    return (
      <div className='flex justify-center py-2 w-full'>
        <Button onClick={() => signOut({ callbackUrl: '/', redirect:true })}>Sign Out</Button>
      </div>
    )
  }