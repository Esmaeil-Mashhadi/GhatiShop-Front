import { ChangeEvent, Dispatch, ReactElement, SetStateAction, useState } from 'react'
import styles from './AddCategory.module.css'
import { TbTrash } from 'react-icons/tb'
import Select from './Select'

type AddCategoryPropType ={
  handler :Dispatch<SetStateAction<any>>

}

function AddCategory({handler }:AddCategoryPropType) {
    const [catInputList , setCatInputList] = useState<string[]>([])
    const addCatHandler = ()=>{
        setCatInputList([...catInputList , ''])
       }

       const deleteHandler = ()=>{
           
       }

       const changeHandler =(e:ChangeEvent<HTMLInputElement>  , index:number)=>{
        const name = e.target.name 
        const value = e.target.value 
       }
  return (
    <div className={styles.addSection}>

      <div className={styles.buttonContainer}>
        <button onClick={addCatHandler}>ایجاد دسته ی اصلی</button>
        <button className={styles.layerButton} onClick={handler}> ایجاد لایه </button>
      </div>

    <div className={styles.categorySection}>
        {catInputList.map((item , index)=>(
                        <div className={styles.inputSection}>
                          <input onChange={(e)=>changeHandler(e, index)} placeholder= 'نام دسته بندی'/>
                          <input onChange={(e)=>changeHandler(e, index)} placeholder='نامک (به انگلیسی)'  />
                          <TbTrash  onClick={deleteHandler}/>
                        </div>
        ))}
    </div>


</div>
  )
}

export default AddCategory