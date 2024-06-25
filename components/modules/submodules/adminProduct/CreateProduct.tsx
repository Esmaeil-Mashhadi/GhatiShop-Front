import { Dispatch, SetStateAction, createContext, useState } from 'react'
import styles from './CreateProduct.module.css'
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast'
import TitleAndDescSection from './TitleAndDescSection';
import PriceAndCategory from './PriceAndCategorySection';
import ImageSection from './ImageSection';
import ListInfo from './ListInfo';
import Desc from '../../submodules/adminProduct/Desc'



export interface ImageType {
      mainImage : File  |string 
      otherImages: (File |string )[] 
}

interface ProductType {
      title: string;
      shortDesc: string;
      price: string;
      specialPrice: string;
      images: ImageType;
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

function CreateProduct() {
      const [productData , setProductData] = useState<ProductType>({
            title:"" , shortDesc:"" , price:"" , specialPrice:"" ,
            images:{mainImage:"", otherImages:[""]} , 
            description:"" , 
            features : [] , 
            categories:[]
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
                  form.append(key , JSON.stringify(value))
         })
         
        const res = await fetch('http://localhost:5000/product/create' , {
            method:"POST" , credentials:'include',
            body:form ,
        })
        const result = await res.json()
        if(result.status ==201){
            toast.success('محصول با موفقیت اضافه شد')
        }
        console.log(result);
      }




  return (
    <div  className={styles.container} >
          <div className={styles.addProductContainer}>
            <AdminProductContext.Provider value={{productData , setProductData}}>
                <div className={styles.infoSection}>
                      <TitleAndDescSection />
                      <PriceAndCategory />
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