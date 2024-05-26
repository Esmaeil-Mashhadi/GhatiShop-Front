'use client'
import { useState } from 'react'
import styles from './Register.module.css'
import Mobile from '../modules/auth/Mobile'
import Code from '../modules/auth/Code'

function Register() {
    const [send , setSend] =useState(false)


  return (
    <div className={styles.container}>
        <div className={styles.formContainer}>
            <img  src='./registerBG.jpg'/>
            <div className={styles.inputContainer}>
                <p>سلام ! به قاطی شاپ خوش اومدی ! 🤗</p>
                        <Mobile send ={send} setSend={setSend} />
                        <Code send ={send} setSend={setSend}/> 
            </div>
        </div> 
    </div>
  )
}

export default Register