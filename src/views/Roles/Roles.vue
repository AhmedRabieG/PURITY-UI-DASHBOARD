<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import axiosInstance from "@/utils/axiosRealProject";

const props = defineProps({
  initialFilter: Object,
  initialOrder: Object,
});
const authStore = useAuthStore();
const query = ref({
  pageNumber: 1,
  pageSize: import.meta.env.VITE_API_Default_Page_Size,
  filterModel: props?.initialFilter,
  orderModel: props?.initialOrder,
});
const totalRows = ref(0);
const modelList = ref();

async function getAllRoles() {
  try {
    const response = await axiosInstance.post("Role/AdminGetAll", query.value);
    console.log("Response data:", response?.data?.Data);
    modelList.value = response?.data?.Data;
    totalRows.value = response?.data?.Data?.Total;
    query.value.pageNumber = response?.data?.Data?.PageNumber;
  } catch (error) {
    console.error("Error fetching roles:", error);
  } finally {
    console.log("Fetch roles operation completed.");
  }
}
getAllRoles();
function viewRole() {
  console.log("Viewing role details...");
}
function editRole() {
  console.log("Editing role...");
}
function deleteRole() {
  console.log("Deleting role...");
}
</script>

<template>
  <div class="bg-white-700 p-6 rounded-lg shadow-default">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-primary-800">Roles Management</h1>
        <p class="text-primary-300 mt-1">Manage user roles and permissions</p>
      </div>
      <router-link
        to="/roles-form"
        class="bg-secondary-700 text-white-700 px-4 py-2 rounded-md hover:bg-secondary-800 transition-colors duration-200 flex items-center gap-2"
      >
        <span>Create New Role</span>
      </router-link>
    </div>

    <div class="overflow-x-auto bg-white-600 rounded-lg">
      <table class="w-full">
        <thead>
          <tr class="bg-blue-100 border-b border-gray-400">
            <th class="text-left text-primary-800 font-semibold px-6 py-3">
              English Name
            </th>
            <th class="text-left text-primary-800 font-semibold px-6 py-3">
              Arabic Name
            </th>
            <th class="text-left text-primary-800 font-semibold px-6 py-3">
              Status
            </th>
            <th class="text-right text-primary-800 font-semibold px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-400">
          <tr
            v-for="(item, index) in modelList"
            :key="index"
            class="hover:bg-white-600 transition-colors duration-150"
          >
            <td class="px-6 py-4 text-primary-800">{{ item?.NameEn }}</td>
            <td class="px-6 py-4 text-primary-800">{{ item?.NameAr }}</td>
            <td class="px-6 py-4">
              <span
                :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  item?.IsActive
                    ? 'bg-secondary-800 text-white-700'
                    : 'bg-red-100 text-red-600',
                ]"
              >
                {{ item?.IsActive ? "Active" : "Inactive" }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="flex justify-end gap-2">
                <button
                  @click="viewRole"
                  class="bg-blue-700 text-white-700 px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-200"
                >
                  View
                </button>
                <button
                  @click="editRole"
                  class="bg-yellow-700 text-white-700 px-3 py-1 rounded hover:bg-yellow-600 transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  @click="deleteRole"
                  class="bg-red-600 text-white-700 px-3 py-1 rounded hover:bg-red-500 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style></style>
