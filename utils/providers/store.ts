import { configureStore } from "@reduxjs/toolkit";
import { orderReducer } from "../hooks/CartReducer";

const store = configureStore({
    reducer:{
        cartReducer : orderReducer
    }
})


export default store