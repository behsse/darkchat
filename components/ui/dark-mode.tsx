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
                <div className='rounded-full'>
                    <SunMedium size={20} className='rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'/>
                    <Moon size={20} className='absolute rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100'/>
                    <span className='sr-only'> Toggle Theme</span>
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
