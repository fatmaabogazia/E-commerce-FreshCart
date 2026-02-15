import axios from "axios"

export async function getSpecificBrand(idBrand: string) {

    try {
        const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${idBrand}`).then((res) => {
            return res
        }).catch((err) => {
            return err
        })

        return res
    } catch (error) {
        console.log(error);
    }

}