import axios  from "axios";

const baseURL = 'https://jsonplaceholder.typicode.com'
// check token  
let authTokent = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;

// create axios instance
const axiosInstance = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${authTokent?.access}`,
    }
});



// add request interseptor
axiosInstance.interceptors.request.use( function(config) {
    // do some thing before request in send 
    return config
}), function ( error ) { 
    // do some this with request error 
    return Promise.reject(error)
};

// Add response interseptors
axiosInstance.interceptors.response.use( function(response) {
    // any status code that lie within the range of 2xx cause this function  ...
    // do some thing with with response data

    return response
}), function ( error ) {
    // any status code that falls outside the range of 2xx ... 
    // do some this with response error 
    return Promise.reject(error)
};


export default axiosInstance