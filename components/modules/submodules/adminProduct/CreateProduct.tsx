import { Dispatch, SetStateAction, createContext, useState } from 'react'
import styles from './CreateProduct.module.css'
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast'
import TitleAndDescSection from './TitleAndDescSection';
import PriceAndCategory from './PriceSection';
import ImageSection from './ImageSection';
import ListInfo from './ListInfo';
import Desc from '../../submodules/adminProduct/Desc'
import PriceSection from './PriceSection';



export interface ImageType {
      mainImage : File  |string 
      otherImages: (File |string )[] 
}

export interface ProductType {
      title: string;
      shortDesc: string;
      price: string;
      specialPrice: string;
      images: ImageType ;
      description: string;
      features: {name:"", description:""}[];
      categories:(string)[]
  }

interface ProductContextType  {
      productData:ProductType ,
      setProductData: Dispatch<SetStateAction<ProductType>>
}

export const AdminProductContext = createContext<ProductContextType>({
      productData:{
            title:"" , shortDesc:"" , price:"" , specialPrice:"" ,
            images:{mainImage:"", otherImages:[""]} , 
            description:"" , 
            features : [] , 
            categories:[]
      } , 
      setProductData:()=>{}
})
type createProductType ={
      edit?: boolean
      productDataForEdit?: ProductType
}

function CreateProduct({edit , productDataForEdit}:createProductType) {
      const [productData , setProductData] = useState<ProductType>(()=>{
            if(edit && productDataForEdit){
                 return  productDataForEdit
            }else{
                  return {
                        title:"" , shortDesc:"" , price:"" , specialPrice:"" ,
                        images:{mainImage:"", otherImages:[""]} , 
                        description:"" , 
                        features : [] , 
                        categories:[]
                  }
            }
      })

      const submitHandler = async()=>{
        const checkIfEmpty = [!!productData.categories.length ,!!productData.title.trim() , !!productData.price.trim()]
        if(checkIfEmpty.includes(false)){
             toast.error('چک کنید که فیلد عنوان ، قیمت و دسته بندی مشخص شده باشند')
                  return
        }

        const {images , ...dataWithoutImages} = productData
        const {mainImage , otherImages} = images
        const form = new FormData()
         form.append('images' , mainImage)
         otherImages.forEach((image ,index)=>{
            form.append('images' , image)
         })

         Object.entries(dataWithoutImages).forEach(([key , value])=>{
               const needStringify = ['features' , 'categories']
               if(needStringify.includes(key)){
                  form.append(key , JSON.stringify(value))
               }else if(typeof value == 'string'){
                     form.append(key ,value)
               }
         })
         
        const res = await fetch(`http://localhost:5000/product/${edit ? 'update':'create'}` , {
            method:`${edit ? 'PATCH': "POST"}` , credentials:'include',
            body:form ,
        })
        const result = await res.json()
        if(result.status ==201){
            toast.success('محصول با موفقیت اضافه شد')
        }
      }
 
  return (
    <div  className={styles.container} >
      {edit && 
        <h2>{`ادیت محصول${1}`}</h2>
      }
          <div className={styles.addProductContainer}>
            <AdminProductContext.Provider value={{productData , setProductData}}>
                <div className={styles.infoSection}>
                      <TitleAndDescSection />
                      <PriceSection />
                      <ImageSection />
                      <ListInfo />
                      <Desc />
                </div>
            </AdminProductContext.Provider> 
            <button
              className={styles.submitButton}
              onClick={submitHandler}>
                         ثبت محصول  
              <MdOutlineLibraryAddCheck />
            </button>
          </div> 
          <Toaster />
    </div>
  )
}

export default CreateProduct