<script setup>
import { ref, watch } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  inset: {
    type: Boolean,
    default: true,
  },
  checked: Boolean,
  checkedValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  color: {
    type: String,
    default: "success",
  },
});

const {
  value: inputValue,
  handleChange,
  errors,
  errorMessage,
} = useField(() => props.name, props.rules, {
  type: "checkbox",
  checkedValue: props.value,
});

const emit = defineEmits(["update:modelValue"]);

watch(inputValue, (newValue) => {
  emit("update:modelValue", newValue);
});

handleChange(props.value);
</script>
<template>
  <div>
    <v-switch
      v-model="inputValue"
      :label="Switch"
      :inset="inset"
      :disabled="disabled || currentMode == 'view'"
      :readonly="readonly"
      :checked="checked"
      type="checkbox"
      :color="color"
      :error-messages="errors"
      @change="$emit('update:modelValue', $event)"
    >
    </v-switch>
  </div>
  <!-- <div v-if="errors.length">
    <span class="text-sm text-red-600">{{ errors[0] }}</span>
  </div> -->
</template>
<style lang="scss"></style>
