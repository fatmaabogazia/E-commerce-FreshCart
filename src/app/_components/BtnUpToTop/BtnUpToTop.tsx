"use client"
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function BtnUpToTop() {

    const [display, setDisplay] = useState(true)

    useEffect(() => {
        function displayBtn() {
            if (window.scrollY > 100) {
                setDisplay(false)
            } else {
                setDisplay(true)
            }
        }

        window.addEventListener("scroll", displayBtn);

    }, [])

    return (
        <>
            {!display && <Button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }) }} className=' rounded-full text-white bg-emerald-300 flex justify-center items-center p-4 size-6 fixed end-5 bottom-5 z-20 animate-bounce hover:bg-emerald-500 cursor-pointer'><i className="fa-solid fa-arrow-up"></i>  </Button>}
        </>
    )
}
