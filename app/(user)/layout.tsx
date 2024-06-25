import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Support from '@/components/layout/Support'
import React, { ReactNode } from 'react'

function layout({children}:{children:ReactNode}) {
  return (
    <>
        <Header />
        <Support />
        {children}
        <Footer/>
    </>
  )
}

export default layout