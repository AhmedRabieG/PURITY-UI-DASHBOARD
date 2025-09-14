<script setup>
import { ref, defineProps, defineEmits, watch, computed } from "vue";
import * as yup from "yup";
import BaseModal from "../Structure/BaseModal.vue";
import AppButton from "../Form/AppButton.vue";
import { useI18n } from "vue-i18n";
import TextAreaField from "../Form/TextAreaField.vue";
import { Form } from "vee-validate";
const { t } = useI18n({ useScope: "global" });

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  needInfo: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: "",
  },
  confirmButtonText: {
    type: String,
    default: "Confirm",
  },
  cancelButtonText: {
    type: String,
    default: "Cancel",
  },
  confirmBtnVariant: {
    type: String,
    default: "danger",
  },
  isLoading: Boolean,
  infoRequired: {
    type: Boolean,
    default: false,
  },
  txtAreaFieldCounter: {
    type: Number,
    default: 200,
  },
  txtAreaFieldLabel: {
    type: String,
    default: "RejectReason",
  },
  txtAreaFieldName: {
    type: String,
    default: "RejectReason",
  },
});

const showConfirmationModal = computed({
  get() {
    // console.log("props.show from computed =", props.show);
    return props.show;
  },
  set(value) {
    // console.log("value from computed =", value);
    emit("update:show", value);
  },
});

const emit = defineEmits(["update:show", "submitACModal"]);

const schema = yup.object({});

function closeModal() {
  console.log("close Modal from action confirmation modal");
  showConfirmationModal.value = false;
  emit("update:show", false);
}

function submitACModal(values) {
  console.log("submitACModal called from action confirmation modal");
  emit("submitACModal", values);
  closeModal();
}
</script>
<template>
  <BaseModal
    v-model="showConfirmationModal"
    :title="title"
    @update:modelValue="closeModal"
  >
    <template #content>
      <Form
        v-slot="{ handleSubmit }"
        @submit="submitACModal($event)"
        :validation-schema="schema"
        inital-values="values"
      >
        <div class="mb-6">
          <p class="confirmation-message">{{ message }}</p>
          <TextAreaField
            v-if="needInfo"
            class="mt-4"
            :name="txtAreaFieldName"
            :label="$t(txtAreaFieldLabel)"
            :counter="txtAreaFieldCounter"
            :required="infoRequired"
            alwaysEnabled
          />
        </div>

        <div class="flex justify-end gap-2">
          <AppButton
            class="bg-danger-500 hover:bg-danger-400 text-white font-bold py-2 px-4 rounded"
            @click="closeModal"
            :isLoading="isLoading"
          >
            {{ t("Cancel") }}
          </AppButton>
          <AppButton
            class="bg-secondary-800 hover:bg-secondary-900 text-white font-bold py-2 px-4 rounded"
            :loading="isLoading"
            type="submit"
            @click="handleSubmit(($event) => emit('submitACModal', $event))"
          >
            {{ confirmButtonText }}
          </AppButton>
        </div>
      </Form>
    </template>
  </BaseModal>
</template>
<style scoped lang="scss">
.confirmation-message {
}
</style>
