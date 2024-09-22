<script setup lang="ts">
import { Modal } from "@/components";
import type { IAdoptRequest } from "~/types/adopt";
import type { ICat } from "~/types/cat";

const modalRef = ref<InstanceType<typeof Modal> | null>(null);

const toast = useToast();
const props = defineProps<{ application: IAdoptRequest }>();
const emit = defineEmits(["decline"]);

const loading = ref(false);

async function onDecline() {
  loading.value = true;
  const response = await $fetch(`/api/adopt/${props.application.id}`, {
    method: "DELETE",
  });

  if (response.data) {
    emit("decline");
    toast.add({
      severity: "success",
      detail: "Application Declined",
      life: 5000,
    });

    modalRef.value?.closeModal();
  } else {
    toast.add({
      severity: "error",
      detail: "error declining Application",
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
        <span class="text-xl font-semibold text-brand-danger">x</span>
      </div>
      <span class="text-2xl font-semibold">Are you sure?</span>
      <span class="pb-4 font-light text-center text-brand-secundary">
        Are you sure you want to decline this adoption? This action cannot be
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
        @click="async () => await onDecline()"
        class="w-full"
        label="Delete"
        severity="danger"
        :loading="loading"
      />
    </div>
  </Modal>

  <Button
    @click="modalRef?.openModal()"
    size="small"
    label="Decline"
    severity="danger"
    class="w-full"
  />
</template>
