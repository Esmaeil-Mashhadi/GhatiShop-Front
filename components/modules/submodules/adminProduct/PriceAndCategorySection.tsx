import { ChangeEvent, useContext } from 'react'
import styles from './PriceAndCategorySection.module.css'
import { AdminProductContext } from './CreateProduct'

function PriceAndCategory() {
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
      <input name='price' onChange={changeHandler} type='number' />
    </div>

    <div className={styles.title}>
      <label> قیمت ویژه  :  </label>
      <input name='specialPrice' onChange={changeHandler} type='number' />
    </div>
</div>
  )
}

export default PriceAndCategory