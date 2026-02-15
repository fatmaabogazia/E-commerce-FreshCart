"use server"
import { getMyToken } from "@/Utilities/getMyToken";

export async function cartProductForUser() {

    try {
        const token = await getMyToken()
        if (!token) throw new Error("You Must Logged in First")

        const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token
            }
        })

        const productCarts = await res.json();

        return productCarts;
    } catch (error) {
        return error
    }
}