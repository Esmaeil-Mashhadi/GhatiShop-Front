export const numberToPersian = (num:string | number = 0)=>{
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g , (x:string)=> {
     return farsiDigits[parseInt(x)]
    })
}