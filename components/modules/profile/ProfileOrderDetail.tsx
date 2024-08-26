'use client'
import React, { useEffect, useState } from 'react'
import styles from './ProfileOrderDetail.module.css'
import { numberToPersian } from '@/utils/converters/converToPersianNum'
import { commaSeperator } from '@/utils/converters/commaSeperator'
import { MdStars } from 'react-icons/md'
import Link from 'next/link'

function ProfileOrderDetail({params}:any) {

    const [orders ,  setOrders] = useState([])

    useEffect(()=>{
        const getProducts = async()=>{
          const res = await fetch('http://localhost:5000/product/list', {
            method:'GET' , credentials:'include'
          })
          const {data} = await res.json()
          setOrders(data.products.slice(1 ,2))
        }
  
        getProducts()
    },[])
  
  return (
    <div title='مشاهده ی محصول ' className={styles.container}>
   {orders.map((product:any)=>(
        <Link href={`/shopList/${product._id}`} className={styles.orderContainer}>
              <img src={product.mainImage} />
            <div className={styles.leftSide}>
                <label>{product.title}</label>
                <p>قیمت خریداری شده  : <span>{`${commaSeperator(122000)}`} تومان</span></p>
                <p>تعداد خریداری شده : <span>{`${numberToPersian(2)}`}</span> </p>
                <p>امتیازی دریافتی از این محصول :<span><MdStars/>{`${numberToPersian(2)}`}</span> </p>
            </div>
        </Link>
      ))}  

    </div>
  )
}

export default ProfileOrderDetail