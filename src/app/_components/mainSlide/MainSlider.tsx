"use client"
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import img1 from '../../../Images/grocery-banner-2.jpeg'
import img2 from '../../../Images/slider-2.jpeg'

import img3 from '../../../Images/slider-image-1.jpeg'
import img4 from '../../../Images/slider-image-2.jpeg'
import img5 from '../../../Images/slider-image-3.jpeg'
import { Autoplay } from 'swiper/modules';

export default function MainSlider() {
    return (
        <>
            <div className="flex">
                <div className="w-full lg:w-3/4">
                    <Swiper
                        spaceBetween={1}
                        slidesPerView={1}
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 2000
                        }}
                    >
                        <SwiperSlide><Image priority src={img3} alt='slider image' className='w-full object-center h-100' /></SwiperSlide>
                        <SwiperSlide><Image priority src={img4} alt='slider image' className='w-full object-center h-100' /></SwiperSlide>
                        <SwiperSlide><Image priority src={img5} alt='slider image' className='w-full object-center h-100' /></SwiperSlide>
                    </Swiper>
                </div>

                <div className="hidden lg:inline-block lg:w-1/4 ">
                    <Image priority src={img2} alt='slider image' className='w-full object-center h-50' />
                    <Image priority src={img1} alt='slider image' className='w-full object-center h-50' />
                </div>
            </div>

        </>
    )
}
