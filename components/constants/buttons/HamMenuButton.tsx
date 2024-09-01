'use client'

import styles from './HamMenuButton.module.css'
import { Dispatch, SetStateAction } from 'react'


interface HameMenuType {
  showMenu:boolean, 
  setShowMenu:Dispatch<SetStateAction<boolean>>
}
function HamMenuButton({setShowMenu , showMenu }:HameMenuType) {

  const hamStyle: Record<string, string | undefined|number> = {
    '--transformFirst': showMenu ? 'rotate(45deg)' : undefined,
    '--transformLast': showMenu ? 'rotate(-45deg)' : undefined,
    '--transformCenter': showMenu ? 'translateX(50%)' : 'translateX(0)',
    '--centerOpacity': showMenu ? '0' : '1'
};
  return (
          <div onClick={() => setShowMenu(!showMenu)} style={hamStyle} className={styles.container}>
                <span></span>
                <span></span>
                <span></span>
          </div>
  )
}

export default HamMenuButton