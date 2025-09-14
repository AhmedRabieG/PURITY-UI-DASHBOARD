<script setup>
import { inject } from "vue";
import { defineProps, defineEmits, computed, ref } from "vue";
import ActionConfirmationModal from "../Shared/ActionConfirmationModal.vue";
import AppButton from "./AppButton.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });

const currentMode = inject("currentMode");
const props = defineProps({
  showConfirmModal: {
    type: Boolean,
    default: false,
  },
  needInfo: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: "saveConfirmMessage",
  },
  title: {
    type: String,
    default: "OperationTitle",
  },
  actionBtnName: {
    type: String,
    default: "Save",
  },
  infoRequired: {
    type: Boolean,
    default: false,
  },
  txtAreaFieldName: {
    type: String,
    default: "RejectReason",
  },
  txtAreaFieldLabel: {
    type: String,
    default: "RejectReason",
  },
  txtAreaFieldCounter: {
    type: Number,
    default: 200,
  },
  isLoading: Boolean,
  disableSubmitButton: Boolean,
});
const emit = defineEmits([
  "update:closeConfirmModal",
  "submitConfirm",
  "update:closeBaseModal",
]);
const openConfirmModal = computed({
  get() {
    return props.showConfirmModal;
  },
  set(value) {
    return emit("update:closeConfirmModal", value);
  },
});
function submitConfirm() {
  openConfirmModal.value = false;
  emit("submitConfirm");
}
const closeModal = () => {
  console.log("close Modal from form actions");
  console.log("openConfirmModal.value =", openConfirmModal.value);
  openConfirmModal.value = false;
  emit("update:closeConfirmModal", false);
};
const closeBaseModal = () => {
  emit("update:closeBaseModal", false);
};
</script>
<template>
  <div class="flex justify-end gap-2">
    <slot name="FormActions"></slot>
    <AppButton
      class="bg-danger-500 hover:bg-danger-400 text-white font-bold py-2 px-4 rounded"
      @click="closeBaseModal"
      :isLoading="isLoading"
      type="button"
    >
      {{ $t("close") }}
    </AppButton>
    <AppButton
      class="bg-primary-500 hover:bg-primary-400 text-white font-bold py-2 px-4 rounded"
      type="submit"
      :isLoading="isLoading"
      :disabled="currentMode == 'view'"
    >
      {{ $t("Save") }}
    </AppButton>
  </div>
  <ActionConfirmationModal
    v-model:show="openConfirmModal"
    :message="$t(message)"
    :title="$t(title)"
    :needInfo="needInfo"
    :infoRequired="infoRequired"
    :txtAreaFieldName="txtAreaFieldName"
    :txtAreaFieldLabel="txtAreaFieldLabel"
    :txtAreaFieldCounter="txtAreaFieldCounter"
    @submitACModal="submitConfirm"
    @update:show="closeModal"
  >
  </ActionConfirmationModal>
</template>
<style lang="scss"></style>
