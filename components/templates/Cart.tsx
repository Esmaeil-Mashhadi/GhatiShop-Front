'use client'
import styles from './Cart.module.css'
import { CartProductType } from '@/utils/hooks/CartReducer'
import { commaSeperator } from '@/utils/converters/commaSeperator'
import NoProductInCart from '../modules/submodules/Cart/NoProductInCart'
import {  SubmitButton } from '../constants/buttons/Button'
import { ChangeEvent, useState } from 'react'
import SolidButton from '../constants/buttons/SolidButton'
import { useRouter } from 'next/navigation'
import { numberToPersian } from '@/utils/converters/converToPersianNum'

function Cart() {
    const {ordered , totalOrder , totalPrice , totalProfit , totalRawPrice} =JSON.parse(localStorage.getItem("orders") ?? "{}")

     const extractProductPrice = (price:number|string,quantity:number , specialPrice?:number|string )=>{
       if(specialPrice){
          return Number(specialPrice)*quantity 
       }else{
        return Number(price)*quantity
       }
     }

     const [discountCode , setDiscountCode] = useState("")
     const changeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
       const {value} = e.target 
       setDiscountCode(value)
     }

     const router = useRouter()


     return (
      <>
      {!ordered?.length ? <NoProductInCart /> : 
       <div className={styles.container}>     
       <div className={styles.itemList}>
        {ordered?.map((item:CartProductType)=>(
            <div className={styles.productCard}>
                    <img src={item.mainImage} />
                    <div className={styles.info}>
                        <div className={styles.texts}>
                             <p >{item.title}</p>
                             {item.specialPrice ? 
                              <div className={styles.offPart}>
                                <span>
                                    {commaSeperator(item.price)}
                                </span>
                                <span>
                                {commaSeperator(item.specialPrice)} تومان
                                </span>
                              </div>: 
                             <p>{commaSeperator(item.price)} تومان</p>
                            }
                        </div>
                        <div className={styles.buttons}>
                                <button>+</button>
                                <span>{item.quantity}</span>
                                <button>-</button>
                        </div>
                        <p className={styles.finalPrice}> قیمت نهایی :   {commaSeperator(extractProductPrice(item.price , item.quantity , item.specialPrice))} تومان</p>
                        
                    </div>
                    <span className={styles.remove} title='حذف محصول از سبد خرید'>X</span>
            </div>
        ))}
       </div> 

       <div className={styles.checkoutCard}>
            <h3>مجموع سفارش شما</h3>
            <div className={styles.orderDetail}>
              <div className={styles.total}>
                <span style={totalProfit ?{textDecoration:"line-through" , opacity:0.5}:undefined}>مبلغ کل : {`${commaSeperator(totalRawPrice)}`}</span>
                {!!totalProfit && 
                <span>{numberToPersian(Math.round((totalProfit/totalPrice)*100))}%</span>
                }
              </div>
              {!!totalProfit && 
              <div className={styles.finalTotalPriceContainer}>
                <div className={styles.profit}>
                  <span>سود شما از این خرید  </span>
                  <span> {`${commaSeperator(totalProfit)}`} تومان</span>
                </div>
                <div className={styles.finalTotalPrice}>
                  <span > مبلغ نهایی </span>
                  <span >  {commaSeperator(`${totalPrice}`)} تومان </span>
                </div>
              </div>

              }
              <div  className={styles.discount}>
                {discountCode.trim().length ? 
                <SolidButton text='اعمال کد تخفیف' /> :
                  <p> کد تخفیف دارید ؟</p>
                }
                  <input value={discountCode} onChange={changeHandler} />
              </div>

            </div>
            <SubmitButton  text='تسویه حساب'  handler={()=>{router.push('/checkout')}}/>
       </div>
      </div> }
    </>

  )
}

export default Cart