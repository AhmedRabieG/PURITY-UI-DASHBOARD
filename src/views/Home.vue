<script setup>
import { useAuthStore } from "../store/auth";
import axiosInstance from "../utils/axiosRealProject";

const authStore = useAuthStore();
</script>
<template>
  <div class="min-h-screen bg-white-600 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Welcome Section -->
      <div class="bg-white-700 rounded-lg shadow-default p-6 mb-8">
        <h1 class="text-3xl font-bold text-primary-800 mb-2">
          Welcome Back, {{ authStore.user?.UserName || "Guest" }}
        </h1>
        <p class="text-primary-300 text-lg">
          {{ t("Welcometoyourdashboard") }}
        </p>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white-700 rounded-lg shadow-default p-6">
          <h2 class="text-xl font-semibold text-primary-800 mb-4">
            Quick Actions
          </h2>
          <button
            class="w-full bg-blue-700 text-white-700 py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            {{ t("GetStarted") }}
          </button>
        </div>

        <div class="bg-white-700 rounded-lg shadow-default p-6">
          <h2 class="text-xl font-semibold text-primary-800 mb-4">
            {{ t("Statistics") }}
          </h2>
          <div class="text-secondary-700 text-2xl font-bold">
            0 {{ t("ActiveTasks") }}
          </div>
        </div>

        <div class="bg-white-700 rounded-lg shadow-default p-6">
          <h2 class="text-xl font-semibold text-primary-800 mb-4">
            {{ t("Status") }}
          </h2>
          <div class="flex items-center">
            <div class="h-3 w-3 rounded-full bg-secondary-800 mr-2"></div>
            <span class="text-primary-300">{{
              t("Allsystemsoperational")
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <v-container>
    <h2>Expansion Panels Example</h2>
    <v-expansion-panels>
      <v-expansion-panel v-for="(item, index) in panels" :key="index">
        <v-expansion-panel-title>
          {{ item.title }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          {{ item.content }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container> -->
</template>

<style></style>
