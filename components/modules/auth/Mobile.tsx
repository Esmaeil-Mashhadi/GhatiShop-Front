import { Dispatch, SetStateAction } from 'react'
import styles from './Mobile.module.css'
import { NeutralButton } from '@/components/constants/buttons/Button'

type mobilePropType = {
    send:boolean , 
    setSend:Dispatch<SetStateAction<boolean>>
}

function Mobile({send , setSend}:mobilePropType) {

    const transferStyle:any = {
        '--transfer' : send ? 'translateX(-150%)':'translateX(0%)',
    }
  return (
    <div style={transferStyle} className={styles.mobileContainer}>
        <label> شماره موبایل خود را وارد کنید</label>
        <input type='text' />
        <NeutralButton text='ارسال کد' handler={()=>setSend(true)} />
    </div>
  )
}

export default Mobile