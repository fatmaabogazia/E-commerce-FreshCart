"use client"

import { addToCart } from "@/ActionsCart/addToCart.action"
import { Button } from "@/components/ui/button"
import { CartContext } from "@/Context/CartContext";
import { useContext } from "react";
import { toast } from "sonner";

export default function AddToCartBTN({ id }: { id: string }) {
    const { cartItems, setCartItems } = useContext(CartContext)!

    async function addToCartFun(id: string) {
        try {
            const res = await addToCart(id)
            if (res.status == "success") {
                toast.success(`${res.message}`, { position: "top-center" })
                setCartItems(cartItems + 1)
            } else {
                toast.error(res.message, { position: "top-center" })
            }
        } catch (error) {
            // toast.error("You Must Logged First", { position: "top-center" })
            console.log(error)
        }

    }

    return (
        <>
            <Button className="bg-emerald-600 w-full" onClick={() => addToCartFun(id)}>Add To Cart</Button>
        </>
    )
}
