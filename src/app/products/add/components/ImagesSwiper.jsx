import React, { useContext, useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import '../styles.css'

// import required modules
import { Pagination } from 'swiper/modules'
import { ProductContext } from '../context/ProductContextProvider'
import ImagePreviewerCard from '@/components/images/ImagePreviewerCard'

export default function ImagesSwiper() {
    return (
        <>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="swiper"
            ></Swiper>
        </>
    )
}
