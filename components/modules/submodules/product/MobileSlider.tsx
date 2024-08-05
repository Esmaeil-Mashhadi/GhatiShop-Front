import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
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
    images: string[],
    setShowAllImages:Dispatch<SetStateAction<boolean>>
}

export default function App({images , setShowAllImages}:SliderProp) {
  return (
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
        dir='ltr' 
        className={styles.mobileSliderContainer} 
      >
        {images.map((img:string , index:number)=>(
            <SwiperSlide >
                <img onClick={()=>setShowAllImages(true)} className='w-full h-full rounded-sm' src={img} key={index} />
            </SwiperSlide>
        ))}


      </Swiper>
  );
}
