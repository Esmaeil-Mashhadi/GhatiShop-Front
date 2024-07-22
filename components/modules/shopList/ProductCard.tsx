import styles from './ProductCard.module.css'

import { MdShoppingCartCheckout } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { SlEyeglass } from "react-icons/sl";
import { HiStar } from 'react-icons/hi'

import Link from 'next/link';
import { useState } from 'react';
import ProductModal from '../submodules/product/ProductModal';




function ProductCard({product}:any) {

        const off = Math.round((1-(product.specialPrice/product.price))*100)
        const [showProduct , setShowProduct] = useState(false)

        const handleShowingProduct = ()=>{
            setShowProduct(true)
        }

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
                             {product.specialPrice ? 
                             <div className={styles.discountPart}>
                                <p style={{ textDecoration: 'line-through' , color:'lightpink' , opacity:'.5' }}>{product.price}</p> 
                                <p>{product.specialPrice} تومان</p> 
                             </div>: 
                             <p>{product.price} تومان</p>
                             }
                             <div className={styles.starScore}>
                              <HiStar /> 5
                             </div>     
                </div>
                    
            </Link>


            <div className={styles.buttons}>
                    <button title='افزودن به سبد خرید'>
                        <MdShoppingCartCheckout />
                    </button>
                    <button onClick={handleShowingProduct} title='مشاهده ی سریع'>
                        <SlEyeglass />
                    </button>
                    <button title='افزودن به علاقه مندی ها'>
                        <MdFavoriteBorder />
                   </button>
            </div>
            {
                showProduct && 
                <ProductModal modal={true} product ={product} setShowProduct = {setShowProduct} showProduct ={showProduct} />
            }
    </div>
  )
}

export default ProductCard