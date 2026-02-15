import { getCategories } from '@/api/getCategories.api'
import { Card,  CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CategoryType } from '@/types/Categories.type'
import Image from 'next/image'
import Link from 'next/link'

export default async function Categories() {
  const Categories = await getCategories()

  return (
    <>
      <div className='container mx-auto w-[95%] md:w-[90%] lg:w-[80%] my-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  gap-4'>
          {Categories.map((cate:CategoryType) => {
            return <Card key={cate._id} className='hover: group'>
              <Link href={`/categories/${cate._id}`}>
                <CardHeader>
                  <CardTitle className='group-hover:scale-105 transition-all' ><Image src={cate.image} alt='category photo' width={200} height={200} className='w-full h-70 object-center' /></CardTitle>
                  <CardDescription className="text-emerald-600 text-center font-bold group-hover:translate-y-2 transition-all "> {cate.name}</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          })}

        </div>
      </div>
    </>
  )
}
