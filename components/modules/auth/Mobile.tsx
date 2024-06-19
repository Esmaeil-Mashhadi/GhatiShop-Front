import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from './Mobile.module.css'
import { NeutralButton } from '@/components/constants/buttons/Button'
import { mobileValidation } from '@/validation/mobileValidation'
import { api } from '@/configs/axios'
import { NotifObjectType } from './types/auth'
import LoadingButton from '@/components/constants/Notif&Loader/LoadingButton'

type mobilePropType = {
    send:boolean , 
    notifObject:NotifObjectType 
    mobile:string ,
    setMobile : Dispatch<SetStateAction<string>>
    setNotifObject:Dispatch<SetStateAction<NotifObjectType>>
    setSend:Dispatch<SetStateAction<boolean>>
}


function Mobile({send , setSend , notifObject , setNotifObject , mobile , setMobile}:mobilePropType) {

  const [error , setError] = useState<{error:string}|null>({error:'empty'})
  const [isLoading , setIsloading] = useState(false)

    const transferStyle:Record<string , string | number> = {
        '--transfer' : send ? 'translateX(-150%)':'translateX(0%)',
    }

    const sendHandler = async()=>{
      setIsloading(true)
      try {
        const result = await api.post('/auth/register' , {mobile})
         setNotifObject({
          type:"success",
          message:result.data.data.message ,
          triggered:!notifObject.triggered
         })
         setIsloading(false)
         setSend(true)
      } catch (error:any) {
        setNotifObject({
          type:"error",
          message:error?.response?.data?.data.message || 'مشکلی پیش آمده لطفا بعدا تلاش نمایید',
          triggered:!notifObject.triggered
         })
         setIsloading(false)
      }
      
    }
    const changeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
      setMobile(e.target.value)
    }
    
    useEffect(()=>{
     const result =  mobileValidation(mobile)
      setError(result)
    },[mobile])

  return (
    <div style={transferStyle} className={styles.mobileContainer}>
        <label> شماره موبایل خود را وارد کنید</label>
        <input type='text' value={mobile} onChange={changeHandler} placeholder='مثال 09136038055' />
            {isLoading ? <LoadingButton /> : 
                <NeutralButton disabled={!!error} text='ارسال کد' handler={sendHandler} />
            }
    </div>
  )
}

export default Mobile