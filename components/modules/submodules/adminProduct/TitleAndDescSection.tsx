import { ChangeEvent, useContext, useEffect, useState } from 'react'
import styles from './Title.module.css'
import { AdminProductContext } from './CreateProduct'
import CategoryInput from './CategoryInput'
import { CategoriesObject } from '../../layout/CategorySection'




type TitleAndDescSectionProp ={
  bulkEdit : boolean
}


function TitleAndDescSection({bulkEdit}:TitleAndDescSectionProp) {

  const {setProductData , productData} = useContext(AdminProductContext) 
  const [catList , setCatList] = useState<CategoriesObject[]>([])

  const changeHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const {name , value} = e.target 
    if(setProductData && productData){
      setProductData({...productData ,[name]:value})
    }
  }

  useEffect(()=>{
    const getData = async()=>{
    const res = await fetch('http://localhost:5000/category/list' ,{
      method:"GET" , 
      credentials:'include'
    })

    const result = await res.json()
     if(result.status == 200){
      const categories = result.data.categories
      setCatList(categories['layer0'])
     }
    }
    getData()
  },[]) 



  const changeInputHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const {checked , value} = e.target 
    let prevProductCat = productData?.categories ?? []
    if(!checked){
       prevProductCat = prevProductCat.filter(item => item != e.target.value) 
    }else{
        prevProductCat = [...prevProductCat , value]
      }
      setProductData({...productData  , categories:[...prevProductCat] })
  }

  return (
    
    <div className={styles.titleContainer}>
    <div className={styles.rightSide}>
      <div className={styles.title}>
        <label> عنوان :</label>
        <input name='title' value={productData.title ?? ""} onChange={changeHandler} type='text' />
      </div>

      <div className={styles.shortDesc}>
          <label>توضیح کوتاه محصول: </label>
          <textarea value={productData.shortDesc ?? ""} name='shortDesc' onChange={changeHandler} />
      </div>

    </div>

    <div className={styles.leftSide}>
          <label>انتخاب دسته بندی محصول :</label>
          <CategoryInput catList={catList} productData={productData} changeInputHandler={changeInputHandler} />
    </div>
</div>
  )
}

export default TitleAndDescSection