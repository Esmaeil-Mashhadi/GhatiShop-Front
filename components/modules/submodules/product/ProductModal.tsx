import CardInfo from '../../shopList/CardInfo'
import styles from './ProductModal.module.css'

function ProductModal({product , setShowProduct , showProduct}:any) {
  return (
    <div onClick={()=>{ setShowProduct(false)}} className={styles.modalContaienr}>

    <div onClick={(e)=>e.stopPropagation()} className={styles.modal}>
        <CardInfo product ={product}/> 
    <button className={styles.closeButton}  onClick={(e:any)=>setShowProduct(false) }>
        X
    </button>
    </div>

</div>
  )
}

export default ProductModal