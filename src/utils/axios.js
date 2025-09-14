import axios from "axios";
import { useAuthStore } from "../store/auth.js";
import router from "../router/index.js";

axios.defaults.baseURL = import.meta.env.VITE_API_APIEndPoint;
axios.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (!config.headers?.Authorization) {
      config.headers = {
        Authorization: "Bearer " + authStore.user?.Token,
        "CLIENT-ID": import.meta.env.VITE_API_CLIENTID,
        "Client-Secret": import.meta.env.VITE_API_ClientSecret,
        "USER-TIMEZONE": Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
    }
    config.headers["lang"] = localStorage.lang || "ar";
    if(import.meta.env.VITE_API_IsOnPremise?.toLocaleLowerCase() == 'false') {
      const url = window.location.href?.replace(/^(.*:\/\/)?/, '').split('.');
      if(url.length)
        config.headers["Tenant"] = url[0];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function  (error) {
    const authStore = useAuthStore();
    let user = authStore.user; // JSON.parse(localStorage.getItem('user'));
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      (originalRequest.url.indexOf("GetAccessTokenUsingRefreshToken") > -1 ||
        originalRequest.url.indexOf("Verify") > -1)
    ) {
      return Promise.reject(error);
    }
    if (error.response.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      let headers = {
        headers: {
          Authorization: "Bearer " + user?.Token,
          "accept-language": localStorage.lang,
          "CLIENT-ID": import.meta.env.VITE_API_APP_CLIENTID,
          "Client-Secret": import.meta.env.VITE_API_ClientSecret,
        },
      };
      return axios
        .post(
          "Auth/GetAccessTokenUsingRefreshToken",
          {
            OldAccessToken: user?.Token,
            RefreshToken: user?.RefreshToken,
          },
          headers
        )
        .then((res) => {
          if (res.status === 200 && res.data?.Data) {
            authStore.updateUser(res.data?.Data);
            originalRequest.headers.Authorization =
              "Bearer " + res.data.Data.Token;
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + res.data.Data.Token;
            return axios(originalRequest);
          } else {
            authStore.updateUser(null);
            router.replace("/login");
            return Promise.reject(error);
          }
        })
        .catch((err) => {
          authStore.updateUser(null);
          router.replace("/login");
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
    // error.response.statusText
  }
);

export default axios;
