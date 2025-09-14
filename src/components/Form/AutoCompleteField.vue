<script setup>
import { ref, defineProps, toRef, inject, watch } from "vue";
import { useField } from "vee-validate";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });
const currentMode = inject("currentMode");

const props = defineProps({
  modelValue: {
    type: [String, Number, Object, Array],
    default: null,
  },
  name: {
    type: String,
    requird: true,
  },
  label: {
    type: String,
    required: true,
  },

  readonly: Boolean,
  itemTitle: String,
  itemValue: String,
  multiple: Boolean,
  clearable: Boolean,
  chips: Boolean,
  hasSelectAll: Boolean,
  items: {
    required: true,
  },
  required: {
    type: Boolean,
  },
  rules: {
    type: Object,
  },
  placeHolder: String,
  autoSelectFirst: {
    type: Boolean,
    default: true,
  },
  validateOnUpdate: Boolean,
  closableChips: Boolean,
  variant: {
    type: String,
    default: "outlined",
  },
});

const emit = defineEmits(["update:modelValue"]);

const {
  value: inputValue,
  handleBlur,
  errors,
  setErrors,
} = useField(toRef(props, "name"), props.rules, {
  validateOnValueUpdate: props.validateOnUpdate,
});

watch(inputValue, (newValue) => emit("update:modelValue", newValue));

const disabled = ref(false);
const hideDetails = ref("auto");
const activeItems = ref(props.items);
watch(
  () => props.items,
  (newItems) => {
    activeItems.value = newItems;
  }
);

if (currentMode?.value == "view") disabled.value = true;

const handleFocus = () => {
  if (currentMode?.value == "view") disabled.value = false;
  hideDetails.value = false;
};

if (currentMode?.value == "view") disabled.value = true;
</script>
<template>
  <div class="w-full">
    <v-autocomplete
      v-model="inputValue"
      :hideDetails="hideDetails"
      :rules="veeRules"
      :label="label"
      :placeholder="placeHolder"
      :items="items"
      :item-title="itemTitle"
      :item-value="itemValue"
      @blur="handleBlur"
      :error-messages="errors"
      :multiple="multiple"
      :readonly="readonly"
      autocomplete
      :clearable="clearable"
      :disabled="disabled || currentMode == 'view'"
      :chips="chips"
      :closable-chips="closableChips"
      :variant="variant"
    >
    </v-autocomplete>
  </div>
</template>
<style scoped lang="scss"></style>
