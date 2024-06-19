import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from './Select.module.css'
import { AddCategoryFormType } from '../../admin/Categories'
type SelectPropType ={
  layerkey:string 
  setAddCategoryForm :Dispatch<SetStateAction<AddCategoryFormType>>
  addCategoryForm:AddCategoryFormType 
  index:number
  layerNumber : number
  parent:string ,
}
function Select({layerkey , setAddCategoryForm , addCategoryForm , index , layerNumber , parent  }:SelectPropType) {
  const [selectOption , setSelectOption] = useState('')
  const [parents , setParents] = useState([{name:'انتخاب والد' ,_id:""}])

  const changeHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
    const updatedForm = {...addCategoryForm}
    const selectedParent = parents.find((item)=>item.name == e.target.value)
    updatedForm[layerkey][index].parent = e.target.value 
     if(selectedParent){
       updatedForm[layerkey][index].parentID = selectedParent._id 
     }

    setAddCategoryForm({...updatedForm})
    setSelectOption(e.target.value)
    }

    useEffect(()=>{
      const currentParents = [...addCategoryForm[`layer${layerNumber - 1}`]]
      currentParents.unshift({name:'انتخاب والد' , parent:"" , slug:"" , _id:"" })
      setParents(currentParents)
    },[])  

  return ( 
    <div className={styles.container}> 
         <select value={parent?  parent : selectOption} onChange={changeHandler} >
              {parents.map((item , index)=>(
                <option  value ={index == 0 ? '' :undefined} key={index}>
                 {item.name}
                </option>
                
              ))}
         </select>
    </div>
  )
}

export default Select