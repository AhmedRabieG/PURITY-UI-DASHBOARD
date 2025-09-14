import axios from 'axios'
import { config } from 'node:process'
import { useRouter } from 'vue-router'

const basicAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_APIEndPoint,
    // timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
})
basicAxiosInstance.interceptors.request.use(
    (config)=> {
        console.log('config', config)
        config.headers['lang'] = localStorage.lang || 'ar'
        config.metaData = {
            startTime: new Date()
        }
        document.body.classList.add('loading')
        return config
    }
), (error) => {
    document.body.classList.remove('loading')
    console.log('error', error);
    return Promise.reject(error)
}

basicAxiosInstance.interceptors.response.use(
    (response) => {
        const endTime = new Date()
        const duration = endTime - response.config.metadata.startTime
        console.log('duration', duration)
        document.body.classList.remove('loading')
        return response
    }, (error) => {
        document.body.classList.remove('loading')
        console.log('error', error);
        return Promise.reject(error)
    }
)





export default basicAxiosInstance