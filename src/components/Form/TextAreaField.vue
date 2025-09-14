<script setup>
import { defineProps, toRef, inject } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  counter: {
    type: String,
  },
  required: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  alwaysEnabled: {
    type: Boolean,
  },
  rules: {
    type: Object,
  },
});

const currentMode = inject("currentMode");

const { value, handleBlur, errors, setErrors } = useField(
  toRef(props, "name"),
  props.rules,
  {
    validateOnValueUpdate: false,
  }
);

function clearErrors() {
  setErrors([]);
}
</script>

<template>
  <div data-flag="parent">
    <div class="flex gap-5 items-center mb-[0.5rem]">
      <label
        :for="label"
        :class="[
          'text-[14px] text-[#666666] font-medium',
          { 'required-field': required },
        ]"
        >{{ label }}</label
      >
    </div>
    <v-textarea
      v-model="value"
      @blur="handleBlur"
      :error-messages="errors"
      variant="outlined"
      :counter="counter"
      :maxlength="counter"
      :readonly="!alwaysEnabled && (disabled || currentMode == 'view')"
      @update:modelValue="clearErrors()"
    />
  </div>
</template>
