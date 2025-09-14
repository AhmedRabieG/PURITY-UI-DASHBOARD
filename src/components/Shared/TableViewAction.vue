<script setup>
import { inject } from "vue";
import { useAuthStore } from "@/store/auth.js";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });
const authStore = useAuthStore();
const showAddEditModal = inject("showAddEditModal");
const currentMode = inject("currentMode");
const model = inject("model");
const props = defineProps({
  item: {
    require: true,
  },
  canView: Boolean,
});
</script>
<template>
  <a
    href="javascript:void(0)"
    class="w-5 h-5"
    :title="t('View')"
    @click="(showAddEditModal = true), (currentMode = 'view'), (model = item)"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-5 h-5 inline-block"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  </a>
</template>
<style></style>
