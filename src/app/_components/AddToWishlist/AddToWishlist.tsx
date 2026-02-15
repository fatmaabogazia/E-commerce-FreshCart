"use client"

import { addToWishlist } from '@/ActionWishlist/addToWishlist.action'
import { toast } from 'sonner'

export default function AddToWishlist({ id }: { id: string }) {

    async function AddToWishlistFun(id: string) {
        try {
            const res = await addToWishlist(id)
            if (res.status == "success") {
                toast.success(res.message, { position: "top-center" })
            } else {
                toast.error(res.message, { position: "top-center" })
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (

        <>
            <div className="absolute end-[-100] group-hover:top-2 group-hover:end-5 bg-gray-200 p-3 rounded-xl " title="Add To Wishlist" onClick={() => { AddToWishlistFun(id) }}>  <i className="fa-regular fa-heart text-2xl font-bold cursor-pointer"></i> </div>
        </>
    )

}
