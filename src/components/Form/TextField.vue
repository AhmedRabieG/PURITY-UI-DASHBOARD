<script setup>
import { defineProps, defineEmits, toRef, watch } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    required: true,
  },
  rules: {
    type: [String, Object],
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
const {
  value: inputValue,
  handleBlur,
  errors,
} = useField(toRef(props, "name"), props.rules, {
  validateOnValueUpdate: true, // validate on value update
});

// async v-model
watch(inputValue, (newValue) => {
  emit("update:modelValue", newValue);
});

// assign the initial value
watch(
  () => props.modelValue,
  (newValue) => {
    if (inputValue.value !== newValue) {
      inputValue.value = newValue;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="custom-input">
    <v-text-field
      v-model="inputValue"
      :label="label"
      :placeholder="placeholder"
      :type="type"
      :disabled="disabled"
      :readonly="readonly"
      :rules="veeRules"
      :error-messages="errors"
      @blur="handleBlur"
      variant="outlined"
      density="compact"
      clearable
    ></v-text-field>
    <span v-if="errors.length" class="error-message">{{ errors[0] }}</span>
  </div>
</template>

<style scoped>
.custom-input {
  margin-bottom: 16px;
}

.error-message {
  color: #d32f2f;
  font-size: 0.75rem;
  margin-top: 4px;
  display: block;
}
</style>
