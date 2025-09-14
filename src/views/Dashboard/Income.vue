<script setup>
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();
</script>

<template>
  <div class="bg-white-700 p-6 rounded-lg shadow-default">
    <h1 class="text-2xl font-bold text-primary-800 mb-4">Income</h1>
    <p class="text-primary-300">View your income statistics here</p>
  </div>
</template>
