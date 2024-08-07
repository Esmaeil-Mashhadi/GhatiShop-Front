import styles from './Latest.module.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import{motion, Variants} from 'framer-motion'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

// import required modules
import { Grid, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';

  const newVariant:Variants = {
     offScreen:{
        y:200, 
        opacity:0
     },
     onScreen:{
       y:0, 
       opacity:1, 
       transition:{
        duration:.5,
       }
     },
    
  }

function Latest() {
   const [slideView , setSlideView] = useState(3)
  useEffect(()=>{
    if(window.innerWidth < 550){
      setSlideView(2)
    }else if(window.innerWidth<400){

    }

  },[])

  return (
    <motion.div 
        variants={newVariant}
        initial='offScreen'
        whileInView='onScreen'
        viewport={{once:true}}
        className={styles.container}>
    
    
      <Swiper
        slidesPerView={slideView}
        grid={{
          rows: 2,
        }}
        spaceBetween={slideView * 5} 
        // just wanted to have less gap if window is smaller
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
        className={styles.swiper}
      >
      {[...Array(10)].map((item:undefined , index:number)=>(
        <SwiperSlide key={index} className={styles.swiperSlide}>
            {`slider${index + 1}`}
        </SwiperSlide>
      ))}
      </Swiper>
    </motion.div>
  )
}

export default Latest