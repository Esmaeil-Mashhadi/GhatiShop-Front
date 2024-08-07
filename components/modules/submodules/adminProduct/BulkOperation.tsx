import {  ChangeEvent, Dispatch, SetStateAction } from 'react'
import styles from './BulkOperation.module.css'
import { MdOutlineEditNote } from "react-icons/md";


type BulkOperationtype ={
  handlebulkSelect : (e: ChangeEvent<HTMLInputElement>) => void
  bulkEdit :boolean , 
  setBulkEdit: Dispatch<SetStateAction<boolean>>, 
  selectedProducts: string[]
}

function BulkOperation({handlebulkSelect  , bulkEdit , setBulkEdit , selectedProducts }:BulkOperationtype) {

  const handleBulkEdit = ()=>{
    setBulkEdit(!bulkEdit)
  }

  const isMultiple = selectedProducts.length>1

  return (
    <div className={styles.container}>

      <div className={styles.chooseContainer}>
           <div className={styles.selectContainer}>
                   <label htmlFor={`checkWhole`} className={styles.checkProduct}>
                    <p >انتخاب دسته جمعی</p>
                    <input onChange={handlebulkSelect} name='blukSelect' type='checkBox' id={`checkWhole`} />       
                 </label>
         </div>

         <button disabled ={!isMultiple} style={isMultiple ? {opacity:1} :{opacity:.5}}  onClick={handleBulkEdit} className={styles.bulkButtons}>
           <MdOutlineEditNote />
            ویرایش دسته جمعی 
         </button>

      </div>
 </div>

  )
}

export default BulkOperation