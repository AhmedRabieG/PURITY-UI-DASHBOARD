<script setup>
import { defineProps, defineEmits, computed } from "vue";

function ts(messageAr, messageEn) {
  return localStorage.lang == "ar" ? messageAr : messageEn;
}
const props = defineProps({
  modelValue: {
    type: Array,
    default: [],
  },
  ModulePage: {
    required: true,
  },
  moduleActions: {
    required: true,
  },
  readonly: Boolean,
  disabled: Boolean,
});

const emit = defineEmits(["update:modelValue", "updateAction", "updated"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const isRowSelected = computed(() =>
  // Check if all actions are selected
  props.ModulePage.PageActions.every((item) => model.value.includes(item.Id))
);

function selectRow(PageActions) {
  PageActions.forEach((item) => {
    if (!model.value.includes(item.Id)) {
      model.value.push(item.Id);
    }
  });
}

function unselectRow(PageActions) {
  PageActions.forEach((item) => {
    let index = model.value.indexOf(item.Id);
    if (index != -1) {
      model.value.splice(index, 1);
    }
  });
}
function handleSelectRow() {
  isRowSelected.value
    ? unselectRow(props.ModulePage.PageActions)
    : selectRow(props.ModulePage.PageActions);
}
</script>

<template>
  <tr>
    <td>
      <div
        :role="!readonly"
        :class="['input-wrapper', { 'disable-checkbox': readonly }]"
      >
        <input
          type="checkbox"
          class="form__checkbox"
          :checked="isRowSelected"
          @change="handleSelectRow()"
          :disabled="readonly"
          :readonly="readonly"
          :id="ModulePage.NameEn + ModulePage.Id"
        />
        <label :for="ModulePage.NameEn + ModulePage.Id">{{
          ts(ModulePage.NameAr, ModulePage.NameEn)
        }}</label>
      </div>
    </td>
    <td v-for="action in moduleActions" :key="action.Id">
      <div
        v-if="ModulePage.PageActions.find((e) => e.ActionId == action.Id)"
        :class="['input-wrapper', { 'disable-checkbox': readonly }]"
      >
        <input
          v-model="model"
          type="checkbox"
          class="form__checkbox"
          :value="
            ModulePage.PageActions.find((e) => e.ActionId == action.Id)?.Id
          "
          :disabled="readonly"
          :readonly="readonly"
        />
      </div>
    </td>
  </tr>
</template>
<style lang="scss">
.disable-checkbox {
  cursor: auto;
}
.input-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #464e5f;
  font-size: 12px;
}
.form {
  &__checkbox {
    appearance: none;
    background-image: unset;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-position: center center;
    min-width: 16px;
    width: 20px;
    height: 20px;
    border: 1px solid #bbb;
    border-radius: 0.25rem;

    &:checked {
      border: 1px solid #1f3d82;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.8333 0H4.16667C1.86548 0 0 1.86548 0 4.16667V15.8333C0 18.1345 1.86548 20 4.16667 20H15.8333C18.1345 20 20 18.1345 20 15.8333V4.16667C20 1.86548 18.1345 0 15.8333 0Z' fill='%231F3D82'/%3E%3Cpath d='M5.70068 9.99962L8.56652 12.8655L14.2982 7.13379' stroke='%23FEFEFE' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    }

    &:not(:disabled) {
      cursor: pointer;
    }
  }
}
</style>
