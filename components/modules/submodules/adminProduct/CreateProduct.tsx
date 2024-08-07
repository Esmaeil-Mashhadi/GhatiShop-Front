import { Dispatch, SetStateAction, createContext, useState } from 'react'
import styles from './CreateProduct.module.css'
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast'
import TitleAndDescSection from './TitleAndDescSection';
import ImageSection from './ImageSection';
import ListInfo from './ListInfo';
import Desc from '../../submodules/adminProduct/Desc'
import PriceSection from './PriceSection';



export interface ProductType {
      title: string;
      shortDesc: string;
      price: string | number;
      specialPrice: string | number;
      otherImages: (string | File)[] ;
      mainImage:(string |File ), 
      description: string;
      features: {name:"", description:""}[];
      categories:(string)[]
      _id?:string 
  }

interface ProductContextType  {
      productData:ProductType ,
      setProductData: Dispatch<SetStateAction<ProductType>>
}

export const AdminProductContext = createContext<ProductContextType>({
      productData:{
            title:"" , shortDesc:"" , price:"" , specialPrice:"" ,
            otherImages:[], 
            mainImage:"",
            description:"" , 
            features : [] , 
            categories:[]
      } , 
      setProductData:()=>{}
})
type createProductType ={
      edit?: boolean
      productDataForEdit?: ProductType
      productID?: string
}

function CreateProduct({edit , productDataForEdit , productID}:createProductType) {
      const [productData , setProductData] = useState<ProductType>(()=>{
            if(edit && productDataForEdit){
                 return  productDataForEdit
            }else{
                  return {
                        title:"" , shortDesc:"" , price:"" , specialPrice:"" ,
                        otherImages:[] , 
                        mainImage:'',
                        description:"" , 
                        features : [] , 
                        categories:[]
                  }
            }
      })
      
  
      const submitHandler = async()=>{

        const checkIfEmpty = [!!productData.categories.length ,!!productData.title.trim() , !!(String(productData.price).trim())]

        if(checkIfEmpty.includes(false)){
             toast.error('چک کنید که فیلد عنوان ، قیمت و دسته بندی مشخص شده باشند')
                  return
        }
        const {otherImages , mainImage, ...dataWithoutImages} = productData
        const form = new FormData()

        otherImages.forEach((image ,index)=>{
            form.append('otherImages' , image)
         })
         form.append('mainImage' , mainImage)
         
         Object.entries(dataWithoutImages).forEach(([key , value])=>{
               const needStringify = ['features' , 'categories']
               if(needStringify.includes(key)){
                  form.append(key , JSON.stringify(value))
               }else if(typeof value == 'string'){
                     form.append(key ,value) 
               }
         })
         

        const res = await fetch(`http://localhost:5000/product/${edit ? `update/${productID}`:'create'}` , {
            method:`${edit ? 'PATCH': "POST"}` , credentials:'include',
            body:form ,
        })
        const result = await res.json()
        if(result.status ==201){
            toast.success('محصول با موفقیت اضافه شد')
        }else if(result.status == 200){
            toast.success('محصول با موفقیت بروز رسانی شد')
            setTimeout(() => {
                  window.location.reload()
            }, 1000);
            
        }else{
            toast.error(result.data.message || 'مشکلی درآپدیت محصول پیش آمد')
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
                      <TitleAndDescSection bulkEdit={false} />
                      <PriceSection />
                      <ImageSection edit ={edit} />
                      <ListInfo />
                      <Desc />
                </div>
                
            </AdminProductContext.Provider> 
            <button
              className={styles.submitButton}
              onClick={submitHandler}>
                      {edit ? 'بروز رسانی محصول' : "ثبت محصول"}
              <MdOutlineLibraryAddCheck />
            </button>
          </div> 
          <Toaster />
    </div>
  )
}

export default CreateProduct