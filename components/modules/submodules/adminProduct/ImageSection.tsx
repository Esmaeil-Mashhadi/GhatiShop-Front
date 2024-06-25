import {  ChangeEvent, useContext, useState } from 'react'
import styles from './ImageSection.module.css'
import toast from 'react-hot-toast'
import { AdminProductContext } from './CreateProduct'

interface ImageSrcType {
  mainImage:string |ArrayBuffer
  otherImages:(string | ArrayBuffer)[]
}
function ImageSection() {

  const {setProductData , productData} = useContext(AdminProductContext) 

  const [imageSrc , setImageSrc] = useState<ImageSrcType>({
    mainImage:'' , otherImages :[""]
  })

const uploadHandler = ( index?: number) => {
    const input = document.createElement('input');
    input.type = 'file';
  
    input.addEventListener('change', (e) => {

      const files = (e.target as HTMLInputElement).files;
      if (!files) return;
      
      const file = files[0];
      const type = file.type.split('/')[1]
      const allowedTypes = ['png' , 'jpg' , 'jpeg' , 'webp']
      if(!allowedTypes.includes(type)) {
        return toast.error('پسوند فایل نا معتبر است')
      }

      const reader = new FileReader();
  
      reader.onload = (e) => {
        const result = e.target?.result;
        if (!result) return;
  
        if (index !== undefined) {
          updateOtherImage(result, index ,file);
        } else {
          updateMainImage(result, file);
        }
      };
  
      reader.readAsDataURL(file);
    });
  
    input.click();
  };
  
  const updateOtherImage = (result: string | ArrayBuffer, index: number , file:File) => {
    if(productData && setProductData){
      const imagesUpdate = [...productData.images.otherImages]
      imagesUpdate[index] = file
      setProductData({...productData , images:{...productData.images , otherImages:imagesUpdate}})
    }
    const otherImagesCopy = [...imageSrc.otherImages];
    otherImagesCopy[index] = result;
    setImageSrc({ ...imageSrc, otherImages: otherImagesCopy });
  };
  
  const updateMainImage = (result: string | ArrayBuffer, file: File) => {
    if (productData && setProductData) {
      setProductData({
        ...productData,
        images: { ...productData.images, mainImage: file },
      });
    }
    setImageSrc({ ...imageSrc, mainImage: result });
  };

  const removeImage = (index?:number)=>{
    if(index !=undefined){
      const otherImagesCopy = [...imageSrc.otherImages]
      otherImagesCopy[index] = ""
      setImageSrc({...imageSrc ,otherImages:otherImagesCopy })
    }else{
      setImageSrc({...imageSrc , mainImage:""})
    }
  }


  return (
    <div className={styles.image}>

    <div className={styles.imageContainer}>
        <label>تصویر اصلی: </label>
        <div>
          <img onClick={()=>uploadHandler()} className={styles.mainImage} src= {imageSrc.mainImage as string || '/products/noImage.png'} />
          {imageSrc.mainImage &&  <span onClick={()=>removeImage()} className={styles.remove}>حذف تصویر</span>}
        </div>
    </div>

    <div className={styles.imageLoopContainer}>
        <label>دیگر تصاویر:</label>
        {[...Array(3)].map((img , index) =>(
          <div  key={index}>
            <img onClick={()=>uploadHandler( index)}  className={styles.images} key={index} src={imageSrc.otherImages[index] as string || '/products/noImage.png'} />
            {imageSrc.otherImages[index] &&  <span onClick={()=>removeImage(index)} className={styles.remove}>حذف تصویر</span>}
          </div>
          ))}
    </div>
  </div>
  )
}

export default ImageSection