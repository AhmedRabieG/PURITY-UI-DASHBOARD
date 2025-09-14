<script setup>
import { Form } from "vee-validate";
import { ref, inject } from "vue";
import * as yup from "yup";
import InputTextField from "@/components/Form/InputTextField.vue";
import axiosInstance from "../utils/axiosRealProject";
import { useAuthStore } from "../store/auth";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const { displayError, toastShow } = inject("plugins");
const { t, locale } = useI18n({ useScope: "global" });
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const schema = yup.object({
  UserName: yup.string().required().label(t("EmailOrUserName")),
  Password: yup.string().required(t("Passwordisrequired")),
});

const isLoading = ref(false);

async function login(values) {
  if (isLoading.value) return;
  try {
    isLoading.value = true;
    const response = await axiosInstance.post("Auth/Login", values);
    // console.log(response.data);
    authStore.updateUser(response.data.Data);
    toastShow(t("LoginSuccessfully"), "success");
    router.push("/");
  } catch (error) {
    displayError(error);
    console.log("error.response.data= ", error.response.data);
    console.error(error);
  } finally {
    isLoading.value = false;
    console.log("Login operation completed.");
  }
}

// async function login2(values) {
//   if (isLoading.value) return;
//   const timeoutId = setTimeout(() => {
//     isLoading.value = false;
//   }, 20000);
//   try {
//     isLoading.value = true;
//     const response = await Promise.race([
//       axiosInstance.post("Auth/Login", values),
//       new Promise((_, reject) =>
//         setTimeout(() => reject(new Error("Timeout")), 20000)
//       ),
//     ]);
//     clearTimeout(timeoutId);
//     authStore.updateUser(response.data.Data);
//     toastShow(t("LoginSuccessfully"), "success");
//     router.push("/");
//   } catch (error) {
//     clearTimeout(timeoutId);
//     displayError(error);
//   } finally {
//     isLoading.value = false;
//   }
// }

// function changeLanguage() {
//   locale.value = locale.value === "ar" ? "en" : "ar";
//   localStorage.setItem("lang", locale.value);
//   document.documentElement.dir = locale.value === "ar" ? "rtl" : "ltr";
//   console.log("dir", document.documentElement.dir);
//   // location.reload();
// }

function changeLanguage() {
  isLoading.value = true;
  if (route?.meta?.requiredAuth) {
    axiosInstance
      .post("Auth/UpdateCurrentUserLang", {
        lang: locale.value === "ar" ? "en" : "ar",
      })
      .then(() => {
        localStorage.lang = locale.value == "ar" ? "en" : "ar";
        location.reload();
      })
      .catch((error) => {
        isLoading.value = false;
        displayError(error);
      });
  } else {
    localStorage.lang = locale.value === "ar" ? "en" : "ar";
    location.reload();
  }
}
</script>

<template>
  <div class="min-h-screen flex relative">
    <div
      class="flex items-center justify-center absolute top-[30px] gap-10 p-6 bg-[#dff7f3] rounded-[15px] left-1/2 -translate-x-1/2 border-[1px] border-[#fff] z-10"
    >
      <div class="flex gap-3">
        <div class="w-[22px] h-[22px]">
          <img
            src="@/assets/images/SVG/logo-login.svg"
            alt="Logo"
            class="w-full h-full"
          />
        </div>
        <h3 class="text-sm font-bold text-primary-650">
          {{ t("PURITYUIDASHBOARD") }}
        </h3>
      </div>
      <!-- <button class="flex items-center justify-center gap-3">
        <img
          class="w-3 h-3"
          src="@/assets/images/SVG/sign-up.svg"
          alt="sign-up"
        />
        <h3 class="text-sm font-bold text-primary-650">{{ t("SignUp") }}</h3>
      </button>
      <button class="flex items-center justify-center gap-3">
        <img
          class="w-3 h-3"
          src="@/assets/images/Svg/sign-in.svg"
          alt="sign-in"
        />
        <h3 class="text-sm font-bold text-primary-650">{{ t("SignIn") }}</h3>
      </button> -->
      <button
        class="flex items-center justify-center gap-3"
        @click="changeLanguage"
      >
        <h3 class="text-sm font-bold text-primary-650">{{ t("lang") }}</h3>
      </button>
    </div>
    <!-- left side with login form -->
    <div class="w-1/2 flex items-center justify-center bg-white-700 px-12">
      <div class="max-w-md w-full">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="flex justify-center mb-6">
            <img
              src="@/assets/images/SVG/dashbord-logo.svg"
              alt="Logo"
              class="w-12 h-12"
            />
          </div>
          <h2 class="text-3xl font-bold text-gray-800">
            <p>{{ $t("Welcome") }}</p>
          </h2>
          <p class="mt-2 text-sm text-gray-500">
            {{ t("Enteryouremailandpasswordtosignin") }}
          </p>
        </div>

        <!-- Form -->
        <Form
          class="mt-4 space-y-6"
          @submit="login"
          v-slot="{ errors }"
          :validation-schema="schema"
        >
          <div class="space-y-6">
            <InputTextField
              name="UserName"
              :label="t('UserName')"
              :placeholder="t('YourUserName')"
              required
            />

            <InputTextField
              name="Password"
              type="password"
              :label="t('Password')"
              :placeholder="t('YourPassword')"
              required
            />

            <!-- Remember me and Forgot password -->
            <!-- <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  class="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label class="ml-2 block text-sm text-gray-600">{{
                  t("RememberMe")
                }}</label>
              </div>
              <div class="text-sm">
                <a
                  href="#"
                  class="font-medium text-primary-500 hover:text-primary-400"
                  >{{ t("ForgotPassword?") }}</a
                >
              </div>
            </div> -->

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-3 px-4 text-base font-medium rounded-xl text-white bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              {{ t("SignIn") }}
            </button>
          </div>
          <!-- Error Messages -->
          <!-- <div
            v-if="Object.keys(errors).length > 0"
            class="mt-4 p-3 bg-red-50 rounded-xl border border-red-100"
          >
            <p
              v-for="error in errors"
              :key="error"
              class="text-red-600 text-sm"
            >
              {{ error }}
            </p>
          </div> -->
        </Form>

        <!-- Sign up link -->
        <div class="text-center mt-4">
          <p class="text-sm text-gray-500">
            {{ t("Don'thaveanaccount?") }}
            <a
              href="#"
              class="font-medium text-primary-500 hover:text-primary-400"
              >{{ t("SignUp") }}</a
            >
          </p>
        </div>
      </div>
    </div>
    <!-- right side with gradient background -->
    <div class="w-1/2">
      <img src="@/assets/images/pages/login-img.jpg" alt="Logo" class="" />
    </div>
  </div>
</template>

<style lang="scss">
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
  -webkit-text-fill-color: #1a1a1a;
  transition: background-color 5000s ease-in-out 0s;
}

.form-group {
  margin-bottom: 1.5rem;

  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #4a5568;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    border: 1px solid #e2e8f0;
    background-color: white;
    color: #1a1a1a;
    transition: all 0.2s;

    &::placeholder {
      color: #a0aec0;
    }

    &:focus {
      border-color: var(--primary-500);
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
      outline: none;
    }
  }
}
</style>
