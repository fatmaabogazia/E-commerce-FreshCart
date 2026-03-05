"use server"

import { addReviewSchemaType } from "@/schema/addReviewProduct.schema"
import { getMyToken } from "@/Utilities/getMyToken"

export async function updateReview(id: string, values:addReviewSchemaType) {

    try {
        const token = await getMyToken()

        if (!token) throw new Error("You Must Logged in First")

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/reviews/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token
            },
            body: JSON.stringify(values)
        })

        const payload = await res.json()

        return payload

    } catch (error) {
        console.log(error);

    }
}