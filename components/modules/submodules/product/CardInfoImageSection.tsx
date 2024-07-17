import { useEffect, useState } from 'react'
import styles from './CardInfoImageSection.module.css'

function CardInfoImageSection({product}:any) {

    const [showAllImages , setShowAllImages]= useState(false)
    const [mainImage , setMainImage] = useState(product.mainImage)

 
  return (
    <>
    <div onMouseLeave={()=>setMainImage(product.mainImage)}  className={styles.container}>
            <img onClick={()=>setShowAllImages(true)} className={styles.mainImage} src={mainImage || '/products/noImage.png'} />
            <div className={styles.otherImages}>
                {product.otherImages?.map((img:string , index:number) => (
                    <img onClick={()=>setMainImage(product.otherImages[index])} key={index} src={img || '/products/noImage.png'}/>
                ))}
            </div>

    </div>  
    {showAllImages  && 
    <div onClick={()=>setShowAllImages(false)} className={styles.imagesModal}>
            <div onClick={(e)=>e.stopPropagation()} className={styles.modalContainer}>
                    images
            </div>
    </div>
    }

  </>

  )
}

export default CardInfoImageSection