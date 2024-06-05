import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from './Layout.module.css'


type LayoutPropType = {
    children: ReactNode
}

async function Layout({children}:LayoutPropType) {


  return (
    <div className={styles.container}>
    <Header/>
            <div className={styles.children}>
                {children}
            </div>
    <Footer />
    </div>
  )
}

export default Layout