<script setup>
import { ref } from "vue";
import InputTextField from "@/components/Form/InputTextField.vue";
import AddEditModal from "@/components/Structure/AddEditModal.vue";
import SwitchField from "@/components/Form/SwitchField.vue";
import * as yup from "yup";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });

const schema = yup.object({
  NameAr: yup.string().trim().required().label(t("NameAr")),
  NameEn: yup.string().trim().required().label(t("NameEn")),
  IsActive: yup.boolean().required().label(t("Status")),
});

const logfun = (val) => {
  console.log("val =", val);
};
</script>
<template>
  <AddEditModal
    createUrl="Country/Add"
    updateUrl="Country/Update"
    getOneUrl="Country/GetOne"
    title="Nationality"
    :validation-schema="schema"
    :initialValues="{ IsActive: true }"
  >
    <div class="grid grid-cols-2 gap-4">
      <InputTextField name="NameAr" :label="$t('NameAr')" required />
      <InputTextField name="NameEn" :label="$t('NameEn')" required />
      <SwitchField
        name="IsActive"
        :label="$t('Status')"
        @update:modelValue="logfun"
      />
    </div>
  </AddEditModal>
</template>
<style lang="scss"></style>
