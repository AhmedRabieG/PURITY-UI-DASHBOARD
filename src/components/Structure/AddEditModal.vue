<script setup>
import { inject, onMounted, ref, watch, computed, onUnmounted } from "vue";
import BaseModal from "../Structure/BaseModal.vue";
import InputTextField from "../Form/InputTextField.vue";
import FormActions from "../Form/FormActions.vue";
import AppButton from "../Form/AppButton.vue";
import { Form } from "vee-validate";
import axiosInstance from "../../utils/axiosRealProject";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });

const emit = defineEmits(["update:modelValue", "load"]);
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  validationSchema: Object,
  getOneUrl: String,
  createUrl: String,
  updateUrl: String,
  keepValues: Boolean,
  initialValues: [],
  manualForm: Boolean,
  manualSubmit: Boolean,
});

const { displayError, toastShow } = inject("plugins");
const query = inject("query");
const showAddEditModal = inject("showAddEditModal");
const currentMode = inject("currentMode");
const model = inject("model");
const load = inject("load");
const isSubmitLoading = ref(false);
const showForm = ref(false);
const isLoading = ref(false);
const initialModel = ref();
const formSubmit = ref(null);
const showConfirmModal = ref(false);
const myform = ref(null);

function closeModal() {
  showConfirmModal.value = false;
}
function closeBaseModal() {
  showAddEditModal.value = false;
  console.log("closeBaseModal from addEditModal=>", showAddEditModal.value);
}

const detailsMode = computed(() => {
  const validModes = ["update", "view"];
  return validModes.includes(currentMode?.value);
});

const modalTitle = computed(() => {
  if (currentMode?.value == "create") return "AddNew" + props.title;
  if (currentMode?.value == "update") return "Edit" + props.title;
  if (currentMode?.value == "view") return props.title + t("Details");
  return props.title;
});

async function create(createUrl, model) {
  try {
    const { data } = await axiosInstance.post(createUrl, model);
    if (data.IsSuccess) {
      toastShow(t("CreateSuccess"), "success");
      showAddEditModal.value = false;
      closeBaseModal();
      await load();
    }
  } catch (error) {
    console.error(error);
    displayError(error);
  } finally {
    isSubmitLoading.value = false;
  }
}

async function loadCurrentOne() {
  if (!model?.value?.UniqueId) return;
  isLoading.value = true;
  try {
    const response = await axiosInstance.get(
      `${props.getOneUrl}/${model?.value?.UniqueId}`
    );
    if (response?.data?.IsSuccess) {
      initialModel.value = response?.data?.Data;
      console.log(
        "initialModel.value from loadCurrentOne =",
        initialModel.value
      );
      return initialModel.value;
    } else {
      displayError(response?.data?.Message);
    }
  } catch (error) {
    console.error(error);
    displayError(error);
  } finally {
    isLoading.value = false;
  }
}

async function update(updateUrl, model) {
  try {
    console.log("model from update", model);
    const { data } = await axiosInstance.put(updateUrl, model);
    if (data.IsSuccess) {
      toastShow(t("UpdateSuccess"), "success");
      showAddEditModal.value = false;
      closeBaseModal();
      await load();
    }
  } catch (error) {
    console.error(error);
    displayError(error);
  } finally {
    isSubmitLoading.value = false;
  }
}

onUnmounted(() => {
  showForm.value = false;
  initialModel.value = null;
  model.value = null;
  currentMode.value = null;
  formSubmit.value = null;
});

async function save(values) {
  console.log("values from save function in addEditModal =", values);
  if (!isSubmitLoading.value) {
    isSubmitLoading.value = true;
    if (currentMode.value == "create") {
      await create(props.createUrl, values);
      return;
    }
    if (currentMode.value == "update") {
      await update(props.updateUrl, values);
      return;
    }
  }
}
async function handleInitialModal() {
  if (detailsMode.value) {
    console.log("detailsMode from handle =", detailsMode.value);
    const data = await loadCurrentOne();
    console.log("load current one done");
    showForm.value = true;
    console.log(" showForm.value from handleInitialModal =", showForm.value);
    emit("load", { model: initialModel, form: myform, formData: data });
    // setTimeout(() => {
    //   console.log("showForm from handle after timeout =", showForm.value);
    // }, 0);
  } else {
    initialModel.value = props?.initialValues;
    showForm.value = true;
  }
}
handleInitialModal();
async function HandleSubmit(values) {
  await save(values);
}
function handleConfirmatoinModal() {
  showConfirmModal.value = true;
}
function scrollToFirstError() {
  // setTimeout(() => {
  //   const firstErrorElement = document.querySelector(".error-message");
  //   if (firstErrorElement) {
  //     firstErrorElement.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, 100);
}
onMounted(() => {
  console.log("showAddEditModal =", showAddEditModal.value);
  console.log("showForm from onMounted =", showForm.value);
  console.log("currentMode =", currentMode.value);
  console.log("model =", model.value);
});
defineExpose({
  load,
  save,
  myform,
});
</script>
<template>
  <BaseModal
    v-model="showAddEditModal"
    title="title"
    @update:modelValue="closeModal"
    @close="closeBaseModal"
  >
    <template #title>
      <span>{{ `${t(modalTitle)}` }}</span>
    </template>
    <template #content>
      <div class="text-center py-8" v-if="isLoading">
        <v-progress-circular
          class="mx-auto"
          color="#3484fa"
          indeterminate
          :size="50"
          :width="50"
        />
      </div>

      <Form
        v-else-if="(currentMode == 'create' || initialModel) && showForm"
        v-slot="slotProps"
        @submit="handleConfirmatoinModal"
        :validation-schema="validationSchema"
        :initial-values="initialModel"
        :keepValues="keepValues"
        @invalid-submit="scrollToFirstError"
        class="w-full h-full"
        ref="myform"
      >
        <!-- {{ initialModel }} -->
        <slot
          v-bind="slotProps"
          :initialValue="initialModel"
          :currentMode="currentMode"
          :save="save"
        >
        </slot>
        <FormActions
          v-model:showConfirmModal="showConfirmModal"
          @submitConfirm="slotProps.handleSubmit(HandleSubmit)"
          @update:closeConfirmModal="closeModal"
          @update:closeBaseModal="closeBaseModal"
        >
        </FormActions>
      </Form>
    </template>
  </BaseModal>
</template>
<style lang="scss"></style>
