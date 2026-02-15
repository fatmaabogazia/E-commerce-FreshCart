"use server"

export async function getAllOrders(id: string) {

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)

        const payload = await res.json()
        console.log(payload);

        return payload
    } catch (error) {
        console.log(error);
    }


}

