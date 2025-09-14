<script setup>
import { computed } from "vue";
import UserLayout from "./layouts/UserLayout.vue";
import GustLayout from "./layouts/GustLayout.vue";

import { useRoute } from "vue-router";

const route = useRoute();
const layouts = {
  UserLayout,
  GustLayout,
};

const layout = computed(() => {
  return layouts[route.meta.layout] || "GustLayout";
});

// setTimeout(() => {
//   console.log("Final layout component:", layout?.value);
// }, 2000);
</script>

<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<style scoped></style>
