import { ChangeEvent, useContext, useState } from 'react';
import styles from './ListInfo.module.css'
import { FaTrashArrowUp } from "react-icons/fa6";
import { AdminProductContext } from '../../admin/Product';

function ListInfo() {
    const contextData = useContext(AdminProductContext)

    const addHandler = ()=>{
      if(contextData){
        const features =[...contextData?.productData.features]
        features.push({name:"" , description:""})
        contextData.setProductData({...contextData.productData ,features })
      }
      
  
    }

    const removeHandler = (index: number) => {
      if(contextData){
        const features =[...contextData?.productData.features]
        features.splice(index , 1)
        contextData.setProductData({...contextData.productData ,features })
      }
    };

    const changeHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
      if (contextData) {
        const {name ,value} = e.target
        const features = [...contextData?.productData.features];
        features[index] = { ...features[index], [name]: value };
        contextData.setProductData({ ...contextData.productData, features });
      }
    };


  return (
    <div className={styles.container}>

     <button style={contextData?.productData?.features.length == 10 ? {cursor:"not-allowed"}:undefined} onClick={addHandler}
      className={styles.addMore}>
         {contextData && contextData?.productData?.features.length < 10 ? "+ اضافه کردن مشخصات": 'حداکثر ده مشخصات می توان وارد کرد'}
      </button>    

     {contextData?.productData?.features.map((item, index)=> (
      <div className={styles.listContainer} key={index}>
            <input value={item.name} onChange={(e)=>changeHandler(e, index)} name='name' placeholder='اسم مشخصات' />
            <input value={item.description} onChange={(e)=>changeHandler(e, index)} name='description' placeholder='توضیحات مربوطه' />
            <button onClick={()=>removeHandler(index)} className={styles.trashButton}><FaTrashArrowUp /></button>
        </div>
     ))}     
    </div>
  )
}

export default ListInfo