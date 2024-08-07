import { useEffect, useState } from 'react'
import styles from './CardInfoImageSection.module.css'
import MobileSlider from './MobileSlider';
import ImagesModal from './ImagesModal';



function CardInfoImageSection({product , modal}:any) {

    const [showAllImages , setShowAllImages]= useState(false)
    const [cardImages , setCardImages] = useState<(string[])>([])
    const [currentIndex , setCurrentIndex] = useState(0)
      
      useEffect(()=>{
        setCardImages([product.mainImage , ...product.otherImages.slice(0 ,2)])
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

       
    {showAllImages && !modal && <ImagesModal  allImages = {[product.mainImage , ...product.otherImages]} setShowAllImages={setShowAllImages} />}
    </>


  )
}

export default CardInfoImageSection




