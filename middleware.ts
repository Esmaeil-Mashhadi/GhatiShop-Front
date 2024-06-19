import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { checkUserAccessiblity } from "./utils/authentication/checkUserAccessiblity";

export  async function middleware(req:NextRequest){
    console.log('middleware');
        let response = NextResponse.next()
        const user = await checkUserAccessiblity(cookies().get('accessToken'))
        if(!user) {
            const newTryResponse = await fetch('http://localhost:5000/auth/newToken', {
                method:"GET" , 
                headers:{'authorization':`bearer ${cookies().get('refreshToken')?.value}`}
            })
            const result = await newTryResponse.json()
            if(result.data.accessToken){
                const url = `${req.nextUrl.origin}${req.nextUrl.pathname}`
                response = NextResponse.redirect(url)
                
                response.cookies.set('accessToken' , result.data.accessToken , {maxAge:60*60*24 , sameSite:'lax'})
            }
        }
         return response
        
    
}

export const config = {
    matcher: ['/' , '/signup , /admin']
}