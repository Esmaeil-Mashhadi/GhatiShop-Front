import ProductDetail from '@/components/templates/ProductDetail'
import React from 'react'
type DetailPagePropType ={
  params : {
    id: string
  }
}
function page({params}:DetailPagePropType) {
  return (
    <ProductDetail productID = {params.id} />      
  )
}

export default page