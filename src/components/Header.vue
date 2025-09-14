<script setup>
import { ref, inject } from "vue";
import axiosInstance from "../utils/axiosRealProject";
import { useAuthStore } from "../store/auth";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
const { t, locale } = useI18n({ useScope: "global" });
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

async function handleLogout() {
  await authStore.logout();
  router.push("/login");
}
const { displayError } = inject("plugins");
const isLoading = ref(false);

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
const pageTitle = computed(() => {});
const currentPageTitle = computed(() => {
  return route?.name || route?.meta?.main;
});
</script>

<template>
  <section
    class="w-full !h-[60px] bg-primary-200 flex justify-between items-center"
  >
    <div class="flex gap-2 text-primary-600 px-4">
      <h3 class="text-primary-600 text-[18px] font-semibold">
        {{ `${t(currentPageTitle)}` }}
      </h3>
    </div>
    <div class="flex gap-2 p-2">
      <template v-if="!authStore.isAuthenticated">
        <router-link
          to="/login"
          class="px-4 py-2 text-blue-700 hover:text-blue-600 font-medium"
        >
          {{ t("Login") }}
        </router-link>
        <router-link
          to="/register"
          class="px-4 py-2 bg-primary-500 text-white-700 rounded-md hover:bg-primary-400 transition-colors duration-200"
        >
          {{ t("Register") }}
        </router-link>
      </template>
      <template v-else>
        <span class="p-2 text-primary-600"
          >{{ t("Welcome") }}, {{ authStore.user?.UserName }}</span
        >
        <button
          @click="changeLanguage"
          class="p-2 text-red-600 hover:text-red-500 font-medium"
        >
          {{ t("lang") }}
        </button>
        <button
          @click="handleLogout"
          class="p-2 text-red-600 hover:text-red-500 font-medium"
        >
          {{ t("Logout") }}
        </button>
      </template>
    </div>
  </section>
</template>

<style scoped>
.router-link-active {
  color: #5932ea;
  font-weight: 500;
}
</style>
