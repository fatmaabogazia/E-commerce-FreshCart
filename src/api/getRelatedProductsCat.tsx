import axios from "axios";

export async function getRelatedProductsCat(id: string) {

    try {
        const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)
        const { data } = res
        return data
    } catch (error) {
        console.log(error)
    }

}