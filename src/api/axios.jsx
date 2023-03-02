import axios  from "axios";
const BASE_URL='https://staging-blockchain-payment.livaat.com/api'


const axiosInstance = axios.create({
    baseURL:BASE_URL,
    headers:{
        'Content-Type': 'application/json',
    }
})


export const setAuthToken = token =>{
    if(token){
        axiosInstance.defaults.headers.common['Authorization'] = `${token}`
    }else { 
        delete  axiosInstance.defaults.headers.common['Authorization']
    }
}

axiosInstance.interceptors.response.use(
    response => response ,
    error => {
        if(error.response.status === 401){
            setAuthToken(null)

        }
        return Promise.reject(error)
    }
)

export default axiosInstance