"use server"

import { getMyToken } from "@/Utilities/getMyToken"

export async function deleteReviewFun(id: string) {

    try {
        const token = await getMyToken()

        if (!token) throw new Error("You Must Logged in First")

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/reviews/${id}`, {
            method: "Delete",
            headers: {
                "Content-Type": "application/json",
                token
            }
        })

        const payload = await res.json()

        return payload

    } catch (error) {
        console.log(error);
    }
}