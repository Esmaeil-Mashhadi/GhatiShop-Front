import styles from './AddCategory.module.css'
import { ChangeEvent, ChangeEventHandler, Dispatch, ReactElement, SetStateAction, useState } from 'react'
import { TbTrash } from 'react-icons/tb'
import Select from './Select'


type addLayerPropType ={
    layerNumber: number
}

interface LayerFormType {
  categoryName: string, 
  categorySlug : string ,
  parent : string ,
  layer: number
}

function AddLayer({layerNumber }:addLayerPropType) {

    const [catInputList , setCatInputList] = useState<LayerFormType[] | []>([])

    const addCatHandler = ()=>{
         setCatInputList([
          ...catInputList , 
          {
            categoryName:"" , 
            categorySlug:"",
            parent:"", 
            layer :layerNumber
          }
         ])
       }

       const deleteHandler = (index:number)=>{
        const inputLists = [...catInputList] 
         const test = inputLists.splice(index , 1)
         console.log(test);
         console.log(inputLists);
         setCatInputList(inputLists)
       }  
 

       const changeHandler = (index :number , e:ChangeEvent<HTMLInputElement>)=>{
        const name = e.target.name
        const value = e.target.value
        const inputList = [...catInputList]

        inputList[index] ={
          ...inputList[index],
          [name] :value,
          parent:"",
          layer:layerNumber
        }
        setCatInputList([...inputList])
        
       }

  return (
    <div className={styles.addSection}>
      <div className={styles.addLayer}>
            <button  onClick={addCatHandler}>{`ایجاد دسته بندی در لایه ی ${layerNumber}`}</button>
      </div>
    <div className={styles.categorySection}>
        {catInputList?.map((_ , index)=>(
                        <div key={index} className={styles.inputSection}>
                          <input value={catInputList[index].categoryName} onChange={(e)=>changeHandler(index ,e)} name='categoryName' placeholder= 'نام دسته بندی'/>
                          <input value={catInputList[index].categorySlug} onChange={(e)=>changeHandler(index ,e)} name='categorySlug' placeholder='نامک (به انگلیسی)'  />
                          <Select />
                          <TbTrash onClick={()=>deleteHandler(index)}/>
                        </div>
        ))}
    </div>


</div>
  )
}

export default AddLayer