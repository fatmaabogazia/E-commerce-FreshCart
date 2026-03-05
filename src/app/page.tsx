
import MainSlider from './_components/mainSlide/MainSlider';
import CategorySlider from './_components/categorySlider/CategorySlider';
import { getAllProducts } from '@/api/getAllProducts.api';
import SingleProduct from './_components/SingleProduct/SingleProduct';
import { Producttype } from '@/types/Products.type';


export default async function Home() {

  const products = await getAllProducts()

  return (
    <>
      <div className="container mx-auto w-[80%] my-5">
        <MainSlider />
        <CategorySlider />
      </div>

      <div className="container w-[95%] lg:w-[90%] xl:w-[80%] mx-auto my-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {products.map((prod: Producttype) => {
            return <SingleProduct prod={prod} key={prod.id}/> 
          })}
        </div>
      </div>
    </>
  );
}


// _components ==> دا علشان ميبصش فيه اصلاا ويعمل عليه رووت
// وعلشان نخليه يعمل skip لفايل يعني احط فيه فايلات ويخش عليها علطول بس كتنظيم او كداا بنعملهاا كداا ==> (company)

// Software development life cycle ==> (Project) ==> (phases) ==> (sprints)
// يعني مثلاا هنخلص اللوجين ف اسبوع وهكذااا
// stand up meeting ==> every day meeting ==> بيكون صغير كل واحد بيقول عمل ايه فيه 

// Image Component ==> optmization for image ,, jpg , png ==> change to ==> webp 
//Image Component ==> add on image loading lazy ==>يعني علشان لما يجي يقرب للصوره يعني لما يبقي محتاجها يخليها تحمل 
// علشان نخلي الصور اللي حطاها ف الاول تحمل بسرعه علشان اليوزر مش يبقي ادامه فراغ ==> (priority or loading = "eager")
// priority ==> بيخلي الصوره تحمل قبل حتي اما اليوزر يروحلها == preload