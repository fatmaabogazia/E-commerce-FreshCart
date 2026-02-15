"use server" // لازم تحلص ف السيرفر علشان التوكين ميظهرش علي البراوزر
import { getMyToken } from "@/Utilities/getMyToken"

export async function addToCart(id: string) {
    try {
        const token = await getMyToken()

        // console.log(token);
        if (!token) throw new Error("You Must Logged in First")

        const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
            method: "POST",
            headers: {
                token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId: id
            })
        })

        const payload = await res.json()

        return payload

    } catch (error) {
        return error
    }
}