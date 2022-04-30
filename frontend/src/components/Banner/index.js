import React from 'react';
import './banner.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";	
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

SwiperCore.use([Navigation, Pagination, Autoplay])

function Banner()  {
    return(
        <div>
            <Swiper
            className="banner"
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500 }}
            >
            <SwiperSlide><img src="img/1.jpg" alt="img1" className='banner_img'></img></SwiperSlide>
            <SwiperSlide><img src="img/2.jpg" alt="img2" className='banner_img'></img></SwiperSlide>
            <SwiperSlide><img src="img/3.jpg" alt="img3" className='banner_img'></img></SwiperSlide>
            <SwiperSlide><img src="img/4.jpg" alt="img4" className='banner_img'></img></SwiperSlide>
            </Swiper>
      </div>
        );
}


export default Banner;