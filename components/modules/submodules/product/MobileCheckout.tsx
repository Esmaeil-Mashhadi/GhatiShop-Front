import SolidButton from '@/components/constants/buttons/SolidButton'
import styles from './MobileCheckout.module.css'

function MobileCheckout({product , discountCode , handleDiscountChange, off}:any) {

   

  return (
    <div id='cart' className={styles.container}>
        <div className={styles.addProductButton}>
            <SolidButton text='افزودن به سبد خرید' />
        </div>
        <div className={styles.priceContainer}>
                     {product.specialPrice ? 
                     <div className={styles.discountPart}>
                         <div className={styles.offPart}>
                                <p className={styles.discountedPrice}>{product.price}</p>    
                                <span>{`${off}%`}</span>
                         </div>
                         <p className={styles.mainPrice}>{product.specialPrice}  تومان</p>
                     </div>: 
                     <p className={styles.mainPrice}>{product.price} تومان : </p>
                    }  

                        <div className={styles.discountCode}>
                            {discountCode.trim().length > 0 ?
                               <SolidButton text='اعمال کد تخفیف'/>:
                               <label>کد تخفیف دارید ؟ </label>
                            }
                            <input value={discountCode} onChange={handleDiscountChange} type='text'  />
                        </div>
                </div>
    </div>
  )
}

export default MobileCheckout