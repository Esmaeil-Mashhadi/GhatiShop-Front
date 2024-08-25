import ProfileLayout from '@/components/layout/userLayout/ProfileLayout'
import React, { ReactNode } from 'react'

type LayoutPropeType = {
    children:ReactNode
    params : {route:string}
}
function layout({children , params}:LayoutPropeType) {
  return (
    <div>
            <ProfileLayout route ={params.route}>
                 {children}
            </ProfileLayout>
    </div>
  )
}

export default layout