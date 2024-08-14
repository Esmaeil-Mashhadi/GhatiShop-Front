import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const checkUserAccessiblity = async(accessToken:RequestCookie|undefined)=>{
    if(accessToken){
        const response = await fetch('http://localhost:5000/user/info' ,{
         method:"GET" ,
         headers:{'authorization':`bearer ${accessToken?.value}` },
        })
      
        const data = await response.json()
         return data.user
    }else{
        return null
    }
}