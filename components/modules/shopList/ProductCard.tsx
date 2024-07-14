import styles from './ProductCard.module.css'

import { MdShoppingCartCheckout } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { SlEyeglass } from "react-icons/sl";

import Link from 'next/link';




function ProductCard({product}:any) {

        const off = Math.round((1-(product.specialPrice/product.price))*100)

  return (
    <div className={styles.container}>

            <Link href={`shopList/${product._id}`} className={styles.info}>
                    <p className={styles.title}>{product.title}</p>

                <div className={styles.imageCard}>
                    <div className={styles.mainImage}>
                        <div className={styles.off}>
                                <span>{`${off}%` || null}</span>
                        </div>
                        <img  src={product.mainImage || '/products/noImage.png'}/>
                   </div>

                </div>
                <div className={styles.pricePart}>
                        قیمت : 
                             {product.specialPrice ? 
                             <div className={styles.discountPart}>
                                <p style={{ textDecoration: 'line-through' , color:'lightpink' }}>{product.price}</p> 
                                <p style={{color:"chartreuse"}}>{product.specialPrice}</p> 
                             </div>: 
                             <p>{product.price}</p>
                             }
                             تومان
                </div>
                    
            </Link>



            <div className={styles.buttons}>
                    <button title='افزودن به سبد خرید'>
                        <MdShoppingCartCheckout />
                    </button>
                    <button title='بزرگ نمایی عکس'>
                        <SlEyeglass />
                    </button>
                    <button title='افزودن به علاقه مندی ها'>
                        <MdFavoriteBorder />
                   </button>
            </div>

    </div>
  )
}

export default ProductCard