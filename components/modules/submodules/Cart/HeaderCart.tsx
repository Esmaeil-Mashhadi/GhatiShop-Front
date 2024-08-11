'use client'
import Link from 'next/link'
import styles from './HeaderCart.module.css'
import { numberToPersian } from '@/utils/converters/converToPersianNum'
import { BsCart4 } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { commaSeperator } from '@/utils/converters/commaSeperator'
import { SelectorStateType } from '../../shopList/CardInfo'

function HeaderCart() {
  const {ordered , totalOrder , totalPrice} = useSelector((state:SelectorStateType) => {
    return state.cartReducer;
  }); 
console.log(totalOrder);
  return (
        <Link className={styles.cartIcon} href="">
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