import Children from '@/components/layout/userLayout/Children'
import Footer from '@/components/layout/userLayout/Footer'
import Header from '@/components/layout/userLayout/Header'
import Support from '@/components/layout/userLayout/Support'
import React, { ReactNode } from 'react'

function layout({children}:{children:ReactNode}) {
  return (
    <>
        <Header />
        <Support />
        <Children children={children} />
        <Footer/>
    </>
  )
}

export default layout