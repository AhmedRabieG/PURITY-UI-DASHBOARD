<script setup>
import { ref, inject, defineEmits, computed } from "vue";
import axiosInstance from "../../utils/axiosRealProject";
import ActionConfirmationModal from "../Shared/ActionConfirmationModal.vue";
import { useI18n } from "vue-i18n";
const handlePreDelete = inject("handlePreDelete");
const { t } = useI18n({ useScope: "global" });
const { toastShow, displayError } = inject("plugins");

const props = defineProps({
  id: {
    require: true,
  },
  title: {
    type: String,
    default: "Delete",
  },
  item: {
    required: true,
  },
  deleteUrl: {
    type: String,
    require: true,
  },
  deleteMessage: String,
});

const deleteMessageText = computed(
  () => props.deleteMessage || t("DeleteConfirmationMassage")
);
const showConfirmationModal = ref(false);
const isLoading = ref(false);
async function deleteItem() {
  if (isLoading.value) return;
  isLoading.value = true;
  try {
    const { data } = await axiosInstance.delete(
      `${props.deleteUrl}/` + props.id
    );
    if (data.IsSuccess) {
      showConfirmationModal.value = false;
      toastShow(t("DeleteSuccess"), "success");
      handlePreDelete();
    }
  } catch (err) {
    console.error(err);
    displayError(err);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <a
    href="javascript:void(0)"
    class="text-red-600 hover:text-red-900"
    @click="showConfirmationModal = true"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 10-2 0v6a1 1 0 102 0V7z"
        clip-rule="evenodd"
      />
    </svg>
  </a>
  <ActionConfirmationModal
    v-model:show="showConfirmationModal"
    :message="deleteMessageText"
    confirmBtnVariant="danger"
    title="DeleteConfirmation"
    :isLoading="isLoading"
    @submitACModal="deleteItem()"
  >
  </ActionConfirmationModal>
</template>
<style></style>
