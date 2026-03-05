"use client"
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// import img3 from '../../../Images/slider-image-1.jpeg'

import { Autoplay } from 'swiper/modules';
import { CategoryType } from '@/types/Categories.type';

export default function CategorySliderSwiper({ category }: { category: CategoryType[] }) {
    return (
        <>
            <Swiper
                // lazy={false}
                spaceBetween={0}
                // slidesPerView={5}
                modules={[Autoplay]}
                autoplay={{
                    delay: 2000
                }}
                breakpoints={{

                    0: {
                        slidesPerView: 2
                    },
                    640: {
                        slidesPerView: 3
                    },
                    768: {
                        slidesPerView: 4
                    },
                    1024: {
                        slidesPerView: 5
                    }
                }}
            >
                {category.map((categ: CategoryType) => {
                    return <SwiperSlide key={categ?._id}>
                        <Image priority src={categ.image} alt='category image' className='w-full object-center h-50 mt-5' width={500} height={500} />
                        <p className='text-emerald-500 font-semibold pl-3'>{categ.name}</p>
                    </SwiperSlide>
                })}
            </Swiper>
        </>
    )
}
