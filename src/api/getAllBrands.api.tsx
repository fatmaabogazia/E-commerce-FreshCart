
export default async function getAllBrands() {

    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands")
        const { data } = await res.json()

        return data
    } catch (error) {
        console.log(error)
        return <h1 className="text-center text-2xl text-emerald-500 font-bold">Loading...</h1>
    }

}
