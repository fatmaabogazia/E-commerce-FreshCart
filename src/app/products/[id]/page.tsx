import { getRelatedProductsCat } from "@/api/getRelatedProductsCat";
import { getProductDetails } from "@/api/productDetails.api";
import AddToCartBTN from "@/app/_components/AddToCartBTN/AddToCartBTN";
import AddToWishlistBTNProdDetails from "@/app/_components/AddToWishlistBTNProdDetails/AddToWishlistBTNProdDetails";
import SingleProduct from "@/app/_components/SingleProduct/SingleProduct";
import { Producttype } from "@/types/Products.type";
import Image from "next/image";


export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // {
  //   id : ''
  // }
  
  const data = await getProductDetails(id)
  console.log(data.category._id)
  if(!data) return <h1 className='font-semibold text-xl text-center text-emerald-500'>No Related Products</h1>

  const res = await getRelatedProductsCat(data.category._id)

  console.log(res.data);

  return (
    <>
      <div className="container mx-auto w-[90%] md:w-[85%] lg:w-[78%] my-6">
        <div className="flex flex-wrap">
          <div className="left w-full md:w-3/12">
            <div className="p-8">
              <Image src={data.imageCover} alt="image product" className="w-full" width={200} height={200} />
            </div>
          </div>

          <div className="right w-full md:w-9/12 flex items-center ">
            <div className="flex justify-between">
              <div className="p-2">
                <h2 className="font-bold text-large lg:text-xl">{data.title}</h2>
                <p className="text-gray-400 py-5 px-2">{data.description}</p>
                <span className="text-emerald-500 font-bold">{data.category.name}</span>

                <div className="flex justify-between py-3">
                  <p>{data.price}<span className="uppercase"> egp</span></p>
                  <p><i className="fa-solid fa-star text-amber-300"></i>{data.ratingsAverage}</p>
                </div>
                <AddToCartBTN id={id} />
              </div>

              <div> <AddToWishlistBTNProdDetails id={id} /> </div>
            </div>

          </div>
        </div>

        <h2 className="my-3 text-emerald-500 font-bold text-xl xl:text-2xl">Related Products</h2>
    </div>

      <div className="container w-[95%] lg:w-[90%] xl:w-[80%] mx-auto my-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {res.data.map((prod: Producttype) => {
            return <SingleProduct prod={prod} key={prod.id}/> 
          })}
        </div>
      </div>
  
    </>
  );
}



//    