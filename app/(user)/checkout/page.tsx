import Checkout from '@/components/templates/Checkout'
import Register from '@/components/templates/Register';
import { checkUserAccessiblity } from '@/utils/authentication/checkUserAccessiblity';
import { cookies } from 'next/headers';
import React from 'react'

async function page() {
  const user = await checkUserAccessiblity(cookies().get('accessToken'))
  return (
    <Checkout user ={user} />
  )
}

export default page