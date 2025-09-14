<script setup>
import { useAuthStore } from "@/store/auth";
import { ref } from "vue";

const panels = ref([
  { title: "العنوان الأول", content: "ده المحتوى الخاص بالبانل الأول." },
  { title: "العنوان الثاني", content: "ده المحتوى الخاص بالبانل الثاني." },
  { title: "العنوان الثالث", content: "ده المحتوى الخاص بالبانل الثالث." },
]);
const authStore = useAuthStore();
</script>
<template>
  <div class="bg-white-700 p-6 rounded-lg shadow-default">
    <h1 class="text-2xl font-bold text-primary-800 mb-4">Products</h1>
    <p class="text-primary-300">Manage your products here</p>
  </div>
  <v-container>
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
  </v-container>
</template>
