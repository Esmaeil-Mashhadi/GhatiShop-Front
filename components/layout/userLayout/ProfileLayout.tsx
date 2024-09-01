'use client'
import Link from 'next/link'
import styles from './ProfileLayout.module.css'
import { ReactNode, useState } from 'react'
import HamMenuButton from '@/components/constants/buttons/HamMenuButton'

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
        '--transfer': showMenu ? '0%' :'100%'
    }
    console.log(showMenu);
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
        <div className={styles.hamMenu}>
          <HamMenuButton setShowMenu={setShowMenu} showMenu={showMenu} />
        </div>

        <div className={styles.main}>
                {children}
        </div>


    </div>
  )
}

export default ProfileLayout