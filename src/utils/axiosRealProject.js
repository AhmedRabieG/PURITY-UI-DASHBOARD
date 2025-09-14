import axios from "axios";
import { provide, ref } from "vue";
import { useAuthStore } from "../store/auth.js";
import { useRouter } from "vue-router";
const router = useRouter();
const isShowRequestLoding = ref(false);

// provide ("isShowRequestLoding", isShowRequestLoding);

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_APIEndPoint, 
    headers: {
        'Content-Type': 'application/json',
        'CLIENT-ID': import.meta.env.VITE_API_CLIENTID,
        'Client-Secret': import.meta.env.VITE_API_ClientSecret,
        'USER-TIMEZONE': Intl.DateTimeFormat().resolvedOptions().timeZone, // GET USER TIMEZONE
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        // console.log("axios Instance", axiosInstance.defaults),

        isShowRequestLoding.value = true;
        config.headers["lang"] = localStorage.lang || "ar";
        const token = authStore.user?.Token;
        if (token && !config.headers?.Authorization) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if(import.meta.env.VITE_API_IsOnPremise?.toLocaleLowerCase() == 'false') {
            const url = window.location.href?.replace(/^(.*:\/\/)?/, '').split('.');
            if(url.length)
                config.headers["Tenant"] = url[0];  // GET TENANT AND SET IN HEADER
        }
        isShowRequestLoding.value = false;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        isShowRequestLoding.value = false;
        return response;
    },
    async (error) => {
        // console.log("error.response.status", error.response);
        const authStore = useAuthStore();
        const user = authStore?.user;
        const { config: originalRequest, response } = error;
        const isRefreshOrVerify =
            originalRequest?.url?.includes("GetAccessTokenUsingRefreshToken") ||
            originalRequest?.url?.includes("Verify");

        // console.log("original Request", originalRequest);

        if (response?.status == 401 && isRefreshOrVerify) {
            authStore.updateUser(null);
            await router.push('/login');
            return Promise.reject(error);
        }
        if (response?.status == 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axiosInstance.post(
                    "Auth/GetAccessTokenUsingRefreshToken",
                    {
                        OldAccessToken: user?.Token,
                        RefreshToken: user?.RefreshToken,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${user?.Token}`,
                            "accept-language": localStorage.getItem("lang") || "ar",
                            "CLIENT-ID": import.meta.env.VITE_API_APP_CLIENTID,
                            "Client-Secret": import.meta.env.VITE_API_ClientSecret,
                        }
                    }
                )
                const newToken = response?.data?.Data?.Token;
                
                if (response.status === 200 && newToken) {
                    authStore.updateUser(response.data.Data);
                    // Update headers
                    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                    originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                    // Retry original request
                    return axiosInstance(originalRequest);
                } 
                else {
                    authStore.updateUser(null);
                    router.replace("/login");
                    return Promise.reject(error);
                }

            } 
            catch (refreshError) {
                authStore.updateUser(null);
                router.replace("/login");
                return Promise.reject(refreshError);
            }
        }

        isShowRequestLoding.value = false;
        return Promise.reject(error);
    }
);



export default axiosInstance;