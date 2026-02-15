"use client"

import { addToWishlist } from '@/ActionWishlist/addToWishlist.action'
import { toast } from 'sonner'

export default function AddToWishlistBTNProdDetails({ id }: { id: string }) {

    async function AddToWishlistFun(id: string) {
        try {
            const res = await addToWishlist(id)
            if (res.status == "success") {
                toast.success(res.message, { position: "top-center" })
            } else {
                toast.error(res.message , { position: "top-center" })                
            }
        } catch (error) {
console.log(error);
        }
    }

    return (

        <>
            <div className=" hover:bg-gray-200" title="Add To Wishlist" onClick={() => { AddToWishlistFun(id) }}>  <i className="fa-regular fa-heart text-2xl font-bold cursor-pointer"></i> </div>
        </>
    )

}
