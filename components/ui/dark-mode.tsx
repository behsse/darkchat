"use client"

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from 'next-themes'
import React from 'react'
import {Moon, SunMedium} from "lucide-react"

export const ThemeToggle = () => {
    const {setTheme, theme} = useTheme()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className='rounded-full relative outline-none'>
                    <SunMedium size={20} className='rotate-0 scale-100 transition-all dark:scale-0'/>
                    <Moon size={20} className='absolute top-0 scale-0 transition-all dark:scale-100'/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => {setTheme("light")}}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {setTheme("dark")}}>
                    Dark
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
