import i18n from "@/utils/i18.js";
const { t } = i18n.global;


const MyGlobalFunction  = {
    install(app) {
        function Capitalize(str) {
            if (typeof str !== 'string') {
                return '';
            }
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        // app.config.globalProperties.$capitalize = (text) => {
        //     if (typeof str !== 'string' || '') return '';
        //     return text
        //         .toLowerCase()
        //         .split(' ')
        //         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        //         .join(' ');
        // };
        function toastShow(messages, type, duration = 3000) {
            const option = {
                message: messages,
                type: type,
                duration: duration,
                dismissible: true,
                position: 'top-right',
            }
            app.config.globalProperties.$toast.open(option);
        }
        function displayError(err){
            var self = app.config.globalProperties.$plugins;
            if (err?.response?.status == "401" || err?.response?.status == "403") return;
            if (err?.response?.status == "422") {
                var messages = err.response.data.message;
                if (messages.length) {
                    let errorstr = "";
                    messages.map((x) => (errorstr += (x.errorMessage || "") + "<br/>"));
                    self.toastShow(errorstr, "error");
                    } else {
                    self.toastShow(t("ConnectionError"), "error");
                }
            } else if (err?.response?.status == "400") {
                const messages = err.response.data;
                if (messages.length) {
                let errorstr = "";
                messages.map((x) => (errorstr += (x.errorMessage || "") + "<br/>"));
                self.toastShow(errorstr, "error");
                }
            } 
            else if (err?.response?.data?.type && err?.response?.data?.type.toLowerCase() == "error") {
                var errorMsg = err?.response?.data?.message;
                self.toastShow(
                t(errorMsg[Object.keys(errorMsg)[0]]) +
                    "<br/>" + err?.response?.data?.exCode, "error"
                );
            }
            else if (err?.length > 0) {
                for (let i = 0; i < err.length; i++) {
                    let errorStr = "";
                    errorStr += (err[i] || "") + "<br>";
                    self.toastShow(errorStr, 'error');
                }
            } else {
                self.toastShow('UnknownError', 'error');
            }
        }
        app.provide('plugins',{
            Capitalize,
            toastShow,
            displayError
        })
        app.config.globalProperties.$plugins = {
            Capitalize,
            toastShow,
            displayError
        }
    }
}



export default MyGlobalFunction;