import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import styles from './Code.module.css'
import { useRouter } from 'next/navigation'
import { CancelButton, SubmitButton } from '@/components/constants/buttons/Button'
import { api } from '@/configs/axios'
import { NotifObjectType } from './types/auth'
import { saveCookie } from '@/utils/authentication/cookieHandling'
import LoadingButton from '@/components/constants/Notif&Loader/LoadingButton'

type MobilePropType = {
    send:boolean , 
    notifObject:NotifObjectType 
    mobile:string ,
    setNotifObject:Dispatch<SetStateAction<NotifObjectType>>
    setSend:Dispatch<SetStateAction<boolean>>
}


function Code({send , setSend , mobile , notifObject , setNotifObject }:MobilePropType) {

    const [confirm , setConfirm] = useState(false)
    const [code , setCode] = useState("")
    const [info , setInfo] = useState({
        name:"", 
        lastName:""
    })
    const [isLoading ,setIsLoading] = useState(false)
    
    const transferStyle:Record<string, string> = {
        '--transfer' : send ? 'translateX(0%)':'translateX(200%)',
    }
    const confirmStyle:Record<string, string> ={
        '--transfer': confirm ? 'translateX(0%)':'translateX(200%)'
    }
    const notConfirmStyle:Record<string, string> ={
        '--transfer': confirm ? 'translateX(-200%)':'translateX(0%)'
    }


    const router = useRouter()
    const confirmCodeHandler = async()=>{
        setIsLoading(true)
        try {
            
            const result = await api.post('/auth/code' , {
                code , 
                mobile
            })
            if(result.data.status == 201){
                setConfirm(true)
            }else {
                setNotifObject({
                    type: "success" , 
                    triggered:!notifObject.triggered ,
                    message:"خوش آمدید"
                })
                const{token , refreshToken} = result.data.data
                saveCookie(token , refreshToken)
                setIsLoading(false)
                router.refresh()
                setTimeout(() => {
                    router.push('/')
                }, 1000);
            }
        } catch (error:any) {
            console.log(error);
            setNotifObject({
                type:'error', 
                triggered:!notifObject.triggered,
                message:error.response.data.data.message
            })
            setIsLoading(false)
        }
   
    }
    const registerHandler = async()=>{
        setIsLoading(true)
        try {
            const result = await api.post('/auth/update', {
               mobile , name:info.name  , lastName:info.lastName
            })
            const{token , refreshToken} = result.data.data
            saveCookie(token , refreshToken)
            if(result.data.status == 200){
                setNotifObject({
                    type:'success' ,
                    message:"ثبت نام با موفقیت انجام شد",
                    triggered : !notifObject.triggered
                })
                setIsLoading(false)
                router.refresh()

                setTimeout(() => {
                    router.push('/')
                }, 1000);
            }
        } catch (error:any) { 
            console.log(error);
            setNotifObject({
                type:'error',
                message:'مشکلی پیش آمد لطفا بعد تلاش کنید',
                triggered:!notifObject.triggered
            })
            setIsLoading(false)
        }
    }


    const changeNameHandler =(e:ChangeEvent<HTMLInputElement>)=>{
         const name = e.target.name 
         const  value = e.target.value
         setInfo({
            ...info , [name] : value
         })
    }

    const codeChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        const nubmerRegex = new RegExp(/^\d+$/g) 
        const trimValue = e.target.value.trim()
        if(trimValue == '') setCode('')
        if(!nubmerRegex.test(trimValue) ) return  
        setCode(e.target.value)
    }
  return (
    <div style={transferStyle}  className={styles.container}>
           
            <div style={notConfirmStyle} className={styles.codeContainer}>
                <div className={styles.inputContainer}>
                        <p>کد ارسال شده به <span>09136038055</span> را وارد کنید </p>
                    <input value={code}  onChange={codeChangeHandler} />
                </div>
              <div className={styles.buttonContainer}>
                {isLoading ? <LoadingButton /> : 
                    <SubmitButton text='تایید'  handler={confirmCodeHandler}/>
                }
                <CancelButton text='بازگشت' handler={()=>{
                    setCode("")
                    setSend(false)
                }} />
             </div>
            </div>

          <div style={confirmStyle} className={styles.finalForm}>
            <div className={styles.info}>
                <div>
                    <label>تلفن تماس :</label>
                    <span>09136038055</span>
                </div>
                <div>
                    <label>نام :</label>
                    <input type='text' name='name' value={info.name} onChange={changeNameHandler} />
                </div>
                <div>
                    <label>نام خانوادگی: </label>
                    <input type='text' name='lastName' value={info.lastName}  onChange={changeNameHandler}/>
                </div>
            </div>
            
                    <SubmitButton  text='ثبت نام' handler={registerHandler}/>
          </div>
          
        
    </div>
  )
}

export default Code