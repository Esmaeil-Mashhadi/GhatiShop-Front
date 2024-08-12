'use client'
import Link from 'next/link'
import styles from './HeaderCart.module.css'
import { numberToPersian } from '@/utils/converters/converToPersianNum'
import { BsCart4 } from 'react-icons/bs'
import { commaSeperator } from '@/utils/converters/commaSeperator'

function HeaderCart() {
  const {ordered , totalOrder , totalPrice} =JSON.parse(localStorage.getItem("orders") || '{}')
 
  return (
        <Link className={styles.cartIcon} href="/cart">
                {!totalOrder && <span>سبد خرید </span>} 
                
                {!!totalPrice && 
                <div className={styles.price}>
                <span>{commaSeperator(totalPrice ) }</span> <span>تومان</span>  
                </div>}

                <BsCart4 className='pl-1' /> 
               {!!totalOrder && 
                <span className={styles.cartCount}>{ `${numberToPersian(totalOrder)}`}</span>
               }
        </Link>
  )
}

export default HeaderCart