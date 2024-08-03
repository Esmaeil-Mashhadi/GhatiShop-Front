import { useEffect, useState } from 'react'
import styles from './CardInfoImageSection.module.css'
import MobileSlider from './MobileSlider';
import ImagesModal from './ImagesModal';



function CardInfoImageSection({product}:any) {

    const [showAllImages , setShowAllImages]= useState(false)
    const [allImages , setAllImages] = useState<(string[])>([])
    const [currentIndex , setCurrentIndex] = useState(0)
      
      useEffect(()=>{
        setAllImages([product.mainImage , ...product.otherImages.slice(0 ,2)])
      },[])

      const transformStyle:Record<string , string|number> = {
        '--transfer' : `-${currentIndex * 100}%`,
      }

      const imageThumbHandler = (index:number)=>{
        setCurrentIndex(index)
      }

      console.log(product.otherImages);

  return (
        <>
    <div  className={styles.container}>
        <div  
         dir='ltr' style={transformStyle} className={styles.sliderContainer}

         >
         {allImages.map((img:string , index:number)=>(
                <img onClick={()=>setShowAllImages(true)} src={img} key={index}  />
         ))}
        </div>

         {product.otherImages.length>0 && 
        <div dir='ltr' className={styles.otherImages}>
                {allImages.map((img:string , index:number)=>(
                          <img src={img} key={index} onClick={()=>imageThumbHandler(index)}/>
                ))}
        </div>}
        <MobileSlider images = {allImages} />
    </div>

       
    {showAllImages && <ImagesModal allImages = {allImages} setShowAllImages={setShowAllImages} />}
    </>


  )
}

export default CardInfoImageSection




