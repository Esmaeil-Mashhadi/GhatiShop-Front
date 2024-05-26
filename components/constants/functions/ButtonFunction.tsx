import { Dispatch, SetStateAction } from "react"

type FunType = Dispatch<SetStateAction<boolean>>

class ButtonClass { 
 enterHandler = (setEnter:FunType)=>{
    setEnter(true)
 }
 leaveHandler = (setEnter:FunType , setLeave:FunType)=>{
    setEnter(false)
    setLeave(true)
    setTimeout(() => {
            setEnter(false)
            setLeave(false)
    }, 300);
 }
}


const buttonFunction = new ButtonClass()

export default buttonFunction