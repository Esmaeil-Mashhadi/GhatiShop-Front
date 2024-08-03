import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import styles from './ImagesModal.module.css'

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';




function ImagesModal({setShowAllImages , allImages}) {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const crouselStyle ={
        '--swiper-navigation-color': 'black',
        '--swiper-pagination-color': 'black',
  }

  return (

<div onMouseDown={()=>setShowAllImages(false)} className={styles.imagesModal}>
    <div onClick={(e)=>e.stopPropagation()} className={styles.modalContainer}>
    <Swiper
      style={crouselStyle}
      spaceBetween={10}
      navigation={true}
      thumbs={{ swiper: thumbsSwiper }}
      modules={[FreeMode, Navigation, Thumbs]}
      className="w-full h-4/5 "
      >
        {allImages.map((image , index)=>(
            <SwiperSlide>
            <img className="h-full w-full rounded-lg  " src={image} alt={`Slide ${index}`} />
            </SwiperSlide>
        ))}
    </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          slidesPerView={4}
          freeMode={true}
          spaceBetween={3}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="h-36 flex w-full mt-2 gap-1 cursor-pointer "
          >

        {allImages.map((image , index)=>(
            <SwiperSlide
              className="flex-1 h-full "
            >
            <img className="h-full w-full rounded-lg"  src={image} />
            </SwiperSlide>
            ))}
        </Swiper>

        </div>
</div>
    
  )
}

export default ImagesModal