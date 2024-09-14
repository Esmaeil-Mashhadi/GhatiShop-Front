'use client'
import Link from 'next/link'
import styles from './ProfileLayout.module.css'
import { ReactNode, useState } from 'react'
import { AiFillRightCircle } from "react-icons/ai";


interface ProfileLayoutPropType {
    children:ReactNode , 
    route:string 
}

function ProfileLayout({children , route}:ProfileLayoutPropType) {
    const links = {
        'اطلاعات کاربری':'info',
        'سفارشات':'orders', 
        'علاقه مندی ها':'favorites',
        'نظرات':'comments',
        'قوانین امتیاز ':'score'
    }

    const [showMenu , setShowMenu] = useState(false)

    const showUpStype:Record<string ,number|string |undefined>={
        '--transfer': showMenu ? '0%' :'150%',
        '--rotate' : showMenu ? '180deg' : '0deg'
    }
  return (
    <div className={styles.container}>
        <div className={styles.linkContainer}>
            {Object.entries(links).map(([name, link ] , index)=>(
                <Link style={route==link ? {background:'rgb(192, 195, 251)' , color:'black'}: undefined} key={index} href={`/profile/${link}`}>
                    {name}
                </Link>
            ))}
        </div>
        <div style={showUpStype} className={styles.mobileLinkContainer}>
            {Object.entries(links).map(([name, link ] , index)=>(
                <Link style={route==link ? {background:'rgb(192, 195, 251)' , color:'black'}: undefined} key={index} href={`/profile/${link}`}>
                    {name}
                </Link>
            ))}
        </div>
        <div onClick={()=>setShowMenu(!showMenu)}  style={showUpStype} className={styles.arrow}>
            <label htmlFor='text'>
                <AiFillRightCircle /> 
            </label>
            <p id='text'>
            {showMenu ?  "بستن منو":'باز کردن منو' }
            </p>

        </div>

        <div className={styles.main}>
                {children}
        </div>


    </div>
  )
}

export default ProfileLayout