import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router/index.js';

import vuetify from './utils/vuetify.js'
import { createPinia } from "pinia";
import i18n from './utils/i18.js';
// import axios  from './utils/axios.js';
import axiosInstance  from './utils/axiosRealProject.js';
// import axiosInstance from './plugins/testAxios.js';
import VueAxios from 'vue-axios'
import VueToast from 'vue-toast-notification'
import MyGlobalFunction from './helpers/plugins.js'
import yap from './utils/yup.js'
import 'vue-toast-notification/dist/theme-sugar.css'
import 'vue-toast-notification/dist/theme-default.css';
import './assets/style/scss/style.scss'
import './assets/style/tailwind.css'
import './assets/style/fonts.css'

// Import Vuetify   
// import 'vuetify/dist/vuetify.min.css'
// import 'vuetify/dist/vuetify.css'
// const pinia = createPinia()

createApp(App)
    .use(router)
    .use(vuetify)
    .use(VueAxios, axiosInstance)
    .use(createPinia())
    .use(yap)
    .use(i18n)
    .use(MyGlobalFunction)
    .use(VueToast, {
        position: 'top',
        duration: 3000
        
    })
    .mount('#app')
