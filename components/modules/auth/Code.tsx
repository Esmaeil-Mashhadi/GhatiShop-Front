import { Dispatch, SetStateAction, useState } from 'react'
import styles from './Code.module.css'
import { useRouter } from 'next/navigation'
import { CancelButton, SubmitButton } from '@/components/constants/buttons/Button'

type MobilePropType = {
    send:boolean , 
    setSend:Dispatch<SetStateAction<boolean>>
}


function Code({send , setSend}:MobilePropType) {

    const [confirm , setConfirm] = useState(false)

    const transferStyle:Record<string, string> = {
        '--transfer' : send ? 'translateX(0%)':'translateX(200%)',
    }
    const confirmStyle:Record<string, string> ={
        '--transfer': confirm ? 'translateX(0%)':'translateX(200%)'
    }
    const notConfirmStyle:Record<string, string> ={
        '--transfer': confirm ? 'translateX(-200%)':'translateX(0%)'
    }

    const cancelHandler = ()=>{
        setSend(false)
        setConfirm(false)
    }

    const router = useRouter()
  return (
    <div style={transferStyle}  className={styles.container}>
           
            <div style={notConfirmStyle} className={styles.codeContainer}>
                <div className={styles.inputContainer}>
                    <label>کد ارسال شده را وارد کنید</label>
                    <input type='text' />
                </div>
              <div className={styles.buttonContainer}>
                <SubmitButton text='تایید'  handler={()=>setConfirm(true)}/>
                <CancelButton text='بازگشت' handler={()=>setSend(false)} />
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
                    <input type='text' />
                </div>
                <div>
                    <label>نام خانوادگی: </label>
                    <input type='text' />
                </div>
            </div>
            
                    <SubmitButton  text='ثبت نام' handler={()=>router.push('/')}/>
          </div>
          
        
    </div>
  )
}

export default Code