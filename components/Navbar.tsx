"use client"

import {LogoutButton} from './AuthButton'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { createPost } from '@/app/api/post/route'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useSession } from "next-auth/react";
import { ThemeToggle } from './ui/dark-mode'


export default function Navbar() {

    const {data : session} = useSession()

  return (
    <div className='flex items-start justify-between px-20 py-8'>
        <p className='font-bold'>DarkChat.</p>
        <AlertDialog>
            <AlertDialogTrigger className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'>Add post</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Nouveau post</AlertDialogTitle>
                    <AlertDialogDescription>
                        <form action={createPost} className='grid gap-4'>
                            <Textarea name="text" placeholder="Erire un post"/>
                            <div className='flex justify-end gap-4'>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <Button type="submit">Post</Button>
                            </div>
                        </form>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
        <div className='flex items-center gap-10'>
            <ThemeToggle/>
            <DropdownMenu>
                <DropdownMenuTrigger>
                <Avatar className='outline-none'>
                    <AvatarImage src={`${session?.user.image}`} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className='w-full flex justify-center py-2'>
                        <LogoutButton/>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
  )
}
