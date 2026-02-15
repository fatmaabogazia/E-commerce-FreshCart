
export async function getProductDetails(id: string) {

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        const { data } = await res.json()
        return data;
    } catch (error) {
        console.log(error)
    }

}