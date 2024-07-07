import {  ChangeEvent, useContext, useState } from 'react'
import styles from './ImageSection.module.css'
import toast from 'react-hot-toast'
import { AdminProductContext } from './CreateProduct'


function ImageSection({edit}:{edit?:boolean}) {

  const {setProductData , productData} = useContext(AdminProductContext) 

  const initialImageSrcValue = edit? {mainImage:productData.mainImage  as (string | ArrayBuffer), otherImages:productData.otherImages as (string|ArrayBuffer)[]} : {mainImage:"" , otherImages:['']} // we know when edit is true we're getting image url or were uploading array buffer
  const [imageSrc , setImageSrc] = useState(initialImageSrcValue)

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
          updateImage(result, index  ,file);
      };
      reader.readAsDataURL(file);
    });
  
    input.click();
  };
  
  const updateImage = (result: string | ArrayBuffer, index: number | undefined , file:File) => {
    if(index == undefined){
      setProductData({...productData , mainImage:file}) 
      setImageSrc({...imageSrc , mainImage:result})
    }else{ 
      const imagesUpdate = [...productData.otherImages]
      imagesUpdate[index] = file
      setProductData({...productData , otherImages:imagesUpdate})
      const imageSources = [...imageSrc.otherImages];
      imageSources[index] = result;
      setImageSrc({...imageSrc ,otherImages:imageSources});
    }
  };
  


  const removeImage = (index?:number)=>{
    if(index == undefined){
      setImageSrc({...imageSrc , mainImage:''})
    }else{
      const imageSources = [...imageSrc.otherImages]
      imageSources[index] = ""
       productData.otherImages[index] ="" 
      setImageSrc({...imageSrc , otherImages:[...imageSources]}) 
    }
  }


  return (
  <div className={styles.imagesContainer}>

        <label>تصویر اصلی</label>
       <div className={styles.mainImageContainer}>
        <img onClick={()=>uploadHandler()} className={styles.mainImage} src={imageSrc.mainImage as string || '/products/noImage.png'} />
        {imageSrc.mainImage &&  <span onClick={()=>removeImage()} className={styles.remove}>حذف تصویر</span>}
      </div>

       <label>تصاویر دیگر</label>
      {
        [...Array(3)].map((_, index)=>(
              <div className={styles.imageSubContainer} key={index}>
                 <img
                  className={ styles.otherImages}
                  onClick={()=>uploadHandler(index)}
                  src={imageSrc.otherImages[index] as string || '/products/noImage.png'}
                 />
                {imageSrc.otherImages[index] &&  <span onClick={()=>removeImage(index)} className={styles.remove}>حذف تصویر</span>}
           </div>
        ))
      }
  
  </div>
  )
}

export default ImageSection