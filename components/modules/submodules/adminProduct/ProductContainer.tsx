import { Dispatch, SetStateAction, useState } from 'react';
import { IncomingProductType } from './AdminProductList'
import styles from './ProductContainer.module.css'
import { CiEdit } from "react-icons/ci";
import { CiSquareRemove } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { IoIosWarning } from "react-icons/io";


type ProductContainerPropType ={
  products : IncomingProductType[]
  selectedProducts:string[]
  setSelectedProducts:Dispatch<SetStateAction<string[]>>
  updated:boolean ,
  setUpdated: Dispatch<SetStateAction<boolean>>
}
function ProductContainer({products , selectedProducts , setSelectedProducts ,updated, setUpdated}:ProductContainerPropType) {

  const router = useRouter()
  const [showModal , setShowModal] = useState<Record<string ,boolean>>({})

  const handleCheckChange = (e:any , productID:string , index:number)=>{
    if(e.target.checked){
      setSelectedProducts([...selectedProducts, productID])
    }else{
      const upadtedSelectedProducts = selectedProducts.filter(item => item !== productID)
      setSelectedProducts(upadtedSelectedProducts)
    } 
  }

  const removeHandler = async(id:string)=>{
    const res= await fetch(`http://localhost:5000/product/remove/${id}`, {
      method:"DELETE" , credentials:'include'
    })
    const result =await res.json()
    if(result.status == 200){
      toast.success(result.data.message || 'محصول با موفقیت حذف شد')
      setUpdated(!updated)
      setShowModal({})
    }else{
      setShowModal({})
      toast.error(result.data.message || "مشکلی در حذف محصول پیش آمد")
    }
  }

  const handleModal = (id:string)=>{
      setShowModal({[id]:true})
  }

  console.log(showModal);

  return (
        <>
    {products.map((product:IncomingProductType , index)=>(
        <div className={styles.productContainer}>
           <div className={styles.rightSide}>
                <img src ={product.mainImage ?? '/products/noImage.png'} />
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

              <button onClick={()=>handleModal(product._id)} >
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

           <div style={showModal[product._id] ? {opacity:1 , pointerEvents:"all"}:{opacity:0,pointerEvents:'none'}} className={styles.deleteModal}>
              <p>
                {`محصول ${product.title} حذف شود ؟ `}
                <IoIosWarning />
              </p>
              <div className={styles.deleteBtnContainer}>
                <button onClick={()=>removeHandler(product._id)}>حذف</button>
                <button onClick={()=>setShowModal({})}>لغو</button>
              </div>
           </div>
        </div>

        
      ))}

   
        </>
  )
}

export default ProductContainer