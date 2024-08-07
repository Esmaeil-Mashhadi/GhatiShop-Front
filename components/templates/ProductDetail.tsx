import SolidButton from '../constants/buttons/SolidButton';
import CardInfo from '../modules/shopList/CardInfo'
import StarProduct from '../modules/shopList/StarProduct';
import styles from './ProductDetail.module.css'


interface FeatuerType{
  name:string , 
  description:string 
}

async function ProductDetail({productID}:{productID:string}) {

    const productResponse = await fetch(`http://localhost:5000/product/${productID}`, {
        method:"GET" , cache:"no-store"
    })
    const {data:{product}} = await productResponse.json()

  return (
    <div className={styles.container}>
         <CardInfo modal={false} product = {product}  />

      {!!product.features.length && 
        <div className={styles.detailSection}>
          <h1>مشخصات کلی</h1>
        {product.features.map((item:FeatuerType , index:number)=>(
          <div key={index} className={styles.featuresContainer}>
            <label>
              {item.name}
            </label>
            <p>
              {item.description}
            </p>
          </div>
        ))}
        </div>}
        
         <div className={styles.description}>
              <h1>توضیحات</h1>
                 <div dangerouslySetInnerHTML={{__html: (product.description)}}>
                 </div>
         </div>

        <div className={styles.commentSection}>
              <h1>نظرات</h1>

              <div className={styles.commentInfo}>
                <div>
                  <label>نام : </label>
                  <input />
                </div>
                <div>
                  <label>تلفن : </label>
                  <input />
                </div>
              </div>
              <StarProduct />
              <textarea placeholder=' دیدگاه خودتون رو اینجا بنویسید ...' />
              <SolidButton  text='ثبت'/>

        </div>
        
    </div>
  )
}

export default ProductDetail