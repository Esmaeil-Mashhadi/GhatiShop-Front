import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const checkUserAccessiblity = async(accessToken:RequestCookie|undefined)=>{
   const response = await fetch('http://localhost:5000/user/info' ,{
    method:"GET" ,
    headers:{'authorization':`bearer ${accessToken?.value}`},
   })
 
   const data = await response.json()
    return data.user
}