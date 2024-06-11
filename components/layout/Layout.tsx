import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from './Layout.module.css'
import { headers } from 'next/headers'


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