import React, { ReactNode } from 'react'
import styles from './Layout.module.css'


type LayoutPropType = {
    children: ReactNode
}

async function Layout( {children}:LayoutPropType) {

  return (
    <div className={styles.container}>
                {children}
                
    </div>
  )
}

export default Layout