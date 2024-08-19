import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from './DropDown.module.css'
import { FaAngleDown } from 'react-icons/fa6'

interface DropDownPropType{
    data:Object[] 
    setOption:Dispatch<SetStateAction<string>>
    option:string , 
    title:string 
}

function DropDown({data , setOption , option , title}:DropDownPropType) {

    const [isDroped , setIsDroped] =useState(false)

    const style:Record<string , string>= {
        '--opacity': isDroped? '1' :'0',
        '--pointerEvent':isDroped?'all':'none',
        '--transfer' : isDroped?"0px" :"-10px"
    }
 
    const selectStateHandler = (name:string)=>{
        setOption(name)
        setIsDroped(false)
    }

    const dropHandler = ()=>{
        setIsDroped(!isDroped)
    }

    useEffect(()=>{
        window.addEventListener('click' , (e:any)=>{
            if(!e.target.closest(`.${styles.selectContainer}`)){
                setIsDroped(false)
            }
        })

        if(isDroped){
            window.addEventListener('keypress' , (e:KeyboardEvent)=>{
                console.log(e.key);
            })
        }
    },[])
    
  return (
    <div className={styles.container}>
    <label>{title} : </label>
    <div className={styles.selectContainer}>
        <button onClick={dropHandler} className={styles.select}>{option} <FaAngleDown /></button>
        <div style={style} className={styles.options}>
                {data?.map((stateObject:any , index:number )=>(
                        <span style={stateObject.name === option ? {background:"rgb(192, 195, 251 ,.5)" , color:'black'}: undefined} 
                        onClick={()=>selectStateHandler(stateObject.name)}>
                        {stateObject.name}
                        </span>
                ))}
        </div>
    </div>
</div>
  )
}

export default DropDown