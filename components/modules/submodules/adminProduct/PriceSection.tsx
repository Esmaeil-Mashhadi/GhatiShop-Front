import { ChangeEvent, useContext } from 'react'
import styles from './PriceSection.module.css'
import { AdminProductContext } from './CreateProduct'

function PriceSection() {
  const {setProductData , productData} = useContext(AdminProductContext) 

  const changeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const{name , value} = e.target
    if(setProductData && productData){
      setProductData({...productData , [name]:value})
    }
  }
  return (
    <div className={styles.titleContainer}>

    <div className={styles.title}>
      <label> قیمت به تومان :  </label>
      <input value={productData.price} name='price' onChange={changeHandler} type='number' />
    </div>

    <div className={styles.title}>
      <label> قیمت ویژه  :  </label>
      <input value={productData.specialPrice} name='specialPrice' onChange={changeHandler} type='number' />
    </div>
</div>
  )
}

export default PriceSection