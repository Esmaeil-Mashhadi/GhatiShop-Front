'use client'
import {  ChangeEvent, useState } from 'react'
import { MdFavorite } from "react-icons/md";
import { BsFillShareFill } from "react-icons/bs";
import { NeutralButton } from '@/components/constants/buttons/Button';
import SolidButton from '@/components/constants/buttons/SolidButton';
import FeatureBox from './FeatureBox';
import CardInfoImageSection from './CardInfoImageSection';
import styles from './ProductModalSummary.module.css'
import { ProductType } from '../adminProduct/CreateProduct';



function ProductModalSummary({product}:{product:ProductType}) {
    
    const [discountCode , setDiscountCode] = useState('')
    const [counter , setCounter]= useState(1)
    const off = Math.round((1-(Number(product.specialPrice)/Number(product.price)))*100)

    const handleDiscountChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setDiscountCode(e.target.value)
    }


    const counterHandler= (e:ChangeEvent<HTMLInputElement>)=>{
        const { name} = e.target
        setCounter((prev:number)=>{
           return name == 'inc' ? prev+1 : name =='dec' && counter>1 ? prev - 1 : 1
        })
    }
     

  return (
    <div className={styles.container}>

        <CardInfoImageSection product={product}  />

    <div className={styles.infoSection}>
                <h1>{product.title}</h1>
                
                {!!product.features.length ? 
                        <FeatureBox features = {product.features}/>: 
                <p className={styles.shortDesc}>{product.shortDesc}</p>
                } 

                <div className={styles.priceContainer}>
                     {product.specialPrice ? 
                     <div className={styles.discountPart}>
                         <div className={styles.offPart}>
                                <p className={styles.discountedPrice}>{product.price}</p>    
                                <span>{`${off}%`}</span>
                         </div>
                         <p>{product.specialPrice}  تومان</p>
                     </div>: 
                     <p>{product.price} تومان : </p>
                    }  

                        <div className={styles.discountCode}>
                            {discountCode.trim().length > 0 ?
                               <SolidButton text='اعمال کد تخفیف'/>:
                                <label>کد تخفیف دارید ؟ </label>
                            }
                            <input value={discountCode} onChange={handleDiscountChange} type='text'  />
                        </div>
                </div>
      

                <div className={styles.buttonContainer}>

                    <div className={styles.checkoutSection}>
                        <div className={styles.checkoutButton}>
                            <NeutralButton text='افزودن به سبد خرید' handler={()=>{}}/>
                        </div>


                    </div>
                    <div className={styles.optionSelection}>
                        <button title='افزودن به علاقه مندی'><MdFavorite/></button>
                        <button title='اشتراک گذاری محصول'><BsFillShareFill /></button>
                    </div>
                </div>
    </div>

</div>
  )
}

export default ProductModalSummary