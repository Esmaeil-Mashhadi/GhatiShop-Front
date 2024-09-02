'use client'
import { useEffect, useState } from 'react'
import styles from './ProfileOrders.module.css'
import { commaSeperator } from '@/utils/converters/commaSeperator'
import { numberToPersian } from '@/utils/converters/converToPersianNum'
import { MdStars } from "react-icons/md";
import Link from 'next/link'
import LoadingButton from '@/components/constants/Notif&Loader/LoadingButton'
import LoadingPage from '@/components/constants/Notif&Loader/LoadingPage'


function ProfileOrders() {
  const [orders ,  setOrders] = useState([])
  const [loading , setLoading] = useState(true)

  useEffect(()=>{
      const getProducts = async()=>{
        const res = await fetch('http://localhost:5000/product/list', {
          method:'GET' , credentials:'include'
        })
        const {data} = await res.json()
        setOrders(data.products)
      }

      getProducts()
      setLoading(false)
      
  },[])

  const factors ={order1 :orders.slice(0 ,3) , orders2:orders.slice(3 , 5)}

  return (
    <div className={styles.container}>
      {loading ? (
        <LoadingPage />
      ) : (
        Object.entries(factors).map(([key, value]) => (
          <Link href={`/profile/orders/${2}`} title='مشاهده ی جزئیات فاکتور' className={styles.orderContainer} key={key}>
            <div className={styles.orderInfo}>
              {value.map((list: any) => (
                <div className={styles.miniProduct} key={list.id}>
                  <img src={list.mainImage} alt={list.title} />
                  <p>{list.title}</p>
                </div>
              ))}
            </div>
            <div className={styles.detail}>
              <p>مبلغ کل فاکتور: <span>{commaSeperator(546000)}تومان</span></p>
              <p>امتیاز دریافتی ازین خرید: <span>{numberToPersian(5)} <MdStars /></span></p>
              <p>تاریخ فاکتور: <span>{new Date().toLocaleDateString()}</span></p>
              <Link className={styles.watchFactor} href={`/profile/orders/${2}`}>
                مشاهده ی فاکتور
              </Link>
            </div>
          </Link>
        ))
      )} 
    </div>
  )
}

export default ProfileOrders
