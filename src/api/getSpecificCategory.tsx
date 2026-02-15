import axios from "axios"

export async function getSpecificCategory(idCateg: string) {

    try {
        const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${idCateg}`).then((res) => {
            return res
        }).catch((err) => {
            return err
        })

        return res
    } catch (error) {
        console.log(error);
    }

}