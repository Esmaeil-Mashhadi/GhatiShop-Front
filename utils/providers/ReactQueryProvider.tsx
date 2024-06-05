'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import  {  ReactNode } from 'react'

type QueryPropeType ={
  children : ReactNode
}
function ReactQueryProvider({children}:QueryPropeType) {
  const client = new QueryClient()
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider