<script setup>
import { ref, provide, watch, onMounted } from "vue";
import axiosInstance from "@/utils/axiosRealProject";
import SharedTable from "@/components/Shared/SharedTable.vue";
import AddAction from "@/components/Structure/AddAction.vue";
import SearchPanel from "@/components/Structure/SearchPanel.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });
const props = defineProps({
  title: String,
  addTitle: String,
  apiGetAllUrl: {
    type: String,
    require: false,
  },
  thead: {
    type: Array,
    require: false,
  },
  sortColumns: {
    type: Array,
  },
  canAdd: Boolean,
  initialFilter: {
    type: Object,
    default: {},
  },
  initialOrder: {
    type: Object,
    default: {},
  },
});

const isLoading = ref(false);
const currentMode = ref("");
const showAddEditModal = ref(false);
const model = ref();
const modelList = ref();
const totalRows = ref(0);
const isTableLoading = ref(false);
const query = ref({
  pageNumber: 1,
  pageSize: import.meta.env.VITE_API_Default_Page_Size,
  filterModel: props.initialFilter,
  orderModel: props.initialOrder,
});

provide("currentMode", currentMode);
provide("showAddEditModal", showAddEditModal);
provide("isTableLoading", isTableLoading);
provide("model", model);
provide("load", load);
provide("modelList", modelList);
provide("totalRows", totalRows);
provide("query", query);
provide("handlePreDelete", handlePreDelete);
provide("isLoading", isLoading);

async function load() {
  isTableLoading.value = true;
  try {
    const { data: response } = await axiosInstance.post(
      props.apiGetAllUrl,
      query.value
    );
    modelList.value = response?.Data;
    totalRows.value = response?.Total;
    query.value.pageNumber = response?.PageNumber;
  } catch (error) {
    console.error(error);
  } finally {
    isTableLoading.value = false;
  }
}
load();
async function search(values) {
  query.value.pageNumber = 1;
  query.value.filterModel = values;
  await load();
}
async function reset() {
  query.value.pageNumber = 1;
  query.value.filterModel = props.initialFilter;
  await load();
}

function handlePreDelete() {
  // if (modelList.value?.length == 1 && query.value.pageNumber > 1) {
  //   query.value.pageNumber = query.value.pageNumber - 1;
  // }
  load();
}
</script>
<template>
  <pre>erefe:{{ showAddEditModal }}</pre>
  <pre>currentMode:{{ currentMode }}</pre>
  <slot name="befoterSearch"></slot>

  <SearchPanel
    :initialValues="initialFilter"
    @submitSearch="search($event)"
    @resetSearch="reset"
    v-slot="slotProps"
  >
    <slot name="search" v-bind="slotProps"></slot>
  </SearchPanel>
  <div class="bg-white">
    <div>
      <AddAction
        v-if="!!addTitle"
        @click="(showAddEditModal = true), (currentMode = 'create')"
        :canAdd="canAdd"
      >
        {{ addTitle }}
      </AddAction>
      <slot
        name="actions"
        :showAddEditModal="showAddEditModal"
        :currentMode="currentMode"
      >
      </slot>
    </div>

    <slot name="addEditModal" v-if="showAddEditModal"></slot>

    <SharedTable :totalRows="totalRows" :isTableLoading="isTableLoading">
      <thead>
        <tr class="bg-blue-100 border-b border-gray-400">
          <th v-for="column in thead" :key="column" class="text-start">
            {{ `${t(column)}` }}
          </th>
        </tr>
      </thead>
      <tbody>
        <slot
          name="tbody"
          :modelList="modelList"
          :totalRows="totalRows"
          :isLoading="isLoading"
          :query="query"
        >
        </slot>
      </tbody>
    </SharedTable>
  </div>
</template>
<style lang="scss"></style>
