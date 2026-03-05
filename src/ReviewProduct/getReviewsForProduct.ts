
export async function getProductReview(id: string) {

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`)

    const payload = await res.json()

    return payload

}