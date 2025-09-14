import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs'


const baseURL =  'https://reqres.in/'  //import.meta.env.VITE_API_APIEndPoint;
let authTokent = localStorage.getItem('token') ? localStorage.getItem('token') : null;

const axiosInstance = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${authTokent?.access}`
    }
});


axiosInstance.interceptors.request.use( async (config)=> { 
    console.log("axios Instance", axiosInstance.defaults)

    if(!config.headers.Authorization) {
        authTokent = localStorage.getItem('token') ? localStorage.getItem('token') : null;
        config.headers.Authorization = `Bearer ${authTokent?.access}`
    }
    console.log('authTokent', authTokent)
    // const user = jwtDecode(authTokent?.access);

    const user = jwtDecode(authTokent.access);
    console.log("user" ,user);
    
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log('is Expired', isExpired)
    if(!isExpired) return config
    
    const response  = await axiosInstance.post(
        `${baseURL}/api/auth/refresh-token`,
        {
            refresh_token: authTokent?.refresh
        }
    )
    localStorage.setItem('token', response.data);
    config.headers.Authorization = `Bearer ${response.data.access}`
    console.log('config', config)
    return config
})


export default axiosInstance