<script setup>
import { useAuthStore } from "@/store/auth";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });
const authStore = useAuthStore();
</script>

<template>
  <div class="bg-white-700 p-6 rounded-lg shadow-default">
    <h1 class="text-2xl font-bold text-primary-800 mb-4">
      {{ t("Dashboard") }}
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Summary Cards -->
      <div class="bg-white-600 p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold text-primary-800 mb-2">
          {{ t("TotalUsers") }}
        </h3>
        <p class="text-3xl font-bold text-secondary-700">0</p>
      </div>

      <div class="bg-white-600 p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold text-primary-800 mb-2">
          {{ t("ActiveProducts") }}
        </h3>
        <p class="text-3xl font-bold text-secondary-700">0</p>
      </div>

      <div class="bg-white-600 p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold text-primary-800 mb-2">
          {{ t("TotalSales") }}
        </h3>
        <p class="text-3xl font-bold text-secondary-700">$0</p>
      </div>
    </div>
  </div>
</template>
