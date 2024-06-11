import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import React, { ReactNode } from 'react'

function layout({children}:{children:ReactNode}) {
  return (
    <>
        <Header />
        {children}
        <Footer/>
    </>
  )
}

export default layout