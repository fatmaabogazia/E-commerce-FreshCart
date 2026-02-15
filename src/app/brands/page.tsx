
import getAllBrands from "@/api/getAllBrands.api";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrandsType } from "@/types/Brands.type";
import Image from "next/image";
import Link from "next/link";


export default async function Brands() {
  const brands = await getAllBrands()

  return (
    <>
      <div className="container w-[95%] lg:w-[90%] xl:w-[80%] mx-auto my-5">
        <div className="grid md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {brands.map((brand:BrandsType) => {
            return <Card key={brand._id} className='hover: group'>
              <Link href={`/brands/${brand._id}`}>
              <CardHeader>
                <CardTitle className='group-hover:scale-105 transition-all' ><Image src={brand.image} alt="image product" className='w-full ' width={200} height={200} /></CardTitle>
                <CardDescription className="text-emerald-500 text-center font-semibold text-xl group-hover:translate-y-2 transition-all">{brand.name}</CardDescription>
              </CardHeader>
              </Link>
            </Card>
          })}
        </div>
      </div>
    </>
  )
}
