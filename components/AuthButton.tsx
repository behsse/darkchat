"use client"

import { signIn, signOut } from 'next-auth/react'
import { Button } from './ui/button'

export const LoginButton = () => {
  return (
    <Button onClick={() => signIn()}>Sign In</Button>
  )
}

export const LogoutButton = () => {
    return (
      <Button onClick={() => signOut({ callbackUrl: '/', redirect:true })}>Sign Out</Button>
    )
  }