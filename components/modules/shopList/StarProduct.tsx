'use client'

import { HiStar } from 'react-icons/hi'
import styles from './StarProduct.module.css'
import { useState } from 'react'

function StarProduct() {

  const [currentStar , setCurrentStar] = useState(0)
  const handleStars =(index:number)=>{
    setCurrentStar(index)
  }
  return (

    <div    onMouseLeave={()=>{setCurrentStar(0)}}  className={styles.starContainer}>
    <label>امتیاز شما به این محصول : </label>
    {[...Array(5)].map((_ , index:number)=>(
         <HiStar 
         onMouseEnter={()=>handleStars(index)} key={index}
         style={currentStar>index ? {color:'yellow'}: undefined}
         />
    ))}
  </div>
  )
}

export default StarProduct