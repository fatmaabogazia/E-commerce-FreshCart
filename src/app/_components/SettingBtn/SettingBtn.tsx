"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function SettingBtn() {

    const { status } = useSession()

    const [openMenu, setOpenMenu] = useState(false)

    return (
        <>
            {status === "authenticated" && <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className='rounded-full text-white bg-emerald-300 flex p-4 size-6 fixed start-5 top-20 z-20 hover:bg-emerald-500 hover:text-white cursor-pointer'>
                        {openMenu ? <i className="fa-solid fa-x"></i> : <i className="fa-solid fa-gear"></i>} </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className="text-slate-400">Settings</DropdownMenuLabel>
                    <Link href={"/changePassword"} >
                        <DropdownMenuItem >Change Your Password</DropdownMenuItem>
                    </Link>
                    <Link href={"/addresseUser"}>
                        <DropdownMenuItem>Addresses Details </DropdownMenuItem>
                    </Link>
                    <Link href={"/allorders"} >
                        <DropdownMenuItem>Your Orders </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>}
        </>
    )
}
