import axios  from "axios"
import { Navigate } from "react-router-dom"
const BASE_URL="https://staging-blockchain-payment.livaat.com/api"


const api = axios.create({
  baseURL:BASE_URL,
  headers:{
    "Content-Type": "application/json",
  }
})


export const setAuthToken = token =>{
  if(token){
    api.defaults.headers.common["Authorization"] = `${token}`
  }else { 
    delete  api.defaults.headers.common["Authorization"]
  }
}

api.interceptors.response.use(
  response => response ,
  error => {
    if(error.response.status === 401){
      setAuthToken(null)
    }
    return Promise.reject(error)
  }
)

export const makeRequest = async (method , path , payload = {}) => { 

  try{
    const response = await api.request(
      { url:path,
        method,
        data:payload }
    )
    return response.data
  }catch(error){
    console.error(error)
    throw error
  }
}


export default api