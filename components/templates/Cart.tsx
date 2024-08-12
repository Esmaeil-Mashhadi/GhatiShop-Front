'use client'
import { useSelector } from 'react-redux'
import styles from './Cart.module.css'
import { SelectorStateType } from '../modules/shopList/CardInfo'
import { CartProductType } from '@/utils/hooks/CartReducer'
import { commaSeperator } from '@/utils/converters/commaSeperator'

function Cart() {
    const {ordered , totalOrder , totalPrice} =JSON.parse(localStorage.getItem("orders") ?? "")

    console.log('hi');
  return (
    <div className={styles.container}>
       <div className={styles.itemList}>
        {ordered.map((item:CartProductType)=>(
            <div className={styles.productCard}>
                    <img src={item.mainImage} />
                    <div className={styles.info}>
                        <div className={styles.texts}>
                             <p>{item.title}</p>
                             {item.specialPrice ? 
                              <div>
                                <span>
                                    {commaSeperator(item.price)}
                                </span>
                                <span>
                                {commaSeperator(item.specialPrice)}
                                </span>
                              </div>: 
                             <p>{commaSeperator(item.price)}</p>
                            }
                        </div>
                        <div className={styles.buttons}>
                                <button>+</button>
                                <span>{item.quantity}</span>
                                <button>-</button>
                        </div>

                        <label>قیمت نهایی</label>
                        <p>{commaSeperator(Number(item.price) * item.quantity)}</p>
                        
                    </div>
            </div>
        ))}
       </div> 

       <div className={styles.checkoutCard}>

       </div>
    </div>
  )
}

export default Cart