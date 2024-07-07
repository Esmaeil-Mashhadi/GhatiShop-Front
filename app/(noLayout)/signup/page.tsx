import Register from '@/components/templates/Register'
import { checkUserAccessiblity } from '@/utils/authentication/checkUserAccessiblity'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

async function page() {
  const user = await checkUserAccessiblity(cookies().get('accessToken'))
  if(user) redirect('/')
  return (
      <Register />
  )
}

export default page 