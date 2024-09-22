<script setup lang="ts">
import { Modal } from "@/components";
import type { IAdoptRequest } from "~/types/adopt";

const modalRef = ref<InstanceType<typeof Modal> | null>(null);

const toast = useToast();
const props = defineProps<{ application: IAdoptRequest }>();
const emit = defineEmits(["approve"]);

const loading = ref(false);

async function onApprove() {
  loading.value = true;

  const response = await $fetch(`/api/adopt/${props.application.id}`, {
    method: "PUT",
    body: props.application,
  });

  if (response) {
    emit("approve");
    toast.add({
      severity: "success",
      detail: "Application Approved",
      life: 5000,
    });

    modalRef.value?.closeModal();
  } else {
    toast.add({
      severity: "error",
      detail: "Error Approving Application",
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
        class="flex items-center justify-center w-10 h-10 bg-green-100 rounded"
      >
        <Icon
          class="text-2xl !text-brand-success !bg-brand-success"
          name="ph:check"
        />
      </div>
      <span class="text-2xl font-semibold">Are you sure?</span>
      <span class="pb-4 font-light text-center text-brand-secundary">
        Are you sure you want to approve this adoption? This action cannot be
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
        @click="async () => await onApprove()"
        class="w-full"
        label="Approve"
        :loading="loading"
      />
    </div>
  </Modal>

  <Button
    @click="modalRef?.openModal()"
    size="small"
    label="Approve"
    class="w-full"
  />
</template>
