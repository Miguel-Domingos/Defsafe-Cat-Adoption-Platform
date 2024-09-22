<script setup lang="ts">
import { z } from "zod";
import { Modal } from "@/components";
import type { IAdopt } from "~/types/adopt";

const modalRef = ref<InstanceType<typeof Modal> | null>(null);
defineProps<{ application: IAdopt }>();

const checked = ref(true);
</script>

<template>
  <Modal ref="modalRef">
    <template #header>
      <span class="text-xl font-semibold"> Adopt Application </span>
    </template>
    <div class="flex flex-col w-full gap-2">
      <div class="flex flex-col w-full gap-2">
        <label for="name" class="text-sm font-semibold text-brand-main"
          >Full Name</label
        >
        <InputText
          id="name"
          class="w-full"
          v-model="application.fullname"
          aria-describedby="name-help"
          :disabled="true"
        />
      </div>

      <div class="flex flex-col w-full gap-2">
        <label for="email" class="text-sm font-semibold text-brand-main"
          >Email</label
        >
        <InputText
          id="email"
          class="w-full"
          v-model="application.email"
          :disabled="true"
        />
      </div>

      <div class="flex flex-col w-full gap-2">
        <label for="phone" class="text-sm font-semibold text-brand-main"
          >Telephone</label
        >
        <InputText
          :disabled="true"
          id="phone"
          class="w-full"
          v-model="application.telephone"
        />
      </div>

      <div class="flex flex-col w-full gap-2">
        <label for="reason" class="text-sm font-semibold text-brand-main"
          >Description</label
        >
        <Textarea
          rows="3"
          id="reason"
          class="w-full"
          v-model="application.reason"
          :disabled="true"
        />
      </div>
      <div class="flex items-center w-full gap-2">
        <Checkbox v-model="checked" :binary="true" :disabled="true" />

        <span to="agree" class="text-sm text-brand-secundary"
          >I agree to take care of this cat</span
        >
      </div>
    </div>

    <div class="flex justify-end gap-2 mt-4">
      <Button
        class="border border-solid border-brand-stroke"
        @click="modalRef?.closeModal()"
        severity="secondary"
        label="Close"
      />
    </div>
  </Modal>
  <Button
    @click="modalRef?.openModal()"
    size="small"
    label="Adopt Informations"
    severity="secondary"
    class="w-full border border-solid border-brand-stroke"
  />
</template>
