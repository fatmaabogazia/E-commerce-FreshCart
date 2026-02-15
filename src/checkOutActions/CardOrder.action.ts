"use server"

import { checkOutOrdersSchemaType } from '@/schema/checkOutOrders.schema';
import { getMyToken } from "@/Utilities/getMyToken";


export async function cardOrder(id: string , values: checkOutOrdersSchemaType) {

    try {

        const token = await getMyToken()
        // لازم يكون جوه سيرفير مش ينفع نعمله جوه client component
        const url = process.env.NEXT_URL

        if (!token) throw new Error("Must Be Logged First")

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${url}`, {
            method: "POST",
            headers: {
                token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                shippingAddress: values
            })
        })

        const payload = await res.json()

        return payload
    } catch (error) {
        return error
    }
}