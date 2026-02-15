"use server"
import { getMyToken } from "@/Utilities/getMyToken"

export async function deleteFromCart(id: string) {
    try {
        const token = await getMyToken()
        if (!token) throw new Error("You Must Logged in First")

        const res = fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                token
            }
        })

        const productDelete = (await res).json()

        return productDelete;
    } catch (error) {
        console.log(error);
    }

}