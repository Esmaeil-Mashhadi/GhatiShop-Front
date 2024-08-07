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

type ProductCardType ={
    product:ProductType
}
function ProductCard({product}:ProductCardType) {

        const off =!product.specialPrice? false : Math.round((1-(Number(product.specialPrice)/Number(product.price)))*100)
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
                        {off && 
                            <div className={styles.off}>
                                    <span>{`${off}%` || null}</span>
                            </div>
                        }
                        <img  src={typeof(product.mainImage) =='string'? product.mainImage : '/products/noImage.png'}/>
                   </div>

                </div>
                <div className={styles.pricePart}>
                             {product.specialPrice ? 
                             <div className={styles.discountPart}>
                                <p style={{ textDecoration: 'line-through' , color:'lightpink' , opacity:'.5' }}>{commaSeperator(product.price)}</p> 
                                <p>{commaSeperator(product.specialPrice)} تومان</p> 
                             </div>: 
                             <p>{commaSeperator(product.price)} تومان</p>
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
                    <ProductModal  product ={product} setShowProduct = {setShowProduct}  />
            }
    </div>
  )
}

export default ProductCard