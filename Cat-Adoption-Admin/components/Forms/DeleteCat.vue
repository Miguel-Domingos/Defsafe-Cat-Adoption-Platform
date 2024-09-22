<script setup lang="ts">
import { Modal } from "@/components";
import type { ICat } from "~/types/cat";

const modalRef = ref<InstanceType<typeof Modal> | null>(null);

const toast = useToast();
const props = defineProps<{ cat: ICat }>();
const emit = defineEmits(["delete"]);

const loading = ref(false);

async function onDelete() {
  loading.value = true;
  const response = await $fetch(`/api/cat/${props.cat.id}`, {
    method: "DELETE",
  });

  if (response.data) {
    emit("delete");
    toast.add({
      severity: "success",
      detail: "cat deleted",
      life: 5000,
    });

    modalRef.value?.closeModal();
  } else {
    toast.add({
      severity: "error",
      detail: "error deleting cat",
      life: 5000,
    });
  }
  loading.value = false;
}
</script>

<template>
  <Modal ref="modalRef" class="!h-auto !max-w-[250px]" :header="false">
    <div class="flex flex-col items-center w-full gap-4">
      <div
        class="flex items-center justify-center w-10 h-10 bg-red-100 rounded"
      >
        <Icon
          class="text-2xl !text-brand-danger !bg-brand-danger"
          name="solar:trash-bin-2-bold"
        />
      </div>
      <span class="text-2xl font-semibold">Are you sure?</span>
      <span class="pb-4 font-light text-center text-brand-secundary">
        are you sure you want to delete this cat profile? This action cannot be
        undone
      </span>
    </div>
    <div class="flex justify-center gap-2 mt-4">
      <Button
        class="border border-solid w-full !border-brand-stroke"
        type="button"
        label="Cancel"
        severity="secondary"
        @click="modalRef?.closeModal()"
      />
      <Button
        @click="async () => await onDelete()"
        class="w-full"
        label="Delete"
        severity="danger"
        :loading="loading"
      />
    </div>
  </Modal>

  <Tag @click="modalRef?.openModal()" severity="danger" class="cursor-pointer">
    <Icon class="text-xl" name="solar:trash-bin-2-bold" />
  </Tag>
</template>
