import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Support from '@/components/layout/Support'
import React, { ReactNode } from 'react'

function layout({children}:{children:ReactNode}) {
  return (
    <div style={{margin:'0px 25px' , display:'flex', flexDirection:"column" , height:'100dvh'}}>
        <Header />
        <Support />
        <div style={{flex:1 , margin:'150px 0px'}}>
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default layout