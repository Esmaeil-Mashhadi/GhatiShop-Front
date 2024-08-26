'use client'
import { useEffect, useState } from 'react'
import styles from './ProfileOrders.module.css'
import { commaSeperator } from '@/utils/converters/commaSeperator'
import { numberToPersian } from '@/utils/converters/converToPersianNum'
import { MdStars } from "react-icons/md";
import SolidButton from '@/components/constants/buttons/SolidButton'
import Link from 'next/link'


function ProfileOrders() {
  const [orders ,  setOrders] = useState([])

  useEffect(()=>{
      const getProducts = async()=>{
        const res = await fetch('http://localhost:5000/product/list', {
          method:'GET' , credentials:'include'
        })
        const {data} = await res.json()
        setOrders(data.products)
      }

      getProducts()
  },[])

  const factors ={order1 :orders.slice(0 ,3) , orders2:orders.slice(3 , 5)}

  return (
    <div className={styles.container}>
        {Object.entries(factors).map(([key , value])=>(
          <Link href={`/profile/orders/${2}`} title='مشاهده ی جزئیات فاکتور' className={styles.orderContainer}>
              <div className={styles.orderInfo}>
                {value.map((list:any)=>(
                  <div className={styles.miniProduct}>
                      <img src={list.mainImage} />
                      <p>{list.title}</p>
                  </div>
                ))}
              </div>

              <div className={styles.detail}>
                  <p>مبلغ کل فاکتور : <span>{commaSeperator(546000)}تومان</span></p>
                  <p> امتیاز دریافتی ازین خرید : <span>{numberToPersian(5)} <MdStars /></span></p>
                  <p>تاریخ فاکتور :<span> {`${new Date().toLocaleDateString()}`}</span></p>
              </div>
                
          </Link>
          
        ))}

    </div>
  )
}

export default ProfileOrders
