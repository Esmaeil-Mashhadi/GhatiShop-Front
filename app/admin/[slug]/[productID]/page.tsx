'use client'
import CreateProduct, { ProductType } from '@/components/modules/submodules/adminProduct/CreateProduct'
import React, { useEffect, useState } from 'react'

interface editPagePropType {
    params:{
    slug:string , 
    productID:string  
    } 
}


function page({params}:editPagePropType) {

    const [productData , setProductData] = useState<ProductType>()
    useEffect(()=>{
        const getProductInfo = async()=>{ 
       const res =  await fetch(`http://localhost:5000/product/${params.productID}` , {
        method:"GET"
       })
       const result = await res.json()
       setProductData(result.data.product)
    }

    getProductInfo()
    },[])

    console.log(productData);

  return (
    <>
    {productData ?
    <CreateProduct productDataForEdit = {productData} edit ={true} />
     : <h1 style={{margin:'auto'}}>loading ...</h1>
    }
    </>
  )
}

export default page