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




function ImagesModal({setShowAllImages , allImages }) {

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
      className="w-full h-4/5 rounded-lg "
      dir='ltr'
      >
        {allImages.map((image , index)=>(
            <SwiperSlide>
            <img className="h-full w-full rounded-lg  " src={image} alt={`Slide ${index}`} />
            </SwiperSlide>
        ))}
    </Swiper>

    {allImages.length>1 && 
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={3}
        freeMode={true}
        spaceBetween={3}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-36 flex w-full mt-2 cursor-pointer"
        dir='ltr'
        >

      { allImages.map((image , index)=>(
          <SwiperSlide key={index}>
            <img  className="h-full w-full rounded-lg"  src={image} />
          </SwiperSlide>
          ))}
      </Swiper>
    }

    <span className={styles.close}>X</span>
        </div>

</div>
    
  )
}

export default ImagesModal