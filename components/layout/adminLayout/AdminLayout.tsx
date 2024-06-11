import React, { ReactNode } from 'react'
import AdminSideBar from './AdminSideBar'
import styles from './AdminLayout.module.css'

type AdminLayoutPropType ={
  children : ReactNode
  slug:string 
}

function AdminLayout({children , slug }:AdminLayoutPropType) {
  return (
    <div className={styles.container}>
      <AdminSideBar slug ={slug} />
      {children}
    </div>
  )
}

export default AdminLayout