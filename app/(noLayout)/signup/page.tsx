import Register from '@/components/templates/Register'
import { checkUserAccessiblity } from '@/utils/authentication/checkUserAccessiblity'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

type SignupPropType ={
  searchParams: {referer: string }
}

async function page({searchParams}:SignupPropType) {
  const user = await checkUserAccessiblity(cookies().get('accessToken'))
  console.log(searchParams);
  if(searchParams.referer == 'checkout' && user){
    redirect('/checkout')
  }else if(user){
    redirect('/')
  }
  
  return (
      <Register />
  )
}

export default page 