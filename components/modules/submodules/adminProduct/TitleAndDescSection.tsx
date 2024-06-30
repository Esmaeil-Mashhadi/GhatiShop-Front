import { ChangeEvent, ChangeEventHandler, useContext, useEffect, useState } from 'react'
import styles from './Title.module.css'
import { CategoriesObject } from '../../layout/CategorySection'
import { AdminProductContext, ProductType } from './CreateProduct'

interface ShowCatPropHandler {
  children : CategoriesObject[] , 
  handler : ChangeEventHandler<HTMLInputElement>
  productData : ProductType
}

function ShowCat({children , handler , productData }:ShowCatPropHandler){
  return(
    <ul>
      {children.map((cat:CategoriesObject , index:number)=>(
        <li key={index}>
            <input checked={productData.categories.find(item => item == cat.slug) == cat.slug} type='checkbox' onChange={handler} value={cat.slug} />{cat.name}  
           {cat.children ? 
           <ShowCat  productData={productData} handler={handler} children = {cat.children} />  :null
          } 
        </li>
      ))}
    </ul>
  )
}


function TitleAndDescSection() {

  const {setProductData , productData} = useContext(AdminProductContext) 
  const [cateList , setCatList] = useState([])

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
        <div className={styles.categorySide}>
          {cateList && 
            <div>
                {cateList.flat().map((cat:CategoriesObject , index:number)=>(
                  <ul key={index}>
                    <li> <input checked={productData.categories.find(item => item == cat.slug) == cat.slug} type='checkbox' onChange={changeInputHandler} value={ cat.slug} />{cat.name}  </li>
                    {cat.children.length > 0 ?
                    <ShowCat productData={productData} handler = {changeInputHandler} children = {cat.children} /> :null
                    }
                  </ul>
                ))}
          </div>}
        </div>
    </div>
</div>
  )
}

export default TitleAndDescSection