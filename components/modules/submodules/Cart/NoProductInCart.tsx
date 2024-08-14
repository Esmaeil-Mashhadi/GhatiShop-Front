import Link from 'next/link'
import React from 'react'

function NoProductInCart() {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
          <img className='max-w-sm md:max-w-md lg:max-w-lg'  src='/products/noProduct.png' /> 
          <p>سبد خریدت خالیه </p>
          <Link className=' text-2xl' href={'/shopList'}>بریم یه چیزی بخریم ؟ </Link>
    </div>
  )
}

export default NoProductInCart