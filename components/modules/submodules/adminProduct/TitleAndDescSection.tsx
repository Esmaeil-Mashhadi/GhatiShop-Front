import { ChangeEvent, useContext } from 'react'
import styles from './Title.module.css'
import { AdminProductContext } from '../../admin/Product'

function TitleAndDescSection() {

  const {setProductData , productData} = useContext(AdminProductContext) || {}

  const changeHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const {name , value} = e.target 
    if(setProductData && productData){
      setProductData({...productData ,[name]:value})
    }
  }

  return (
    <div className={styles.titleContainer}>
    <div className={styles.title}>
      <label> عنوان :  </label>
      <input name='title' onChange={changeHandler} type='text' />
    </div>

    <div className={styles.shortDesc}>
        <label>توضیح کوتاه محصول: </label>
        <textarea name='shortDesc' onChange={changeHandler} />
    </div>
</div>
  )
}

export default TitleAndDescSection