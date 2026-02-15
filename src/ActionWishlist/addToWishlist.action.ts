"use server"
import { getMyToken } from "@/Utilities/getMyToken";

export async function addToWishlist(id: string) {

    try {
        const token = await getMyToken()
        if (!token) throw new Error("You Must Logged in First")

        const res = fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
            method: "POST",
            headers: {
                token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId: id
            })
        })

        const payload = (await res).json()

        return payload

    } catch (error) {
        return error
    }

}