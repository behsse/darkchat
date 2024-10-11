"use client"

import { useState } from "react";
import {SignInButton, SingOutButton} from './AuthButton'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useSession } from "next-auth/react";
import { ThemeToggle } from './ui/dark-mode'
import { usePosts } from "@/lib/PostContext";
import Link from "next/link";

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const {data : session} = useSession();
    const { addPost } = usePosts();
    
    const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (!session) {
            setAlertMessage("You are not logged in. Please log in to create a post.");
            return;
        }

        try {
            const response = await fetch("/api/post/createPost", {
                method: "POST",
                body: formData,
            });
            
            if (response.ok) {
                const newPost = await response.json();
                addPost(newPost);
                setIsOpen(false);
            }
            
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    return (
        <div className='flex items-center justify-between py-8'>
            <Link className='font-bold text-xl' href="/">DarkChat.</Link>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger 
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    onClick={() => {setIsOpen(true) ; setAlertMessage(null)}}
                >Add post</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>New post</AlertDialogTitle>
                        <AlertDialogDescription>
                            <form onSubmit={createPost} className='grid gap-4'>
                                <Textarea name="text" placeholder="Erire un post"/>
                                {alertMessage && <p className="text-destructive">{alertMessage}</p>}
                                <div className='flex justify-end items-center gap-4'>
                                    <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                                    <div className="flex items-end h-full">
                                        <Button type="submit">Post</Button>
                                    </div>
                                </div>
                            </form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
            <div className='flex items-center gap-4'>
                <ThemeToggle/>
                {session?
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                        <Avatar className='outline-none w-8 h-8'>
                            <AvatarImage src={`${session.user?.image || ""}`} />
                            <AvatarFallback>DC.</AvatarFallback>
                        </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />     
                            <DropdownMenuItem>
                                <Link href={`/${session.user.username}`}>Profile</Link>
                            </DropdownMenuItem>                
                            <DropdownMenuSeparator />     
                            <SingOutButton/>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    : 
                    <SignInButton/>
                }
            </div>
        </div>
    )
}
