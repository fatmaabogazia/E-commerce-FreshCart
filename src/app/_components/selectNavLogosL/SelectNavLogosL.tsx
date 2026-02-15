"use client";

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";

export default function SelectNavLogosL() {

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Links</Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuLabel className="text-slate-300">Social</DropdownMenuLabel>
                    <Link href={"https://www.instagram.com/"} target="blank">
                        <DropdownMenuItem ><i className="fa-brands fa-instagram"></i> </DropdownMenuItem>
                    </Link>
                    <Link href={"https://www.facebook.com/"} target="blank">
                        <DropdownMenuItem ><i className="fa-brands fa-facebook-f"></i> </DropdownMenuItem>
                    </Link>
                    <Link href={"https://www.tiktok.com/"} target="blank">
                        <DropdownMenuItem ><i className="fa-brands fa-tiktok"></i> </DropdownMenuItem>
                    </Link>
                    <Link href={"https://www.twitter.com/"} target="blank">
                        <DropdownMenuItem ><i className="fa-brands fa-twitter"></i> </DropdownMenuItem>
                    </Link>
                    <Link href={"https://www.linkedin.com/"} target="blank">
                        <DropdownMenuItem ><i className="fa-brands fa-linkedin"></i> </DropdownMenuItem>
                    </Link>
                    <Link href={"https://www.youtube.com/"} target="blank">
                        <DropdownMenuItem ><i className="fa-brands fa-youtube"></i> </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}

