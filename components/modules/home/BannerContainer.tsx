'use client'

import styles from './BannerContainer.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import LoadingPage from '@/components/constants/Notif&Loader/LoadingPage';
import Banner, { BannerPropType } from './banners/Banner';


function BannerContainer() {

  const [isLoading , setIsLoading] = useState(true)
useEffect(()=>{
 setIsLoading(false)
},[])

const bannerData:BannerPropType[] = [
  {
    title:"خرید انواع ادکلن بدون واسطه با قاطی شاپ",
    bannerText1:"ادکلن های زنانه",
    bannerText2:"ادکلن های مردانه",
    buttonText:"مشاهده ی همه ادکلن ها",
    imgsrc:"/homePage/banner/perfume.jpg",
    logosrc1 : '/homepage/banner/logos/womenPerfumeLogo.png',
    logosrc2 : '/homepage/banner/logos/menPerfumeLogo.png'
  } ,
  {
    title:"با پوشاک قاطی شاپ ، خوش استایل بمونین",
    bannerText1:"پوشاک بانوان",
    bannerText2:"پوشاک آقایان",
    buttonText:"مشاهده ی همه پوشاک ",
    imgsrc:"/homePage/banner/clothbg.jpg" ,
    logosrc1 : '/homepage/banner/logos/womenClothLogo.png',
    logosrc2 : '/homepage/banner/logos/menClothLogo.png'
  },
  {
    title:"با قاطی  شاپ لوازم جانبی مناسبتو پیدا کن ",
    bannerText1:"اکسسوری های موبایل",
    bannerText2:"دیگر اکسسوری ها",
    buttonText:"مشاهده ی همه اکسسوری ها ",
    imgsrc:"/homePage/banner/accBg.jpg",
    logosrc1 : '/homepage/banner/logos/mobileAccLogo.png',
    logosrc2 : '/homepage/banner/logos/otherAccLogo.png'

  }
]

  return (
    
<div
  className={styles.container}>
    {isLoading ? <LoadingPage/> : 
    <Swiper 
     slidesPerView={1}
     spaceBetween={30}
     loop={true}
     pagination ={{clickable:true,
      bulletClass :`${styles.circleButtonStyle}`,
      bulletActiveClass : `${styles.chooseClass}`
     }}
     autoplay ={{
       delay:5000,
       disableOnInteraction:false
     }}
     
     modules={[Autoplay, Pagination, Navigation]}
    >
      {bannerData.map((banner , index)=>(
        <SwiperSlide key={index}>
            <Banner 
            title={banner.title} buttonText={banner.buttonText} 
            bannerText1={banner.bannerText1} bannerText2={banner.bannerText2}
            imgsrc={banner.imgsrc} logosrc1={banner.logosrc1} logosrc2={banner.logosrc2}
            />
        </SwiperSlide>
      ))}
    </Swiper> 
    }

  </div>
  )
}

export default BannerContainer