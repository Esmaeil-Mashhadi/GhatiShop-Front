import AdminLayout from '@/components/layout/adminLayout/AdminLayout'
import React, { ReactNode } from 'react'

type LayoutTypeProps ={
  children :ReactNode,
  params:{slug:string}
}

function layout({children , params}:LayoutTypeProps) {
  return (
        <AdminLayout children= {children}  slug = {params.slug}/>
  ) 
}

export default layout