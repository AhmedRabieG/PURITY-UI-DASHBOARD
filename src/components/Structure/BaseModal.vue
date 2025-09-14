<script setup>
import { ref, watch, defineProps, computed, defineEmits } from "vue";
import { useAuthStore } from "@/store/auth";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });
const authStore = useAuthStore();

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "Default Modal Title",
    required: true,
  },
  ShowModalActions: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue", "close"]);

const isOpen = computed({
  get() {
    // console.log("Get isOpen - props.modelValue:", props.modelValue);
    return props.modelValue;
  },
  set(value) {
    // console.log(
    //   "Set isOpen - new value:",
    //   value,
    //   "props.modelValue:",
    //   props.modelValue
    // );
    emit("update:modelValue", value);
  },
});

const closeModal = () => {
  console.log("close Modal from base modal");
  isOpen.value = false;
  emit("close");
};

// const confirm = () => {
//   console.log("confirm modal from base modal");
//   emit("confirm");
//   closeModal();
// };
</script>
<template>
  <v-dialog v-model="isOpen" max-width="600px" persistent>
    <v-card class="card-modal">
      <v-card-title class="modal-header">
        <slot name="title">
          <h2 class="text-lg font-bold">{{ `${t(title)}` }}</h2>
        </slot>
        <v-spacer />
        <v-btn icon @click="closeModal">
          <v-icon color="red">mdi-close</v-icon>
          <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="red"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg> -->
        </v-btn>
      </v-card-title>

      <v-card-text class="modal-content">
        <slot name="content">
          <p class="text-gray-600">This is a default modal content.</p>
        </slot>
      </v-card-text>

      <!-- <v-card-actions v-if="ShowModalActions">
        <slot name="actions">
          <v-btn color="secondary" @click="$emit('confirm')">Confirm</v-btn>
          <v-btn color="primary" @click="closeModal">Close</v-btn>
        </slot>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>
<style lang="scss" scoped>
.modal-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.modal-header {
  background-color: #2d3748;
  color: white;
  display: flex;
  align-items: center;
  padding: 16px;
}

.modal-content {
  padding: 20px;
}

.modal-actions {
  padding: 16px;
  justify-content: flex-end;
}
</style>
