"use server"
import { getMyToken } from "@/Utilities/getMyToken"

export async function removeAddress(id: string) {
    try {
        const token = await getMyToken()

        if (!token) throw new Error("You Must Logged First")

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
            method:"DELETE",
            headers: {
                token,
                "Content-Type":"application/json"
            }
        })

        const payload = await res.json()

        return payload
        
    } catch (error) {
        console.log(error);

    }

}