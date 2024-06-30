import { Dispatch, SetStateAction } from 'react';
import { IncomingProductType } from './AdminProductList'
import styles from './ProductContainer.module.css'
import { CiEdit } from "react-icons/ci";
import { CiSquareRemove } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

type ProductContainerPropType ={
  products : IncomingProductType[]
  selectedProducts:string[]
  setSelectedProducts:Dispatch<SetStateAction<string[]>>
}
function ProductContainer({products , selectedProducts , setSelectedProducts}:ProductContainerPropType) {

  const router = useRouter()
  const handleCheckChange = (e:any , productID:string , index:number)=>{
    if(e.target.checked){
      setSelectedProducts([...selectedProducts, productID])
    }else{
      const upadtedSelectedProducts = selectedProducts.filter(item => item !== productID)
      setSelectedProducts(upadtedSelectedProducts)
    } 
  }

  return (
        <>
    {products.map((product:IncomingProductType , index)=>(
        <div className={styles.productContainer}>
           <div className={styles.rightSide}>
                <img src ={product.images[0]} />
                <div className={styles.infoContainer}>

                  <p>عنوان محصول: {product.title}</p>
                  <p>توضیحات کوتاه : {product.shortDesc}</p>
                  <div className={styles.priceSection}>
                      <p>قیمت : {product.price}</p>
                      <p>قیمت ویژه:  {product.specialPrice ?? null}</p>
                  </div>
                  <div className={styles.category}>
                       <p>دسته بندی محصول : </p>
                      {product.categories.map((cat , index)=>(
                        <p>{cat}</p>
                      ))}
                  </div>

                </div>
           </div>

           <div className={styles.leftSide}>
              <button onClick={()=>{
                  router.push(`product/${product._id}`)
                
              }}>
                ویرایش محصول 
                <CiEdit />
              </button>

              <button >
                حذف محصول 
                <CiSquareRemove/>
              </button>

              <button>
                مشاهده محصول
                <FaRegEye />
                </button>

              <label htmlFor={`check${index}`} className={styles.checkProduct}>
                   <p >انتخاب محصول</p>
                   <input checked ={selectedProducts.includes(products[index]._id)} onChange={(e)=>handleCheckChange(e, product._id , index)} type='checkBox' id={`check${index}`} />       
              </label>
           </div>
        </div>
      ))}
        </>
  )
}

export default ProductContainer