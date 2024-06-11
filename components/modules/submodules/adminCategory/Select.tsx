import { ChangeEvent, useState } from 'react'
import styles from './Select.module.css'

function Select() {
  const [selectOption , setSelectOption] = useState('')
  const parnets = ['انتخاب دسته ی والد','this' ,'that' , 'another']
  const changeHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
    setSelectOption(e.target.value)
  }
  return (
    <div className={styles.container}>
         <select value={selectOption} onChange={changeHandler} >
              {parnets.map((item , index)=>(
                <option value ={index == 0 ?'' :undefined} key={index}>
                  {item}
                </option>
              ))}
         </select>
    </div>
  )
}

export default Select