import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartProductType{
    title:string 
    price:string |number 
    specialPrice?:string |number 
    mainImage:string 
    quantity: number 
    _id:string  
}

export interface OrderType {
 ordered:CartProductType[]
 totalOrder:number 
 totalPrice:number
}


const initialState:OrderType = {
    ordered:[],
    totalOrder:0 ,
    totalPrice:0
}


const sum = (orders:CartProductType[])=>{
    const totalOrder =  orders.reduce((acc:number, curr:CartProductType)=>{
        return acc+= curr.quantity 
    },0)

    const totalPrice =  orders.reduce((acc:number , curr:CartProductType)=>{
        const finalPrice = (curr.specialPrice ? Number(curr.specialPrice) : Number(curr.price) )*curr.quantity

        return acc+= finalPrice
    },0)

    return {totalOrder , totalPrice}
}


const orderSlice = createSlice({
    name: "productCart",
    initialState,
    reducers: {
      add: (state: OrderType, action: PayloadAction<Omit<CartProductType , 'quantity'>>) => {
        const sameIndex = state.ordered.findIndex(item => item._id === action.payload._id);
  
        if (sameIndex === -1) {
          state.ordered.push({...action.payload , quantity:1});
        } else {
          state.ordered[sameIndex].quantity += 1;
        }
  
        const { totalOrder, totalPrice } = sum(state.ordered);
        state.totalOrder = totalOrder;
        state.totalPrice = totalPrice;
      },
      dec: (state:OrderType , action:PayloadAction<Omit<CartProductType , 'quantity'>>)=>{
         const index = state.ordered.findIndex(item => item._id == action.payload._id)
         if(index != -1){
            if(state.ordered[index].quantity == 1){
                state.ordered.splice(index , 1)
            }else{
                state.ordered[index].quantity -=1
            }
            const {totalOrder , totalPrice} = sum(state.ordered)
            state.totalOrder = totalOrder 
            state.totalPrice = totalPrice
         }

      }
    }
  });

export const orderReducer =  orderSlice.reducer
export const{add , dec} = orderSlice.actions