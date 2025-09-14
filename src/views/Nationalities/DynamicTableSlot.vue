<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  columns: {
    type: Array,
  },
  rows: {
    type: Array,
  },
});
</script>

<template>
  <table class="w-full bg-white-700 shadow-default border border-gray-200 mt-5">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row">
        <td v-for="(value, key) in row" :key="key">
          <slot :row="row" :key="key" :value="value">
            <!-- {{ value }} {{ row }} -->
            <!-- // Default content if no slot is provided -->
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style lang="scss"></style>
