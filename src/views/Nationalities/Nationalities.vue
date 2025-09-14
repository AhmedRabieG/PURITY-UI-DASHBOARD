<script setup>
import { ref, onMounted, inject } from "vue";
import DataTabe from "@/components/Structure/DataTabe.vue";
import InputTextField from "@/components/Form/InputTextField.vue";
import AutoCompleteField from "@/components/Form/AutoCompleteField.vue";
import TableActions from "@/components/Shared/TableActions.vue";
import TableEditAction from "@/components/Shared/TableEditAction.vue";
import TableViewAction from "@/components/Shared/TableViewAction.vue";
import TableDeleteAction from "@/components/Shared/TableDeleteAction.vue";
import NationalitiesForm from "./NationalitiesForm.vue";

import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });

const ActivationList = ref([
  { value: true, title: t("Active") },
  { value: false, title: t("DeActivate") },
]);
</script>
<template>
  <DataTabe
    title="Nationalities"
    :addTitle="t('AddNationality')"
    apiGetAllUrl="Country/AdminGetAll"
    :thead="['NameAr', 'NameEn', 'Actions']"
  >
    <template #search>
      <InputTextField name="Name" :label="$t('Name')" />
      <AutoCompleteField
        name="Activation"
        :label="$t('Activation')"
        :item-title="title"
        :item-value="value"
        :items="ActivationList"
        autocomplete
        attach
        solo
        chips
        clearable
        closable-chips
        multiple
      />
    </template>
    <template #addEditModal>
      <NationalitiesForm />
    </template>
    <template #tbody="slotProps">
      <tr v-for="item in slotProps?.modelList" :key="item">
        <td>{{ item?.NameAr }}</td>
        <td>{{ item?.NameEn }}</td>
        <!-- <td>{{ item?.Status }}</td> -->
        <td class="action-column">
          <TableActions>
            <TableViewAction :item="item" />
            <TableEditAction :item="item" />
            <TableDeleteAction
              :item="item"
              deleteUrl="Country/Delete"
              :id="item.UniqueId"
              @deleted="slotProps.handlePreDelete"
            />
          </TableActions>
        </td>
      </tr>
    </template>
  </DataTabe>
</template>
<style lang="scss"></style>
