import CardInfo from '../modules/shopList/CardInfo'
import styles from './ProductDetail.module.css'


async function ProductDetail({productID}:{productID:string}) {

    const productResponse = await fetch(`http://localhost:5000/product/${productID}`, {
        method:"GET" , cache:"no-store"
    })
    const {data:{product}} = await productResponse.json()

    
  return (
    <div className={styles.container}>
         <CardInfo product = {product}  />

        <div className={styles.bottomSide}>
                    
                    <div className={styles.description}>
                            <div dangerouslySetInnerHTML={{__html: (product.description)}}>
                            </div>
                    </div>
        </div>
        
    </div>
  )
}

export default ProductDetail