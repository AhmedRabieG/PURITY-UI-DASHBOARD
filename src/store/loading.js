import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useLoadingStore = defineStore('loading', () => {
  // State   
  const isLoading = ref(false);
  const activeRequests = ref(0);

   // Getters
  const hasActiveRequests = computed(() => activeRequests.value > 0);

  // Actions 
  const startLoading = () => {
    activeRequests.value += 1;
    isLoading.value = true;
  };

  const stopLoading = () => {
    activeRequests.value = Math.max(0, activeRequests.value - 1);
    if (activeRequests.value === 0) {
      isLoading.value = false;
    }
  };

 

  return {
    // State
    isLoading,
    activeRequests,
    
    // Actions
    startLoading,
    stopLoading,
    
    // Getters 
    hasActiveRequests
  };
});