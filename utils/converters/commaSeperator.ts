export const commaSeperator = (num:number|string)=>{
   const formatter = new Intl.NumberFormat('fa-IR') 
   return formatter.format(Number(num))
}

