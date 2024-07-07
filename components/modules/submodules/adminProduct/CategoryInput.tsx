import styles from './CategoryInput.module.css'

import { CategoriesObject } from '../../layout/CategorySection'
import { ChangeEventHandler, Dispatch, SetStateAction } from 'react'
import { ProductType } from './CreateProduct'

interface ShowCatPropHandler {
    children : CategoriesObject[] , 
    handler : ChangeEventHandler<HTMLInputElement>
    productData : string[]
  }
  

function ShowCat({children , handler , productData }:ShowCatPropHandler){
    return(
      <ul>
        {children.map((cat:CategoriesObject , index:number)=>(
          <li key={index}>
              <input checked={productData.find(item => item == cat.slug) == cat.slug} type='checkbox' onChange={handler} value={cat.slug} />{cat.name}  
             {cat.children ? 
             <ShowCat  productData={productData} handler={handler} children = {cat.children} />  :null
            } 
          </li>
        ))}
      </ul>
    )
  }

interface CategoryInputPropType {
    catList : CategoriesObject[]
    changeInputHandler: Dispatch<SetStateAction<any>>
    productData?: ProductType
    newCategories?:string[]
}

function CategoryInput({catList, productData , newCategories , changeInputHandler}:CategoryInputPropType) {
    const existingCategories:string[] = productData ? productData.categories : newCategories ?? ['']
    
  return (
    <div className={styles.categorySide}>
    {catList && 
      <div>
          {catList.map((cat:CategoriesObject , index:number)=>(
            <ul key={index}>
              <li> <input checked={existingCategories.find((item:any) => item == cat.slug) == cat.slug} type='checkbox' onChange={changeInputHandler} value={ cat.slug} />{cat.name}  </li>
              {cat.children.length > 0 ?
              <ShowCat productData={existingCategories} handler = {changeInputHandler} children = {cat.children} /> :null
              }
            </ul>
          ))}
    </div>}
  </div>
  )
}

export default CategoryInput