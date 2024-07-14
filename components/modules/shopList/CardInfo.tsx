'use client'
import { ButtonHTMLAttributes, ChangeEvent, ChangeEventHandler, EventHandler, MouseEventHandler, useState } from 'react'
import styles from './CardInfo.module.css'
import { MdFavorite } from "react-icons/md";
import { BsFillShareFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa6";



function CardInfo({product}:any) {
    
    const [discountCode , setDiscountCode] = useState('')
    const [counter , setCounter]= useState(1)

    const handleDiscountChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setDiscountCode(e.target.value)
    }

    const counterHandler= (e:any)=>{
        const { name} = e.target
        setCounter((prev:number)=>{
           return name == 'inc' ? prev+1 : name =='dec' && counter>1 ? prev - 1 : 1
        })
    }

  return (
    <div className={styles.container}>
    <div className={styles.imageSection}>
            <img className={styles.mainImage} src={product.mainImage || '/products/noImage.png'} />
            <div className={styles.otherImages}>
                {product.otherImages?.map((img:string , index:number) => (
                    <img key={index} src={img || '/products/noImage.png'}/>
                ))}
            </div>
    </div>

    <div className={styles.infoSection}>
                <h1>{product.title}</h1>
                <p className={styles.shortDesc}>{product.shortDesc}</p>

                <div className={styles.priceContainer}>
                     {product.specialPrice ? 
                     <div className={styles.discountPart}>
                         قیمت : 
                         <p style={{textDecoration:"line-through" , color:'pink'}}>{product.price}</p>    
                         <p>{product.specialPrice}</p>
                         تومان
                     </div>: 
                     <p>{product.price} تومان : </p>
                    }  
                     {product.specialPrice  &&
                    <p className={styles.profit}> سود شما ازین خرید : <span> {`${product.price - product.specialPrice}`}</span> تومان  </p>}
                    
                     <div className={styles.discountCode}>
                        {discountCode.trim().length > 0 ?
                            <button>  اعمال کد تخفیف</button>:
                            <label>کد تخفیف دارید ؟ </label>
                        }
                        <input value={discountCode} onChange={handleDiscountChange} type='text'  />
                    </div>

      
                    
  
                </div>
      



                <div className={styles.buttonContainer}>

                    <div className={styles.counter}>
                        <button>
                            افزودن به سبد خرید
                            <FaCartPlus />
                        </button>
                        <label>تعداد : </label>
                        <div className={styles.counterButtons}>
                            <button name='inc' onClick={counterHandler}> + </button>
                            <span>{counter}</span>
                            <button name='dec' onClick={counterHandler}> - </button>
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

export default CardInfo