"use server"

import { getMyToken } from "@/Utilities/getMyToken"

export async function wishlistForUserItem() {
    try {
        const token = await getMyToken()
        if (!token) throw new Error("Occure Error")

        const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
            method: "GET",
            headers: {
                token,
                "Content-Type": "application/json"
            }
        })

        const payload = await res.json()
        return payload
    } catch (error) {
        console.log(error);
    }

}