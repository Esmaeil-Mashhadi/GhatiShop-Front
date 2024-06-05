import { getNewToken, saveCookie } from "@/utils/authentication/cookieHandling";
import axios, { AxiosError, AxiosResponse } from "axios";

export const api = axios.create({
    baseURL:'http://localhost:5000',
    headers:{'Content-Type' :'application/json'}
})

api.interceptors.response.use((res:AxiosResponse)=>{
    return res
}, async(err:AxiosError)=>{
    const originalRequest = err.config as {_retry?:boolean}
    if(err?.response?.status == 401 && !originalRequest._retry){
        originalRequest._retry = true
        const res = await getNewToken()
        if(!res) return Promise.reject(err)
        saveCookie(res.data.data.accessToken)
    }else{
        return Promise.reject(err)
    } 
})
 
