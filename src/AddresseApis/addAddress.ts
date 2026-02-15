"use server"
import { addAddressSchemaType } from "@/schema/addAddress.schema";
import { getMyToken } from "@/Utilities/getMyToken";

export async function addAddress(values: addAddressSchemaType) {
    try {
        const token = await getMyToken()
console.log(token);

        if (!token) throw new Error("You Must Logged First")

        const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
            method: "POST",
            headers: {
                token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })

        const payload = await res.json()

        return payload

    } catch (error) {
        console.log(error);
    }

}

