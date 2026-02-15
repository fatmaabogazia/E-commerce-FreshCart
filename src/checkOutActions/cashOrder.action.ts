"use server"

import { checkOutOrdersSchemaType } from "@/schema/checkOutOrders.schema";
import { getMyToken } from "@/Utilities/getMyToken";


export async function cashOrder(id: string, values:checkOutOrdersSchemaType) {

    try {
        const token = await getMyToken()
        if (!token) throw new Error("You Must Logged First")

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${id}`, {
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
        return payload ;

    } catch (error) {
        console.log(error);

    }
}