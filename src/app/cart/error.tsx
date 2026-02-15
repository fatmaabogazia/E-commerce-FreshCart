"use client"
import React from 'react'
import imgErr from '../../Images/error.svg'
import Image from 'next/image';

export default function error({ error }: { error: Error }) {

    // console.log(error.message, error.name);

    return (
        <>
            <div className="text-center">
                <h1 className='font-bold text-xl lg:text-2xl'>{error.name}</h1>
                {/* <p className='font-semibold  lg:text-xl'>{error.message}</p> */}
                <p className='font-semibold  lg:text-xl'>Founded Error , Try Later !</p>
            </div>
            <div className='container mx-auto w-[50%] lg:w-[70%] flex items-center justify-center h-85 md:h-100 lg:h-150 '>
                <Image src={imgErr} alt='error image' />
            </div>
        </>

    )
}


// error boundry