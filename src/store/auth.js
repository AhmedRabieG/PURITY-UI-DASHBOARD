import { defineStore } from 'pinia'
import { useStorage } from "@vueuse/core";
import axiosInstance from "@/utils/axiosRealProject.js";
import { computed, ref } from 'vue'



export const useAuthStore = defineStore('auth', () => {
  // State
  const user = useStorage('auth', {})
  const PageCategories= ref([]);
  const CurrentPagePermissions = ref([])
  const isMenuLoading = ref(false);

  // Getters
  const isAuthenticated = computed(() => !!user.value?.Token)  // true or false
  // const CurrentPagePermissions = computed(() => user.value?.Permissions)  // Array

  const checkPermission = (permission) => {    // true or false
    return CurrentPagePermissions.value?.some(
      (item) => item.Code === permission
    )
  }

  // Actions
  function login(newUser) {
    user.value = newUser
  }

  function logout() {
    user.value = null
  }
  function updateUser(newUser) {
    user.value = newUser
  }
  async function getPageCategories() {
    try {
      isMenuLoading.value = true;
      const response = await axiosInstance.get('Auth/PageCategories');
      if (response.status === 200 && response.data?.Data) {
        PageCategories.value = response.data.Data;
      }
    }
    catch (error) {
      console.error("Error fetching page categories:", error);
    }
    finally {
      isMenuLoading.value = false;
    }
  }

  return {
    user,
    login,
    logout,
    isAuthenticated,
    updateUser,
    checkPermission,
    PageCategories,
    getPageCategories,
    isMenuLoading,
  }
})
