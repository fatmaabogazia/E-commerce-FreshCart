
import CategorySliderSwiper from '../CategorySliderSwiper/CategorySliderSwiper';

export default async function CategorySlider() {

  // let category = await getCategories()

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories")
  const { data } = await res.json()


  return (
    <>
      <div className="flex">
        <div className="w-full">
          <CategorySliderSwiper category={data} />
        </div>
      </div>
    </>
  )
}
