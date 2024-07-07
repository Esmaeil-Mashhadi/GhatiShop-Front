import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import styles from './AddCategory.module.css'
import { TbTrash } from 'react-icons/tb'
import Select from './Select'
import {  MdOutlinePlaylistAdd } from "react-icons/md";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { AddCategoryFormType } from '../../admin/Categories';


type AddCategoryPropType ={
  handler?:() => void
  addCatHandler : (layerKey: string) => void
  layerNumber:number
  addCategoryForm:AddCategoryFormType
  setAddCategoryForm:Dispatch<SetStateAction<AddCategoryFormType>>
}




function AddCategory({handler , layerNumber  , addCatHandler , addCategoryForm , setAddCategoryForm}:AddCategoryPropType) {
  console.log(addCategoryForm);
      const layerKey= `layer${layerNumber}`

       const deleteHandler = (index:number)=>{
        const inputLists = {...addCategoryForm}
        inputLists[layerKey].splice(index , 1)
         setAddCategoryForm(inputLists)
       }  


       const changeHandler = (index :number , e:ChangeEvent<HTMLInputElement> , layerKey:string)=>{
        const name = e.target.name
        const value = e.target.value

        const inputList = [...addCategoryForm[layerKey]]
        inputList[index] ={
          ...inputList[index],
          [name] :value,
          layer:layerNumber
        }
        setAddCategoryForm({
          ...addCategoryForm, 
          [layerKey]:inputList
        })
        
       }
  return (
    <div className={styles.addSection}>

      <div className={styles.buttonContainer}>
        {layerNumber ? 
                    <button style={{flex:1}}  onClick={()=>addCatHandler(layerKey)}>
                      {`ایجاد دسته بندی در لایه ی ${layerNumber}`}
                      <MdOutlinePlaylistAdd />
                    </button>
            :
            <> 
                <button onClick={()=>addCatHandler(layerKey)}>
                   ایجاد دسته ی اصلی
                  <MdOutlinePlaylistAdd /> 
                </button>

                <button 
                className={styles.layerButton}  onClick={handler}> ایجاد لایه <MdOutlineLibraryAdd /></button>
            </>
      }
      </div>

    <div className={styles.categorySection}>
        {addCategoryForm[layerKey]?.map((item, index:number)=>(
                        <div className={styles.inputSection}>
                                          <input value={addCategoryForm[layerKey][index].name} onChange={(e)=>changeHandler(index ,e , layerKey)} name='name' placeholder= 'نام دسته بندی'/>
                                          <input value={addCategoryForm[layerKey][index].slug} onChange={(e)=>changeHandler(index ,e  , layerKey)} name='slug' placeholder='نامک (به انگلیسی)'  />
                          {layerNumber ? 
                          <Select
                           parent = {item.parent}
                           layerNumber ={layerNumber}
                           index ={index}
                           addCategoryForm={addCategoryForm} 
                           setAddCategoryForm ={setAddCategoryForm} 
                           layerkey ={layerKey}/> : null}
                          <TbTrash  onClick={()=>deleteHandler(index)}/>
                        </div>
        ))}
    </div>
</div>
  )
}

export default AddCategory