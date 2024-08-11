'use client'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import store from './store'

interface OrderReduxProviderPropType {
    children: ReactNode 
}
function OrderReduxProvider({children}:OrderReduxProviderPropType) {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default OrderReduxProvider