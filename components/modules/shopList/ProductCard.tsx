import styles from './ProductCard.module.css'

import { MdShoppingCartCheckout } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { SlEyeglass } from "react-icons/sl";
import { HiStar } from 'react-icons/hi'

import Link from 'next/link';
import { useState } from 'react';
import ProductModal from '../submodules/product/ProductModal';
import { commaSeperator } from '@/utils/converters/commaSeperator';
import { ProductType } from '../submodules/adminProduct/CreateProduct';
import { numberToPersian } from '@/utils/converters/converToPersianNum';
import { useDispatch, useSelector } from 'react-redux';
import { add, CartProductType, dec } from '@/utils/hooks/CartReducer';
import { NotifObjectType } from '../auth/types/auth';
import Notification from '@/components/constants/Notif&Loader/Notification';
import { SelectorStateType } from './CardInfo';

type ProductCardType ={
    product:ProductType
}
function ProductCard({product}:ProductCardType) {

        const off =!product.specialPrice? false : Math.round((1-(Number(product.specialPrice)/Number(product.price)))*100)
        const productCart = {title:product.title , specialPrice:product.specialPrice , price:product.price, mainImage:product.mainImage as string ,_id:product._id}

        const [showProduct , setShowProduct] = useState(false)
        const [notifObject , setNotifObject] = useState<NotifObjectType>({
            type:'error',
            message:'',
            triggered:false
        })

        const handleShowingProduct = ()=>{
            setShowProduct(true)
        }
        const data = useSelector((state:SelectorStateType) => state.cartReducer)
        const {quantity} = data.ordered.find((item:CartProductType)=>item._id == product._id) || {quantity:0}
        const dispatch = useDispatch()

        const addToCartHandler = ()=>{
            setNotifObject({
                type:'success', 
                message:'محصول با موفقیت به سبد خرید اضافه شد',
                triggered:!notifObject.triggered
            })
            dispatch(add(productCart))
        }
  return (
    <div className={styles.container}>
            <Link href={`/shopList/${product._id}`} className={styles.info}>
                    <div title={product.title} className={styles.title}>
                       <p> {product.title}</p>
                    </div>
                        {off && 
                            <div className={styles.off}>
                                    <span>{`${off}%` || null}</span>
                            </div>
                        }

                    <div className={styles.mainImage}>
                        <img  src={typeof(product.mainImage) =='string'? product.mainImage : '/products/noImage.png'}/>
                    </div>
                    
                <div className={styles.pricePart}>
                             {product.specialPrice ? 
                             <div className={styles.discountPart}>
                                <p style={{ textDecoration: 'line-through' , color:'lightpink' , opacity:'.8' }}>{commaSeperator(product.price)}</p> 
                                <p>{commaSeperator(product.specialPrice)} تومان</p> 
                             </div>: 
                             <p>{commaSeperator(product.price)} تومان</p>
                             }
                             <div className={styles.starScore}>
                              <HiStar /> {`${numberToPersian('5')}`}
                             </div>   
                </div>
            </Link>


            <div className={styles.buttonsList}>
                    <button className={styles.watchProduct} onClick={handleShowingProduct} title='مشاهده ی سریع'>
                        <SlEyeglass />
                    </button>
                    <button className={styles.favButton} title='افزودن به علاقه مندی ها'>
                        <MdFavoriteBorder />
                   </button>
                     {
                            quantity >= 1 ? 
                            <div className={styles.amountContainer}>
                                <button title='افزودن تعداد' onClick={()=>dispatch(add(productCart))}>+</button>
                                <button title='کاهش تعداد' onClick={()=>dispatch(dec(productCart))}>-</button>
                            </div> : 
        
                            <button className={styles.addToCart} onClick={addToCartHandler} title='افزودن به سبد خرید'>
                                <MdShoppingCartCheckout />
                            </button>
                      }
            </div>
            {
                showProduct && 
                    <ProductModal  product ={product} setShowProduct = {setShowProduct}  />
            }

            <Notification type={notifObject.type} message={notifObject.message} triggered={notifObject.triggered} />
    </div>
  )
}

export default ProductCard