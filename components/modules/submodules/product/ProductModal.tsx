import { Dispatch, SetStateAction } from 'react'
import CardInfo from '../../shopList/CardInfo'
import { ProductType } from '../adminProduct/CreateProduct'
import styles from './ProductModal.module.css'

interface ProductModal {
  product:ProductType , 
  setShowProduct: Dispatch<SetStateAction<boolean>>
}

function ProductModal({product , setShowProduct }:ProductModal) {
  return (
    <div onClick={()=>{ setShowProduct(false)}} className={styles.modalContaienr}>

    <div onClick={(e)=>e.stopPropagation()} className={styles.modal}>
        <CardInfo modal={true} product ={product}/> 
    <button className={styles.closeButton}  onClick={()=>setShowProduct(false) }>
        X
    </button>
    </div>

</div>
  )
}

export default ProductModal