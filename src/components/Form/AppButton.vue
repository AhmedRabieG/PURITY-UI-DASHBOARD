<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const btnStyle = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-secondary-800 hover:bg-secondary-900 text-white font-bold py-2 px-4 rounded ";
    case "secondary":
      return "bg-primary-500 hover:bg-primary-300 text-white font-bold py-2 px-4 rounded";
    case "danger":
      return "bg-danger-500 hover:bg-danger-400 text-white font-bold py-2 px-4 rounded";
    case "cancelConfirmBtn":
      return "bg-danger-500 hover:bg-danger-400 text-white font-bold py-2 px-4 rounded";
    case "confirmBtnVariant":
      return "bg-secondary-800 hover:bg-secondary-900 text-white font-bold py-2 px-4 rounded";

    default:
      return "bg-primary-500 hover:bg-primary-400 text-white font-bold py-2 px-4 rounded";
  }
});
</script>
<template>
  <button
    :type="type"
    :class="[
      'inline-flex justify-center gap-3 px-5 py-[0.94rem] rounded transition duration-500 ease-in-out disabled:opacity-50',
      btnStyle,
    ]"
    :disabled="disabled || isLoading"
  >
    <v-progress-circular v-if="isLoading" indeterminate :size="24" :width="2" />
    <slot :isLoading="isLoading"></slot>
  </button>
</template>
<style lang="scss"></style>
