"use client"

import { deleteItemFromWishlist } from '@/ActionWishlist/deleteItemFromWishlist.action'
import { wishlistForUserItem } from '@/ActionWishlist/getWishlistForUser.action'
import { Button } from '@/components/ui/button'
import { WishlistType } from '@/types/ProductWishlist.type'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import AddToCartBTN from '../_components/AddToCartBTN/AddToCartBTN'

export default function Wishlist() {
    const [wishlistArr, setWishlistArr] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    async function wishlistForUserItemFun() {
        const res = await wishlistForUserItem()
        if (res.status == "success") {
            setWishlistArr(res.data)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }

    async function deleteItemFromWishlistFun(id: string) {
        const res = await deleteItemFromWishlist(id)
        if (res.status == "success") {
            toast.success(res.message, { position: "top-center" })
            const arrIds = res.data
            const newArr = wishlistArr.filter((element: WishlistType) => {
                if (arrIds.includes(element.id)) {
                    return element
                }
            });
            setWishlistArr(newArr)
        } else {
            toast.error("No Removed", { position: "top-center" })
        }
    }

    useEffect(() => {
        function flag(){
            wishlistForUserItemFun()
        }
        
        flag()
        
    }, [])

    return (
        <>

            {isLoading ? <div className='h-screen flex justify-center items-center'>
                <span className="loader"></span>
            </div> : wishlistArr.length > 0 ? <div className='container mx-auto w-[95%] lg:w-[90%] xl:w-[80%] bg-gray-100 p-8 my-5'>
                <div className='flex justify-between'>
                    <h2 className='text-2xl  text-emerald-500 font-semibold'>Your Wishlist</h2>
                </div>
                <div className='flex justify-end'>price</div>
                <hr className='my-3 h-0.5 rounded-2xl bg-slate-300' />
                {wishlistArr.map((prod: WishlistType) => {
                    return <div key={prod.id} className='my-5'>
                        <div className='flex lg:h-70 gap-3 '>
                            <div className='w-1/4'>
                                <Image src={prod?.imageCover} alt='image Product' width={100} height={100} className='w-full lg:h-full object-center' />
                            </div>
                            <div className='w-3/4'>
                                <div className='flex justify-between'>
                                    <div>
                                        <h3 className='font-semibold text-lg md:text-xl lg:text-2xl'>{prod?.title}</h3>
                                        <p className='font-bold text-emerald-300'>{prod.category.name}</p>
                                        <div className='capitalize font-semibold text-sm'>quantity : <span className='text-emerald-400'>{prod?.quantity}</span></div>
                                        <div className='font-semibold text-sm pt-2'><i className="fa-solid fa-star text-[#FFD43B]" ></i> <span className='text-emerald-400'>{prod?.ratingsAverage}</span></div>
                                        <div className='flex flex-wrap flex-col lg:flex-nowrap lg:flex-row gap-3 my-3'>
                                            <Button className='bg-red-700 text-white hover:bg-red-800 hover:text-white hover:cursor-pointer' onClick={() => deleteItemFromWishlistFun(prod.id)}><i className="fa-regular fa-trash-can"></i>Delete</Button>
                                            <div onClick={() => deleteItemFromWishlistFun(prod.id)}> <AddToCartBTN id={prod.id} /> </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className='font-semibold text-xl'>{prod.price}EGP</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className='my-3  h-0.5 rounded-2xl bg-slate-300' />

                    </div>
                })}

            </div>
                : <div className='my-10 '> <h3 className='font-semibold text-xl text-center text-emerald-500'>No Products In Your Wishlist!</h3> <Link href='/products' className='flex justify-center my-5'><Button className='bg-emerald-500 text-xl font-semibold p-5'> Shop Now</Button> </Link> </div>}

        </>
    )
}
