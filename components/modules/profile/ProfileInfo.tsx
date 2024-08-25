'use client'
import { numberToPersian } from '@/utils/converters/converToPersianNum';
import styles from './ProfileInfo.module.css'
import { FaUserCircle } from "react-icons/fa";
import { InputForm, TextArea } from '../submodules/Cart/checkout/TextArea';
import StatesForm from '../submodules/Cart/checkout/StatesForm';
import { ChangeEvent, useEffect, useState } from 'react';
import SolidButton from '@/components/constants/buttons/SolidButton';




function ProfileInfo() {
  const [submitChanges,  setSubmitChanges] = useState(false)
  const [editing , setEditing] = useState(false)

  const [values , setValues] = useState({
    name:"اسماعیل"  , 
    last_name:"مشهدی" , 
    phone:"09136038055" , 
    postalCode:"6037701516753495" , 
    plak:"70" , 
    fullAddress:"قهدریجان خیابان مدرس کوچه نامجو" , 
    city:"فلاورجان" , 
    state:"اصفهان" 
  })
  const changeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const {value  , name } = e.target 
    console.log(name);
    setValues({...values, [name]:value })
    setEditing(true)
  }

  const style:Record<string , string|number>= {
    '--height': editing ? '50px': "0",
    '--opacity':editing ? '1' : '0'
  }

  return (
    <div className={styles.container}>
        <div className={styles.profileLogo}>
            <FaUserCircle className=' w-12 h-12' /> 
            <div className={styles.scorePart}>
               <p>امتیاز کاربر </p>
               <p>{numberToPersian(42)}</p>
               </div>
        </div>
        <div className={styles.info}>
            <div>
              <label>نام  </label>
              <input name='name' onChange={changeHandler}  value={values.name} />
            </div>
            <div>
              <label>نام خانوادگی  </label>
              <input name='last_name'  onChange={changeHandler} value={values.last_name} />
            </div>
            <div>
              <label>تلفن همراه  </label>
              <input  name='phone' onChange={changeHandler} value={numberToPersian(values.phone)}/>
            </div>

        </div>
        <div className={styles.address}>
              <StatesForm  setEditing={setEditing}/>
              <InputForm   setEditing={setEditing} title="postal" />
              <TextArea setEditing={setEditing} title='آدرس کامل' />
        </div>
        <div  style ={style}className={styles.submitButton}>
          <SolidButton  text='بروز رسانی تغییرات'/>
        </div>
    </div>
  )
}

export default ProfileInfo