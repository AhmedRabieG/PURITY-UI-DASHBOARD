<script setup>
import { toRef, computed, inject } from "vue";
import { useField } from "vee-validate";
import PremissionTableRow from "./PremissionTableRow.vue";

// https://vee-validate.logaretm.com/v4/examples/ui-libraries/
const props = defineProps({
  name: {
    type: String,
    requird: true,
  },
  items: {
    required: true,
  },
  moduleActions: {
    required: true,
  },
  readonly: {
    type: Boolean,
  },
});

function ts(messageAr, messageEn) {
  return localStorage.lang == "ar" ? messageAr : messageEn;
}
let totalSelected = computed(() => {
  let counter = 0;
  props.items.Pages.forEach((page) =>
    page.PageActions.forEach(
      (PageAction) => value.value.includes(PageAction.Id) && counter++
    )
  );
  props.items.Childs.forEach((childs) =>
    childs.Pages.forEach((page) =>
      page.PageActions.forEach(
        (PageAction) => value.value.includes(PageAction.Id) && counter++
      )
    )
  );
  return counter;
});

let isSelectAll = computed({
  get() {
    return (
      !props.items.Pages.some((page) =>
        page.PageActions.some(
          (PageAction) => !value.value.includes(PageAction.Id)
        )
      ) &&
      !props.items.Childs.some((childs) =>
        childs.Pages.some((page) =>
          page.PageActions.some(
            (PageAction) => !value.value.includes(PageAction.Id)
          )
        )
      )
    );
  },
  set(value) {
    handleSelectAll(value);
  },
});
function selectAll(PageAction) {
  if (!value.value.includes(PageAction.Id)) value.value.push(PageAction.Id);
}
function unSelectAll(PageAction) {
  let index = value.value.indexOf(PageAction.Id);
  if (index >= 0) value.value.splice(index, 1);
}

function handleSelectAll(isSelectAllValue) {
  props.items.Pages.forEach((page) =>
    page.PageActions.forEach((PageAction) =>
      isSelectAllValue ? selectAll(PageAction) : unSelectAll(PageAction)
    )
  );
  props.items.Childs.forEach((childs) =>
    childs.Pages.forEach((page) =>
      page.PageActions.forEach((PageAction) =>
        isSelectAllValue ? selectAll(PageAction) : unSelectAll(PageAction)
      )
    )
  );
}

/* Select All Functionality */

let { value } = useField(toRef(props, "name"), undefined, {
  validateOnValueUpdate: false,
  validateOnMount: false,
});
</script>

<template>
  <v-expansion-panels class="roles filter">
    <v-expansion-panel value="items.Id">
      <v-expansion-panel-title
        class="permission-accordion__header filter__icon text-[#333] text-lg p-[0.62rem] bg-info-800"
      >
        <div class="permission-accordion__header-end">
          <span>Selected ({{ totalSelected }})</span>
        </div>
        <h3 class="permission-accordion__header-title">
          {{ ts(items.NameAr, items.NameEn) }}
        </h3>
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <table class="permission-accordion-table">
          <thead class="bg-[#E7EBEB]">
            <tr>
              <th>
                <div :role="!readonly" class="input-wrapper">
                  <input
                    type="checkbox"
                    class="form__checkbox"
                    v-model="isSelectAll"
                    @input="handleSelectAll()"
                    :readonly="readonly"
                    :disabled="readonly"
                    :id="items.NameEn + items.Id"
                  />
                  <label :for="items.NameEn + items.Id">{{ selectAll }}</label>
                </div>
              </th>
              <th
                v-for="moduleAction in moduleActions"
                :key="moduleAction.Index"
              >
                <div class="input-wrapper">
                  {{ ts(moduleAction.NameAr, moduleAction.NameEn) }}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="ModulePage in items.Pages" :key="ModulePage.Id">
              <permission-table-row
                v-model="value"
                :ModulePage="ModulePage"
                :moduleActions="moduleActions"
                :readonly="readonly"
              />
            </template>
            <template v-for="SubModule in items.Childs" :key="SubModule.Id">
              <tr class="sub-pages">
                <td colspan="10">
                  <label>
                    {{ ts(SubModule.NameAr, SubModule.NameEn) }}
                  </label>
                </td>
              </tr>
              <template
                v-for="SubModulePage in SubModule.Pages"
                :key="SubModulePage.Id"
              >
                <PremissionTableRow
                  class="module-level-1"
                  v-model="value"
                  :ModulePage="SubModulePage"
                  :moduleActions="moduleActions"
                  :readonly="readonly"
                />
              </template>
            </template>
          </tbody>
        </table>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style lang="scss" scoped>
// .sub-section {
//   @include rtl() {
//     padding-right: 1.5rem;
//   }

//   @include ltr() {
//     padding-left: 1.5rem;
//   }
// }

.disable-checkbox {
  cursor: auto;
}

.form__checkbox:not([readonly]):disabled {
  opacity: 0.5;

  & + span {
    opacity: 0.5;
  }
}

.v-expansion-panels {
  border-radius: 10px;

  .v-expansion-panel {
    border-radius: 10px;
  }

  .v-expansion-panel--active {
    border: 1px solid #d2d9df;
  }
}
</style>
