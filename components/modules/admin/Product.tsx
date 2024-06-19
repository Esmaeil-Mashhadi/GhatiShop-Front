import { Dispatch, SetStateAction, createContext, useState } from 'react'
import Desc from '../submodules/adminProduct/Desc'
import ImageSection from '../submodules/adminProduct/ImageSection'
import ListInfo from '../submodules/adminProduct/ListInfo'
import PriceAndCategory from '../submodules/adminProduct/PriceAndCategorySection'
import TitleAndDescSection from '../submodules/adminProduct/TitleAndDescSection'
import styles from './Product.module.css'
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import Link from 'next/link'
import {  useSearchParams } from 'next/navigation'


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
  }

interface ProductContextType  {
      productData:ProductType ,
      setProductData: Dispatch<SetStateAction<ProductType>>
}

export const AdminProductContext = createContext<ProductContextType|undefined>(undefined)

function AdminProducts() {
      const [productData , setProductData] = useState<ProductType>({
            title:"" , shortDesc:"" , price:"" , specialPrice:"" ,
            images:{mainImage:"", otherImages:[""]} , 
            description:"" , 
            features : []
      })

      const submitHandler = ()=>{

      }
  
      const params = useSearchParams()
      const selectStyle:Record<string , string> ={
          '--transfer':  params.get('createProduct') ? '0%' :"-100%"
      }

      console.log(productData);

  return (
    <div  className={styles.container} >
       <div style={selectStyle} className={styles.titleContainer}>
             <Link href={{pathname:'/admin/products' , query:{createProduct: true}}}>ایجاد محصول</Link> 
            <Link href={{pathname:'/admin/products' , query:{productList: true}}}>لیست محصولات</Link>
       </div>

       {params.get('createProduct') ? 
          <div className={styles.topSide}>
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
          </div> : 
          <div>
             لیست محصول
          </div>
       
      }
          
    </div>
  )
}

export default AdminProducts