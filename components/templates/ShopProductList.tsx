'use client'

import { useEffect, useState } from "react"
import ProductCard from "../modules/shopList/ProductCard"
import styles from './ShopProductList.module.css'
import LoadingPage from "../constants/Notif&Loader/LoadingPage"

function ShopProuctList() {
    const [productList, setProductList]= useState<any>([])
    const[loading , setLoading] = useState(true)

    useEffect(()=>{
        const getProducts = async()=>{
            const res= await fetch('http://localhost:5000/product/list', {
                method:"GET"
            })
            const result = await res.json()
            setProductList(result.data.products)
            setLoading(false)     
        }
        getProducts()
   },[])

  
  return (
    <>
    {loading && <LoadingPage />}
    <div className={styles.listContainer}>
        {productList.map((product:any)=>(
            <ProductCard  product ={product}/>
        ))}

    </div>
    </>
  )
}

export default ShopProuctList