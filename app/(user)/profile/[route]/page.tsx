import ProfileBookmarks from '@/components/modules/profile/ProfileBookmarks'
import ProfileComments from '@/components/modules/profile/ProfileComments'
import ProfileInfo from '@/components/modules/profile/ProfileInfo'
import ProfileOrders from '@/components/modules/profile/ProfileOrders'
import ProfileRoute from '@/components/templates/ProfileRoute'
import React from 'react'

type ProfileRouteParams ={
    params:{route:string }
}

function page({params}:ProfileRouteParams) {


const renderCompoent = ()=>{
    switch (params.route) {
        case 'info':
           return <ProfileInfo />
        case "orders":
            return <ProfileOrders />
        case 'bookmarks':
            return <ProfileBookmarks />
        case 'comments': 
            return <ProfileComments />
        default:
            return <ProfileInfo />
    }

}
  return (
        <ProfileRoute renderCompoent = {renderCompoent} />
  )
}

export default page