<script setup lang="ts">
import Dialog from "primevue/dialog";
import { ref } from "vue";
const visible = ref(false);

function openModal() {
  visible.value = true;
}

function closeModal() {
  visible.value = false;
}

interface IModalOptions {
  header?: boolean;
}

const { header = true } = defineProps<IModalOptions>();

defineExpose({ openModal, closeModal });
</script>

<template>
  <Dialog v-model:visible="visible" modal class="w-full h-full max-w-sm">
    <template #container="{ closeCallback }">
      <div class="flex flex-col w-full h-full">
        <div
          v-if="header"
          class="flex items-center justify-between pb-4 m-4 border-b border-solid border-b-brand-stroke"
        >
          <slot name="header" />
          <div
            @click="closeCallback"
            class="flex items-center justify-center w-6 h-6 bg-red-100 rounded-full cursor-pointer"
          >
            <span class="text-xs !text-brand-danger font-semibold">x</span>
          </div>
        </div>
        <div class="w-full h-full p-4 overflow-y-auto">
          <slot />
        </div>
      </div>
    </template>
  </Dialog>
</template>
