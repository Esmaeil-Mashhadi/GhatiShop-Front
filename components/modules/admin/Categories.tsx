import styles from './Categories.module.css';
import AddCategory from '../submodules/adminCategory/AddCategory';
import { ReactElement, useEffect, useState } from 'react';
import { TbTrash } from 'react-icons/tb';
import toast, { Toaster } from 'react-hot-toast';
import { MdAddTask } from 'react-icons/md';


export interface CatFormType {
  name: string, 
  slug : string ,
  parent : string ,
  layer: number
}

function AdminCategories() {
  const [catLayers, setCatLayers] = useState<(ReactElement|string)[]>([]);
  const [addCategoryForm , setAddCategoryForm] = useState<any>({})

  const addLayerHandler = () => {
    setCatLayers([...catLayers, '']); 
  }; 


  const deleteLayerHandler = (index:number)=>{
     const cateList = [...catLayers]
     delete addCategoryForm[`layer${index+1}`] 

     for (let i = index + 1; i < cateList.length; i++) {
      addCategoryForm[`layer${i}`] = addCategoryForm[`layer${i + 1}`];
      delete addCategoryForm[`layer${i + 1}`];
    }
     setAddCategoryForm(addCategoryForm)
     cateList.splice(index ,1)
     setCatLayers(cateList) 
   } 

    
   const submitHandler = async()=>{  
      const res = await fetch(`http://localhost:5000/category/add` , {
        method:"POST" , 
        body:JSON.stringify(addCategoryForm),
        headers:{'Content-Type':'application/json'},
        credentials:'include'
      })
      const result = await res.json()
      if(result.status == 201){
        toast.success(result.data.message) 
      }else{
        toast.error(result.data.message)
      }
    }    
   

       
   const addCatHandler = (layerKey:any )=>{
    if(addCategoryForm[layerKey]){
      setAddCategoryForm({
        ...addCategoryForm,
        [layerKey] :[
          ...addCategoryForm[layerKey] , 
          {
             name:"" , 
             slug:"",
             parent:"", 
            }
        ]
      })
    }else{
      setAddCategoryForm({
        ...addCategoryForm,
        [layerKey] :[
          {
             name:"" , 
             slug:"",
             parent:"", 
            }
        ]
      })
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
      setCatLayers([...Array(Object.values(categories).slice(1).length)]);
      setAddCategoryForm(categories)
     }
    }
    getData()
  },[]) 


  return (
    <div className={styles.container}>
      <div className={styles.addCategory}>
        <h3>اضافه کردن دسته بندی جدید</h3>
        <div className={styles.main}>
          <AddCategory
           addCatHandler = {addCatHandler} 
           addCategoryForm={addCategoryForm} setAddCategoryForm={setAddCategoryForm}
            layerNumber={0} handler={addLayerHandler} />
        </div> 

        { catLayers.map((_, index)=>(
          <div className={styles.layerContainer}> 
          <AddCategory addCatHandler ={addCatHandler} addCategoryForm={addCategoryForm} setAddCategoryForm={setAddCategoryForm}  layerNumber={index +1} handler={addLayerHandler} />
          <TbTrash className={styles.deleteLayout} onClick={()=>deleteLayerHandler(index)} />
          </div>
        ))}

        <button className={styles.submitButton} onClick={submitHandler}>
           بروز رسانی تغییرات 
          <MdAddTask />
        </button>
      </div>
      <Toaster />

    </div>
  );
}

export default AdminCategories;