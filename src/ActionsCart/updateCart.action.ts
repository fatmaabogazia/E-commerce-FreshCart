"use server"
import { getMyToken } from "@/Utilities/getMyToken"

export async function updateCart(count: string, id: string) {
    try {
        const token = await getMyToken()
        if (!token) throw new Error("You Must Logged in First")

        const res = fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token
            },
            body: JSON.stringify({
                count
            })
        })

        const payload = (await res).json()

        return payload
    } catch (error) {
        console.log(error);
    }

}