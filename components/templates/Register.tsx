'use client'
import { useState } from 'react'
import styles from './Register.module.css'
import Mobile from '../modules/auth/Mobile'
import Code from '../modules/auth/Code'
import Notification from '../constants/Notif&Loader/Notification'
import { NotifObjectType } from '../modules/auth/types/auth'

function Register() {
    const [send , setSend] =useState(false)
    const [notifObject , setNotifObject] = useState<NotifObjectType>({
      type:'error', 
      message:"", 
      triggered: false
    })
    const [mobile , setMobile] = useState("")

    

  return (
    <div className={styles.container}>
        <div className={styles.formContainer}>
            <img  src='./homePage/registerBG.jpg'/>
            <div className={styles.inputContainer}>
                <p>سلام ! به قاطی شاپ خوش اومدی ! 🤗</p>
                        <Mobile 
                        setNotifObject ={setNotifObject} 
                        notifObject ={notifObject} 
                        send ={send} 
                        setSend={setSend}
                        setMobile ={setMobile}
                        mobile = {mobile}
                        />
                        <Code 
                        send ={send} 
                        setSend={setSend}
                        mobile = {mobile}
                        setNotifObject ={setNotifObject} 
                        notifObject ={notifObject} 
                        /> 
            </div>
        </div> 
        <Notification  type={notifObject.type} triggered ={notifObject.triggered} message={notifObject.message} />
    </div>
  )
}

export default Register