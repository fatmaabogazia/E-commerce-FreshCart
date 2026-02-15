
import { getAllProducts } from '@/api/getAllProducts.api';
import SingleProduct from '@/app/_components/SingleProduct/SingleProduct';
import { Producttype } from '@/types/Products.type';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getSpecificBrand } from '@/api/getSpecificBrand';

export default async function BrandDetails({ params } : { params: Promise<{id:string}>}) {
    const { id } = await params

    const products = await getAllProducts()

    const productForBrand = products.filter((item: Producttype) => { return item.brand._id === id })

    const res = await getSpecificBrand(id)
    const brand = res.data.data

    return (
        <>
            <div className="flex flex-col  items-center my-5 ">
                <Avatar size='lg'>
                    <AvatarImage src={brand.image}  alt='image Category'/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h2 className=' text-emerald-500 font-semibold text-xl'>{brand.name}</h2>
    
            </div>

            {productForBrand.length == 0 ? <h2 className='text-center text-2xl font-bold my-5 text-emerald-500'>NO Products Yet <i className="fa-regular fa-face-frown text-emerald-500 font-bold"></i></h2> : <div className="container w-[95%] lg:w-[90%] xl:w-[80%] mx-auto my-5">
                <div className="grid md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {productForBrand.map((prod: Producttype) => {
                        return <SingleProduct prod={prod} key={prod.id} />
                    })}
                </div>
            </div>
            }
        </>
    )
}
