import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from './DropDown.module.css'
import { FaAngleDown } from 'react-icons/fa6'

interface DropDownPropType{
    data:StatesType[] 
    setOption:Dispatch<SetStateAction<string>>
    option:string , 
    title:string 
    setEditing?: Dispatch<SetStateAction<boolean>>
}

interface StatesType{
    id: number
    latitude: string
    longitude: string
    name: string
    center:string 

}
function DropDown({data , setOption , option , title , setEditing}:DropDownPropType) {

    const [isDroped , setIsDroped] =useState(false)
    const [citySearch , setCitySearch] = useState(undefined)
    // const [newData , setNewData] = useState<object[]|undefined>(undefined)

    const style:Record<string , string>= {
        '--opacity': isDroped? '1' :'0',
        '--pointerEvent':isDroped?'all':'none',
        '--transfer' : isDroped?"0px" :"-10px"
    }
 
    const selectStateHandler = (name:string)=>{
        console.log(setEditing);
        setOption(name)
        setIsDroped(false)
        if(setEditing){
            setEditing(true)
        }
    }

    const dropHandler = ()=>{
        setIsDroped(!isDroped)
    }

    useEffect(()=>{
        window.addEventListener('click' , (e)=>{
            const target = e.target as HTMLElement
            if(!target.closest(`.${styles.selectContainer}`)){
                setIsDroped(false)
            }
        })
    },[])

    // const changeHandler =(e:any)=>{
    //     const {value} = e.target
    //     setCitySearch(value)
    //     const regexCity = new RegExp(value)
    //     const newData = data.filter((cityObject:any) => regexCity.test(cityObject.name))
    //     console.log(newData);

    //     // setNewData(newData)
    // }

  return (
    <div className={styles.container}>
    <label>{title} : </label>
    <div className={styles.selectContainer}>
        <button onClick={dropHandler} className={styles.select}>{option} <FaAngleDown /></button>
        {/* <input value={option} onClick={dropHandler}  className={styles.select}  /> */}
        <div style={style} className={styles.options}>
                {data?.map((stateObject:StatesType , index:number )=>(
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