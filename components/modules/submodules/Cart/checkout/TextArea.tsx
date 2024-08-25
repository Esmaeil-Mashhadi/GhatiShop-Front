import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import styles from './TextArea.module.css'

type TextAreaPropeType={
  title:string ,
  setEditing :Dispatch<SetStateAction<boolean>>
}

export function TextArea({title , setEditing}:TextAreaPropeType) {

  const changeHandler =(e:ChangeEvent<HTMLTextAreaElement>)=>{
    setEditing(true)
  }
  return (
    <div className={styles.txtContainer}>
        <label>{title} : </label>
        <textarea  onChange={changeHandler} placeholder={title == 'یادداشت' ? 'اگر یادداشتی برای سفارش خود دارید برای ما بنویسید' : ""} />
    </div>
  )
}

export function InputForm({title , setEditing}:TextAreaPropeType){

  const changeHandler =(e:ChangeEvent<HTMLInputElement>)=>{
    setEditing(true)
  }
  return (
    <div className={styles.inputContainer}>
        <div>
            <label>{title =='name' ? 'نام' : 'کد پستی'} : </label>
            <input onChange={changeHandler} />
        </div>
         <div>
            <label>{title =='name' ? 'نام خانوادگی' : 'پلاک'}  : </label>
            <input  onChange={changeHandler}/>
        </div>
    </div>

  )
}
