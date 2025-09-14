<script setup>
import { defineProps, defineEmits, ref, toRef, watch, inject } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
    required: false,
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
  label: {
    type: String,
  },
  placeholder: {
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
  required: {
    type: Boolean,
    default: true,
  },
  counter: {
    type: String,
  },
  variant: {
    type: String,
    default: "outlined",
  },
  inputDir: {
    type: String,
  },
});

const {
  value: inputValue,
  handleChange,
  handleBlur,
  errors,
  setErrors,
} = useField(toRef(props, "name"), props.rules, {
  validateOnValueUpdate: false,
});
const currentMode = inject("currentMode");

const emit = defineEmits(["update:modelValue"]);

watch(inputValue, (newValue) => emit("update:modelValue", newValue));

// watch(
//   () => props.modelValue,
//   (newValue) => {
//     if (inputValue.value !== newValue) {
//       inputValue.value = newValue;
//     }
//   },
//   { immediate: true }
// );

function handleInput(event) {
  setErrors([]);
}
</script>

<template>
  <div class="custom-input">
    <v-text-field
      v-model="inputValue"
      :type="type"
      :disabled="disabled || currentMode == 'view'"
      :id="name"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      class="form-input"
      :counter="counter"
      :maxlength="counter"
      :variant="variant"
      :label="label"
      :dir="inputDir"
      @update:modelValue="handleInput($event)"
      :error-messages="errors"
    />
    <!-- <label v-if="label" class="form-label" :for="name">{{ label }}</label> -->
    <!-- Display error if any -->
    <!-- <p v-if="errors.length" class="error-message">{{ errors[0] }}</p> -->
  </div>
</template>

<style lang="scss" scoped>
.custom-input {
  margin-bottom: 16px;
}

.error-message {
  color: #d32f2f;
  font-size: 0.75rem;
  margin-top: 4px;
  display: block;
}
// .input-group {
//   position: relative;
//   display: flex;
//   flex-direction: column;
// }
// .form-input {
//   border: 0;
//   border-bottom: 1px solid #555;
//   background: transparent;
//   width: 100%;
//   padding: 8px 0 5px 0;
//   font-size: 16px;
//   color: #000;
//   border-radius: 5px;
//   &::placeholder {
//     color: #000;
//   }
//   &:focus {
//     border: none;
//     outline: none;
//     border-bottom: 1px solid #e74c3c;
//   }
//   &:focus ~ label,
//   &:valid ~ label {
//     top: -12px;
//     font-size: 12px;
//   }
// }
// .form-label {
//   position: absolute;
//   top: 0px;
//   left: 0px;
//   font-size: 16px;
//   color: #000;
//   pointer-events: none;
//   transition: all 0.5s ease-in-out;
// }
</style>
