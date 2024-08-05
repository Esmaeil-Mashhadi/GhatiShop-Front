import SolidButton from '@/components/constants/buttons/SolidButton'
import styles from './MobileCheckout.module.css'
import { GiPriceTag } from 'react-icons/gi'
import { commaSeperator } from '@/utils/converters/commaSeperator'

function MobileCheckout({product , discountCode , handleDiscountChange, off }:any) {


  return (
    <div  id='cart' className={styles.container}>
        <div className={styles.addProductButton}>
            <SolidButton text='افزودن به سبد خرید' />
        </div>
        <div className={styles.priceContainer}>
                     {product.specialPrice ? 
                     <div className={styles.discountPart}>
                         <div className={styles.offPart}>
                                <p className={styles.discountedPrice}>{commaSeperator(product.price)}</p>    
                                <span>{`${off}%`}</span>
                         </div>
                         <p className={styles.mainPrice}>{commaSeperator(product.specialPrice)}  تومان</p>
                     </div>: 
                        <p className={styles.mainPrice}>{commaSeperator(product.price)} تومان  </p>                   
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