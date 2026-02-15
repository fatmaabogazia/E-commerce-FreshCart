import { getAllProducts } from '@/api/getAllProducts.api';
import { getSpecificCategory } from '@/api/getSpecificCategory';
import SingleProduct from '@/app/_components/SingleProduct/SingleProduct';
import { Producttype } from '@/types/Products.type';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function CategoryDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const products = await getAllProducts()

    const productForCategory = products.filter((item: Producttype) => { return item.category._id === id })

    const res = await getSpecificCategory(id)
    const categ = res.data.data

    return (
        <>
            <div className="flex flex-col  items-center my-5 ">
                <Avatar size='lg'>
                    <AvatarImage src={categ.image} alt='image Category' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h2 className=' text-emerald-500 font-semibold text-xl'>{categ.name}</h2>

            </div>

            {productForCategory.length == 0 ? <h2 className='text-center text-2xl font-bold my-5 text-emerald-500'>NO Products Yet <i className="fa-regular fa-face-frown text-emerald-500 font-bold"></i></h2> : <div className="container w-[95%] lg:w-[90%] xl:w-[80%] mx-auto my-5">
                <div className="grid md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {productForCategory.map((prod: Producttype) => {
                        return <SingleProduct prod={prod} key={prod.id} />
                    })}
                </div>
            </div>
            }
        </>
    )
}
