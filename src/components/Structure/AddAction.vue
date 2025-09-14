<script setup>
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();
import AppButton from "@/components/Form/AppButton.vue";

const props = defineProps({
  canAdd: {
    type: Boolean,
    default: false,
  },
  item: {
    required: false,
  },
});
</script>
<template>
  <div>
    <AppButton variant="primary">
      <slot></slot>
    </AppButton>
  </div>
</template>
<style lang="scss"></style>
