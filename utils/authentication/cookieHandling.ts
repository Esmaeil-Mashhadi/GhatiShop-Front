// import { api } from "@/configs/axios"

 const saveCookie = (accessToken:string , refreshToken?:string)=>{
    document.cookie = `accessToken=${accessToken};max-age=${60*60*24}`
    if(refreshToken){
       document.cookie = `refreshToken=${refreshToken}; SameSite=Lax; max-age=${60*60*24*90}`
    }
}

const getClientCookie = ()=>{
   const clientCookie:Record<string ,string> = {}
   if(typeof document !=='undefined'){
      document.cookie.split(";").forEach(item =>{
         const cookieSplit = item.split('=')
         clientCookie[cookieSplit[0].trim()] = cookieSplit[1]
      })
   }
      return clientCookie
}


// const getNewToken = async()=>{
//    const {refreshToken} = getClientCookie()
//    if(!refreshToken) return null
//   const res= await api.get('/auth/newToken' , {
//    headers:{'authorization':`bearer ${refreshToken}`}
//   })
//   console.log(res);
//    return res
// }



export {
   saveCookie , getClientCookie  
}