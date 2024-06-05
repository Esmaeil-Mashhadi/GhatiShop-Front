export const mobileValidation = (mobile:string)=>{
   const mobileRegex = /^(\+98|0)?9\d{9}$/
   if(!mobileRegex.test(mobile)){
    return {error:'شماره ی موبایل معتبر نیست'}
   }else{
    return null
   }
}