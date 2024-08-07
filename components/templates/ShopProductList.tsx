'use client'

import { useEffect, useState } from "react"
import ProductCard from "../modules/shopList/ProductCard"
import styles from './ShopProductList.module.css'
import LoadingPage from "../constants/Notif&Loader/LoadingPage"
import {  useSearchParams } from "next/navigation"
import { ProductType } from "../modules/submodules/adminProduct/CreateProduct"

function ShopProuctList() {
    const [productList, setProductList]= useState<ProductType[]>([])
    const[loading , setLoading] = useState(true)

    const params = useSearchParams()
    const keySearch = params.get('search')
    const categorySearch = params.get('category')

    const query = categorySearch ? `category=${categorySearch}` : keySearch ? `search=${keySearch}`:''
    useEffect(()=>{
        const getProducts = async()=>{
            const res= await fetch(`http://localhost:5000/product/list?${query}`, {
                method:"GET"
            })
            const result = await res.json()
            setProductList(result.data.products)
            setLoading(false)     
        }
        getProducts()
   },[params])

   console.log(!!productList.length);
  
  return (
    <>
    {loading && <LoadingPage />}
    {!productList.length  && !loading && (
        <div className={styles.notFoundContainer}>
            <img  src="/products/noProduct.png"/> 
            <p>نداریم همچین محصولی !</p>
        </div>
    )}
    <div className={styles.listContainer}>
        {productList.map((product:ProductType)=>(
            <ProductCard  product ={product}/>
        ))}

    </div>
    </>
  )
}

export default ShopProuctList