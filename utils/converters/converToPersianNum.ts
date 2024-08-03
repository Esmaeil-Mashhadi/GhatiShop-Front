export const numberToPerisna = (num:string)=>{
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g , (x:string)=> {
     return farsiDigits[parseInt(x)]
    })
}