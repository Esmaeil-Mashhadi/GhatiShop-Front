'use client'
import {  ChangeEvent, MouseEvent, useState } from 'react'
import styles from './CardInfo.module.css'
import { MdFavorite } from "react-icons/md";
import { BsFillShareFill } from "react-icons/bs";
import { NeutralButton } from '@/components/constants/buttons/Button';
import CardInfoImageSection from '../submodules/product/CardInfoImageSection';
import FeatureBox from '../submodules/product/FeatureBox';
import MobileCheckout from '../submodules/product/MobileCheckout';
import SolidButton from '@/components/constants/buttons/SolidButton';
import { commaSeperator } from '@/utils/converters/commaSeperator';
import { GiPriceTag } from "react-icons/gi";
import Link from 'next/link';
import { ProductType } from '../submodules/adminProduct/CreateProduct';
import { FaTrashAlt } from "react-icons/fa";
import { numberToPersian } from '@/utils/converters/converToPersianNum';
import Notification from '@/components/constants/Notif&Loader/Notification';
import { NotifObjectType } from '../auth/types/auth';
import { useDispatch, useSelector } from 'react-redux';
import { add, CartProductType, dec } from '@/utils/hooks/CartReducer';


interface CardInfoPropType {
  product:ProductType 
  modal: boolean
}

export interface SelectorStateType{
   [key:string] :{
    ordered:CartProductType[] 
    totalOrder:number 
    totalPrice:number | string
   }
}

function CardInfo({product , modal}:CardInfoPropType) {
    
    const [discountCode , setDiscountCode] = useState('')
    const [notifObject , setNotifObject] = useState<NotifObjectType>({
        message:"" ,
        triggered: false , 
        type:'error'
    })

    const off = Math.round((1 - (Number(product.specialPrice) / Number(product.price))) * 100);
    
    const handleDiscountChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setDiscountCode(e.target.value)
    }



    const {ordered , totalOrder , totalPrice} = useSelector((state:SelectorStateType) => {
        if(state.cartReducer.ordered.length){
            return state.cartReducer
        }else{
           return JSON.parse(localStorage.getItem("orders")||"{}")
        }
    
    }) 
   
    const dispatch  = useDispatch()

    const {quantity}= ordered?.find((item:CartProductType) => item._id == product._id) || {quantity:0}

    const AddToCartHandler= (e:MouseEvent<HTMLButtonElement>)=>{
        const mainImageString = typeof(product.mainImage)=='string' ? product.mainImage :''
        const productForCart = {title:product.title, mainImage:mainImageString , price:product.price , specialPrice:product.specialPrice, _id:product._id}

        
        if(quantity == 0){
            setNotifObject({
                type:'success', 
                message:"محصول به سبد خرید اضافه شد" , 
                triggered:!notifObject.triggered
            })
            dispatch(add(productForCart)) 
        }else{
            const {name} = e.currentTarget
            name == 'inc' ?     dispatch(add(productForCart)) : name =='dec' ? dispatch(dec(productForCart)) : null
        }
        }

  return (
    
    <div className={ styles.container}>
        <CardInfoImageSection  product={product} />
    <div className={styles.infoSection}>
                <h1>{product.title}</h1>
                
                {!!product.features.length ? 
                        <FeatureBox  features = {product.features}/>: 
                <p className={styles.shortDesc}>{product.shortDesc}</p>
                } 

        <div className={styles.priceContainer}>  
                <div className={styles.checkoutSection}>
                            <div className={styles.checkoutButton}>
                                {quantity >= 1 ?
                                 <div className={styles.counterButtons}>
                                        <button name='inc' onClick={AddToCartHandler}>+</button>
                                        <span>{` ${numberToPersian(quantity)}`}</span>
                                        {
                                            quantity == 1 ? 
                                            <button name='dec' onClick={AddToCartHandler}><FaTrashAlt /></button>:
                                            <button name='dec' onClick={AddToCartHandler}>-</button>
                                        }
                                 </div>:
                                 <div className={styles.addToCartButton}>
                                     <NeutralButton text='افزودن به سبد خرید' handler={AddToCartHandler}/>
                                 </div>
                            }
                             </div>
                     </div>
                    
                     {product.specialPrice ? 
                     <div className={styles.discountPart}>
                         <div className={styles.offPart}>
                                <p className={styles.discountedPrice}>{commaSeperator(product.price)}</p>    
                                <span>{`${off}%`}</span>
                         </div>
                         <p className={styles.mainPrice}>{commaSeperator(product.specialPrice)}  تومان
                             <span className={styles.priceTag}>
                                         <GiPriceTag />
                             </span>
                         </p>
                     </div>: 
                     <div className={styles.mainPrice}>{commaSeperator(product.price)} تومان 
                            <p className={styles.priceTag}>
                             <GiPriceTag />
                            </p>
                      </div>
                    }  
        </div>
      

                <div className={styles.buttonContainer}>

     
                    <div className={styles.optionSelection}>
                        <button title='افزودن به علاقه مندی'><MdFavorite/></button>
                        <button title='اشتراک گذاری محصول'><BsFillShareFill /></button>
                    </div>
                </div>
    </div>
    {modal&& <Link href={`/shopList/${product._id}`} className={styles.watchProduct}>
        مشاهده ی کامل محصول
    </Link>}
     <MobileCheckout
      product ={product} 
      discountCode ={discountCode}
      handleDiscountChange ={handleDiscountChange}
      off ={off}
    />    

    <Notification type={notifObject.type}  message={notifObject.message} triggered={notifObject.triggered}/>
</div>
  )
}

export default CardInfo