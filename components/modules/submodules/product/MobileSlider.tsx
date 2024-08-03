import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './MobileSlider.module.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

// import required modules
import { EffectCube, Pagination } from 'swiper/modules';

type SliderProp = {
    images: string[]
}

export default function App({images}:SliderProp) {
  return (
    <div dir='ltr' className={styles.container}>
      <Swiper
        effect={'cube'}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 10,
          shadowScale: 0.94,
        }}
        pagination={true}
        modules={[EffectCube, Pagination]}
        className="mySwiper"
      >
        {images.map((img:string , index:number)=>(
            <SwiperSlide>
                <img  src={img} key={index} />
            </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
