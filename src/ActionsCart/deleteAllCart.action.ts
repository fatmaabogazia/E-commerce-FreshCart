"use server"
import { getMyToken } from "@/Utilities/getMyToken"

export async function deleteAllCart() {
    try {
        const token = await getMyToken()
        if (!token) throw new Error("You Must Logged in First")

        const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
            method: "DELETE",
            headers: {
                token,
                "Content-type": "application/json"
            }
        })

        const payload = await res.json();

        return payload;
    } catch (error) {
        console.log(error);
    }

}