
import { Producttype } from "@/types/Products.type";
import SingleProduct from "../_components/SingleProduct/SingleProduct";
import { getAllProducts } from "@/api/getAllProducts.api";

export default async function Products() {

  const data = await getAllProducts()

  return (
    <>
      <div className="container w-[95%] lg:w-[90%] xl:w-[80%] mx-auto my-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {data.map((prod:Producttype) => {
            return <SingleProduct prod={prod} key={prod.id}/>
          })}
        </div>
      </div>
    </>
  );
}
