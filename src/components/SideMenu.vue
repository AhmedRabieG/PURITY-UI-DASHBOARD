<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });

const authStore = useAuthStore();
const subCategoriesPages = ref();
const pageCategories = ref([]);

onMounted(async () => {
  await authStore
    .getPageCategories()
    .then(() => {
      pageCategories.value = authStore.PageCategories;
      console.log("Page Categories:", pageCategories.value);
      handelPageCategories(pageCategories.value);
    })
    .catch((error) => {
      console.error("Failed to fetch page categories:", error);
    });
});

const categoryItems = ref([]);

async function handelPageCategories(data) {
  categoryItems.value = data.map((item) => {
    const newItem = { ...item };
    if (newItem.Pages && newItem.Pages.length > 0) {
      newItem.Childs = JSON.parse(
        JSON.stringify([...newItem.Childs, ...newItem.Pages])
      );
      delete newItem.Pages;
    }
    return newItem;
  });
  console.log("category Items data:", categoryItems?.value);
  return categoryItems.value;
}
</script>

<template>
  <aside
    class="w-[300px] bg-primary-250 shadow-default flex-shrink-0 h-screen flex flex-col"
  >
    <!-- Fixed Header -->
    <div
      class="relative flex border-gradient-b gap-3 items-center p-[44px] px-[30px] pb-7"
    >
      <div class="w-6 h-6">
        <img
          src="@/assets/images/SVG/dash-logo.svg"
          alt="dashbord-logo"
          class="w-full h-full"
        />
      </div>
      <h3 class="text-base font-bold text-primary-650">
        {{ t("PURITYUIDASHBOARD") }}
      </h3>
    </div>

    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto custom-scrollbar py-5">
      <div
        class="flex items-center justify-center h-full"
        v-if="authStore?.isMenuLoading"
      >
        <v-progress-circular indeterminate color="primary" size="64" />
      </div>
      <!-- page category item  -->

      <div
        v-else
        class="px-[30px] border-b border-primary-300 last:border-b-0"
        v-for="category in categoryItems"
        :key="category?.id"
      >
        <h3 class="text-primary-650 mt-5 mb-3">
          {{ `${t(category?.NameEn)}` }}
        </h3>

        <!-- List of items -->
        <div class="space-y-2">
          <template v-for="item in category?.Childs" :key="item?.id">
            <!-- Regular link for items without Pages -->
            <router-link
              v-if="!item.Pages?.length"
              :to="item?.link"
              class="flex items-center gap-3 px-4 py-3 rounded-[15px] text-primary-500 hover:bg-white hover:text-[#2D3748] transition-all duration-200 font-semibold"
            >
              <v-icon
                v-if="item?.icon"
                :icon="item?.icon"
                class="mr-2"
                size="small"
              />
              <span>{{ `${t(item?.NameEn)}` }}</span>
            </router-link>

            <!-- Expansion panel for items with Pages -->
            <v-expansion-panels
              v-else
              variant="accordion"
              class="custom-expansion-panels"
            >
              <v-expansion-panel class="mb-3 custom-panel">
                <v-expansion-panel-title class="custom-panel-title">
                  <div class="d-flex align-center">
                    <v-icon
                      v-if="item?.icon"
                      :icon="item?.icon"
                      class="mr-2"
                      size="small"
                    />
                    <span>{{ `${t(item?.NameEn)}` }}</span>
                  </div>
                </v-expansion-panel-title>

                <v-expansion-panel-text class="custom-panel-text">
                  <ul class="custom-pages-list">
                    <li
                      v-for="subItem in item.Pages"
                      :key="subItem?.id"
                      class="pl-6 py-2 text-primary-500 hover:text-primary-600 custom-page-item"
                    >
                      <router-link :to="subItem?.Path" class="custom-link">
                        {{ `${t(subItem?.NameEn)}` }}
                      </router-link>
                    </li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* Reset Vuetify expansion panels styles */
:deep(.custom-expansion-panels) {
  background-color: transparent !important;
  box-shadow: none !important;
}

:deep(.custom-panel) {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  margin-bottom: 8px !important;
}

:deep(.custom-panel .v-expansion-panel-title) {
  padding: 12px 16px !important;
  border-radius: 15px !important;
  color: var(--primary-500) !important;
  font-weight: 600 !important;
  min-height: unset !important;
  background-color: transparent !important;
  box-shadow: none !important;
}

:deep(.custom-panel .v-expansion-panel-title:hover) {
  background-color: white !important;
  color: #2d3748 !important;
}

:deep(.custom-panel.v-expansion-panel--active .v-expansion-panel-title) {
  background-color: white !important;
  color: #2d3748 !important;
}

:deep(.custom-panel .v-expansion-panel-text) {
  background-color: transparent !important;
}

:deep(.custom-panel .v-expansion-panel-text__wrapper) {
  padding: 8px 0 !important;
}

:deep(.custom-pages-list) {
  list-style: none;
  margin: 0;
  padding: 0;
}

:deep(.custom-page-item) {
  border-radius: 8px;
  transition: all 0.2s ease;
}

:deep(.custom-page-item:hover) {
  background-color: rgba(255, 255, 255, 0.1);
}

:deep(.custom-link) {
  text-decoration: none;
  display: block;
  width: 100%;
  color: inherit;
}

/* Fallback: Alternative implementation using custom accordion */
.fallback-accordion {
  background: transparent;
}

.fallback-accordion-item {
  margin-bottom: 8px;
  border: none;
  background: transparent;
}

.fallback-accordion-header {
  padding: 12px 16px;
  border-radius: 15px;
  color: var(--primary-500);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  transition: all 0.2s ease;
}

.fallback-accordion-header:hover {
  background-color: white;
  color: #2d3748;
}

.fallback-accordion-content {
  padding: 8px 0;
  display: none;
}

.fallback-accordion-content.active {
  display: block;
}

.v-expansion-panel__shadow {
  box-shadow: none !important;
}

/* Custom Scrollbar Styles */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: var(--primary-500) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--primary-300);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: var(--primary-400);
}
</style>
