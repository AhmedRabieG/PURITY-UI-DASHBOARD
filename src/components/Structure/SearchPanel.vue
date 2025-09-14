<script setup lang="ts">
import { Form } from "vee-validate";
import AppButton from "../../components/Form/AppButton.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const props = defineProps({
  initialValues: {
    type: Object,
    required: true,
  },
});
const extend = [];
const emit = defineEmits(["submitSearch", "resetSearch"]);

const submitSearch = (values) => {
  emit("submitSearch", values);
};
const resetSearch = (slotProps) => {
  console.log("slotProps =", slotProps);
  emit("resetSearch", slotProps.resetForm({ values: {} }));
};
</script>

<setup setup>

</setup>
<template>
  <div class="">
    <v-expansion-panels>
      <v-expansion-panel class="mb-3 custom-panel">
        <v-expansion-panel-title class="custom-panel-title">
          {{ t("Search") }}
        </v-expansion-panel-title>
        <Form
          @submit="submitSearch"
          v-slot="slotProps"
          :initialValues="initialValues"
          keep-values
        >
          <v-expansion-panel-text class="custom-panel-text">
            <div class="search-items-wrapper">
              <slot v-bind="slotProps"></slot>
            </div>
            <div class="search-actions-wrapper">
              <AppButton variant="primary" type="submit">
                {{ t("Search") }}
              </AppButton>
              <AppButton
                @click="resetSearch(slotProps)"
                variant="secondary"
                type="reset"
              >
                {{ t("Reset") }}
              </AppButton>
            </div>
          </v-expansion-panel-text>
        </Form>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<style lang="scss"></style>
