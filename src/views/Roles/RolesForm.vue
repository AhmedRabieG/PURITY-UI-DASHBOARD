<script setup>
import { ref } from "vue";
import axiosInstance from "@/utils/axiosRealProject.js";
import { Form, useField } from "vee-validate";
import InputTextField from "@/components/Form/InputTextField.vue";
import PermissionTable from "./subComponents/PermissionTable.vue";
import { ErrorMessage } from "vee-validate";
import * as yup from "yup";
import BaseModal from "@/components/BaseModal.vue";

let query = {};
const schema = yup.object({
  NameAr: yup.string().trim().required().label("NameAr"),
  Name: yup.string().trim().required().label("NameEn"),
  PageActions: yup.array().required().min(1, "min One Permission"),
});
let isActionsLoading = ref(false);
let isPagesLoading = ref(false);
const view = ref(false);
const moduleActions = ref([]);
async function getModuleActions() {
  try {
    isActionsLoading.value = true;
    const response = await axiosInstance.post("Action/AdminGetAll", query);
    moduleActions.value = response?.data?.Data;
    console.log("Module Actions:", moduleActions.value);
    return moduleActions;
  } catch (error) {
    console.error("Error fetching module actions:", error);
  } finally {
    console.log("Module actions fetched successfully.");
    isActionsLoading.value = false;
  }
}

const pageCategories = ref([]);
getModuleActions();
async function getAllPageCategory() {
  try {
    isPagesLoading.value = true;
    const response = await axiosInstance.post("Page/GetAllPageCategory", query);
    pageCategories.value = response?.data?.Data;
    console.log("Page Categories:", pageCategories.value);
    return pageCategories;
  } catch (error) {
    console.error("Error fetching module actions:", error);
  } finally {
    console.log("Module actions fetched successfully.");
    isPagesLoading.value = false;
  }
}
getAllPageCategory();

const openModal = ref(false);
function showModal() {
  openModal.value = true;
  console.log("Modal opened");
}
</script>

<template>
  <v-btn color="primary" @click="showModal"></v-btn>
  <BaseModal v-model="openModal" title="Create Roles" @confirm="handleConfirm">
    <template #content>
      <p class="mb-5">Roles Form page!</p>
      <div class="w-[75%] mx-auto mt-8">
        <h1>Create Roles</h1>
        <p class="mb-5">Roles Form page!</p>
        <Form
          :validation-schema="schema"
          :initial-values="{ PageActions: [], IsActive: true }"
          v-slot="{ values }"
        >
          <div class="grid grid-cols-2 gap-4">
            <InputTextField
              name="NameAr"
              label="Arabic Name"
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-300 text-primary-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
            />
            <InputTextField
              name="Name"
              label="English Name"
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-300 text-primary-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
            />
          </div>
          <div v-if="isActionsLoading || isPagesLoading">
            <h2>loading .....</h2>
          </div>
          <div class="mt-4" v-else>
            <h3 class="text-[#797979] font-bold mb-2">Permissions</h3>
            <label
              class="text-[14px] text-[#797979] font-normal mb-1 required-field"
              >PermissionsSelect</label
            >
            <div
              class="permission-accordion-table__container"
              v-for="items in pageCategories"
              :key="items.index"
            >
              <PermissionTable
                name="PageActions"
                :items="items"
                :moduleActions="moduleActions"
                :readonly="view"
              >
              </PermissionTable>
            </div>
            <ErrorMessage name="PageActions" class="mt-2 form__error block" />
          </div>
        </Form>
      </div>
    </template>
  </BaseModal>
</template>
<style lang="scss">
.permission-accordion {
  &__header {
    background-color: rgba(#003993, 0.06);
    position: relative;
    width: 100%;
    border-radius: 0.625rem 0.625rem 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #7e8299;
    font-weight: 600;
    font-size: 12px;
    transition: background-color 0.3s ease-in-out;

    // @include rtl() {
    //   padding: 0 1.5rem 0 1.25rem;
    // }

    // @include ltr() {
    //   padding: 0 1.25rem 0 1.5rem;
    // }

    &-end {
      display: flex;
      align-items: center;
      gap: 1.125rem;

      span {
        display: inline-flex;
        align-items: center;
        background-color: #ffffff;
        height: 32px;
        padding: 0.5rem 0.625rem;
        border-radius: 0.375rem;
        color: var(--primary);
        font-size: 11px;
        font-weight: 500;
        transition: background-color 0.3s ease-in-out;
      }
    }

    .switch-wrapper {
      //   @include rtl() {
      //     right: 0;
      //   }

      //   @include ltr() {
      //     left: 0;
      //   }
    }
  }

  &-table {
    width: 100%;
    border-collapse: collapse;
    text-align: -webkit-match-parent;

    &__container {
      overflow: hidden;
      border-radius: 10px;
      margin-bottom: 0.75rem;

      .v-expansion-panels {
        overflow: auto;
      }

      .v-expansion-panel--active {
        .permission-accordion {
          &__header {
            background-color: rgba(#003993, 0.18);
            color: #003993;

            &-end {
              span {
                /*background-color: #f4f7f5;*/
                background-color: #fff;
                color: #003993;
              }
            }

            .icon-DownSmall {
              color: #003993;
              transform: translateY(-0%) rotate(180deg);
            }

            .switch-wrapper {
              visibility: visible;
              opacity: 1;
              transform: scale(1);
            }
          }
        }
      }

      .v-expansion-panel__shadow {
        box-shadow: none;
      }

      .v-expansion-panel-title {
        height: 60px;
        padding: 0;

        // &__icon {
        //   display: none;
        // }

        .icon-DownSmall {
          top: 50%;
          transform: translateY(0) rotate(0deg);
          transition: transform 0.5s ease-in-out;
        }

        &--active {
          height: 60px;
        }
      }

      .v-expansion-panel-text {
        &__wrapper {
          padding: 0;
        }
      }
    }

    thead {
      tr {
        border-bottom: 1px solid #d2d9df;

        th {
          //  background-color: #fff;
          padding: 1rem 0 1rem 0;

          //   @include ltr() {
          //     border-left: 1px solid #d2d9df;
          //   }

          //   @include rtl() {
          //     border-right: 1px solid #d2d9df;
          //   }

          .input-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            color: #464e5f;
            font-size: 12px;
            -webkit-user-select: none;
            /* Safari */
            -ms-user-select: none;
            /* IE 10 and IE 11 */
            user-select: none;
            /* Standard syntax */
            min-width: 100px;
          }

          label {
            cursor: pointer;
          }

          &:first-child {
            border-left: none;
            width: 36%;

            .input-wrapper {
              justify-content: start;
            }

            label {
              justify-content: start;
            }

            // @include ltr() {
            //   border-left: none;
            //   padding-left: 1.5rem;
            // }

            // @include rtl() {
            //   border-right: none;
            //   padding-right: 1.5rem;
            // }
          }

          &:not(first-child) {
            width: 50px;
            white-space: nowrap;
          }

          &:last-child {
            label {
              /*padding: 1rem 1.25rem;*/
            }
          }

          label {
            color: #464e5fcc;
            font-weight: 600;
          }

          .icon__wrapper {
            justify-content: space-between;
            padding: 1rem 0.75rem 1rem 1.125rem;
          }
        }
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid #d2d9df;

        &:last-child {
          border: none;
        }

        td {
          padding: 1rem 0 1rem 0;

          //   @include ltr() {
          //     border-left: 1px solid #d2d9df;
          //   }

          //   @include rtl() {
          //     border-right: 1px solid #d2d9df;
          //   }

          .input-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            color: #464e5f;
            font-size: 12px;
          }

          label {
            cursor: pointer;
            width: fit-content;
          }

          &:first-child {
            position: relative;
            -webkit-user-select: none;
            /* Safari */
            -ms-user-select: none;
            /* IE 10 and IE 11 */
            user-select: none;

            /* Standard syntax */
            .input-wrapper {
              justify-content: start;
            }

            // @include ltr() {
            //   border-left: none;
            //   padding-left: 1.5rem !important;
            // }

            // @include rtl() {
            //   border-right: none;
            //   padding-right: 1.5rem !important;
            // }

            label {
              justify-content: start;
            }
          }

          &:last-child:not(:last-child) {
            label {
              padding: 1rem 1.25rem;
            }
          }
        }

        @for $i from 1 through 5 {
          &.module-level-#{$i} {
            td:first-child {
              //   @include ltr() {
              //     padding-left: (4.6rem + $i * 1.6rem);
              //   }

              //   @include rtl() {
              //     padding-right: (4.6rem + $i * 1.6rem);
              //   }
            }
          }
        }
      }

      .sub-pages {
        .switch-wrapper {
          visibility: visible;
          opacity: 1;
          transform: scale(1);
        }

        td {
          background-color: #f4f7f5;
        }
      }
    }

    label {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      /*padding: 1rem 0 1rem 0;*/
      color: #464e5f;
      font-size: 12px;
    }
  }
}
.roles.filter {
  .v-expansion-panel-text__wrapper {
    padding: 0 !important;
  }
}
.v-btn--icon.v-btn--density-default {
  box-shadow: none;
  width: fit-content;
  height: fit-content;
}

.view {
  opacity: 0.8;

  .v-input,
  .v-field {
    opacity: 1;
    color: #a3a7aa;
  }

  .v-field__outline {
    --v-field-border-opacity: 0.2 !important;
  }
}

.hold-cursor {
  cursor: default !important;
}
</style>
