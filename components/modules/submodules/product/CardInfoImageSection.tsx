import { useEffect, useState } from 'react'
import styles from './CardInfoImageSection.module.css'
import MobileSlider from './MobileSlider';
import ImagesModal from './ImagesModal';
import { ProductType } from '../adminProduct/CreateProduct';
import { ProgressBar } from 'react-loader-spinner';

type CardInfoImageSectionPropType ={
  product:ProductType , 
}


function CardInfoImageSection({product }:CardInfoImageSectionPropType) {

    const [showAllImages , setShowAllImages]= useState(false)
    const [cardImages , setCardImages] = useState<(string[])>([])
    const [currentIndex , setCurrentIndex] = useState(0)
    const [loading  , setLoading] = useState(true)
      
      useEffect(()=>{
        if(typeof(product.mainImage) == 'string' && product.otherImages.every(item => typeof(item) =='string')){
           setCardImages([product.mainImage , ...product.otherImages.slice(0 ,2)])
         }

         setLoading(false)
      },[])

      const transformStyle:Record<string , string|number> = {
        '--transfer' : `-${currentIndex * 100}%`,
      }

      const imageThumbHandler = (index:number)=>{
        setCurrentIndex(index)
      }


  return (
        <>
    <div  className={styles.container}>
         {loading && <div className='h-full w-full flex justify-center items-center'><ProgressBar /></div> }

        <div  
         dir='ltr' style={transformStyle} className={styles.sliderContainer}

         >
         {cardImages.map((img:string , index:number)=>(
                <img onClick={()=>setShowAllImages(true)} src={img} key={index}  />
         ))}
        </div>

         {product.otherImages.length>0 && 
        <div dir='ltr' className={styles.otherImages}>
                {cardImages.map((img:string , index:number)=>(
                          <img src={img} key={index} onClick={()=>imageThumbHandler(index)}/>
                ))}
        </div>}
        <MobileSlider setShowAllImages = {setShowAllImages} images = {cardImages} />
    </div>

       
    {showAllImages && <ImagesModal  allImages = {[product.mainImage , ...product.otherImages]} setShowAllImages={setShowAllImages} />}
    </>


  )
}

export default CardInfoImageSection




