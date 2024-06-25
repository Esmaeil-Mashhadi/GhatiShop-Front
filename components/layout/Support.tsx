'use client'
import styles from './Support.module.css'
import { MdChat } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";
import { GiTechnoHeart } from "react-icons/gi";
import { MdPhonelinkRing } from "react-icons/md";
import { useState } from 'react';


function Support() {
    const [isReset, setIsReset] = useState(false);
    const enterHandler = ()=>{
        setIsReset(!isReset)
    }

    const commonStyle:Record<string , string |undefined|number> = {
        transform: isReset ? 'translate(0, 0)' : undefined,
        opacity: isReset ? 1 : undefined,
        pointerEvents: isReset ? 'all':'none'
      };
  return (
    <div  className={styles.container}>
        <button onClick={enterHandler} className={styles.chatButton}><MdChat/></button>
        <div className={styles.optionContainer}>
            <button  style={commonStyle}>
                <GiTechnoHeart />
                 پشتیبان فنی سایت
            </button>

            <button  style={commonStyle}> 
            <MdSupportAgent />
            پشتیبان فروش
            </button>

            <button  style={commonStyle}>
                 <MdPhonelinkRing />
                 تماس با ما
            </button>
        </div>
        
    </div>
  )
}

export default Support