import ProfileOrderDetail from '@/components/modules/profile/ProfileOrderDetail'
import React from 'react'

function page({params}:any) {
  return (
    
    <ProfileOrderDetail params = {params.orderid} />
  )
}

export default page