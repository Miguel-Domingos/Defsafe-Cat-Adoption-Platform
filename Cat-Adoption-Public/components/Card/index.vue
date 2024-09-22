<script setup lang="ts">
import type { ICat } from "~/types/cat";
import { Adopt } from "../Forms";
import { Modal } from "~/components";

defineProps<{ cat: ICat }>();
const confirmationModal = ref<InstanceType<typeof Modal> | null>(null);
</script>

<template>
  <div
    class="w-full flex flex-col shadow-sm gap-4 rounded-lg border border-solid !border-brand-stroke p-4"
  >
    <div class="w-full overflow-hidden rounded-md">
      <img :src="cat.image" :alt="cat.name" class="object-cover w-full" />
    </div>
    <div>
      <span class="font-semibold text-brand-primary">
        {{ cat.name }}
      </span>
      <span class="font-light text-brand-secundary line-clamp-2">
        {{ cat.description }}
      </span>
    </div>
    <div class="w-full" v-if="cat.id">
      <Button
        :title="`${cat.Adopt ? 'Adopted by ' + cat.Adopt[0].fullname : ''}`"
        v-if="cat.isAdopted"
        :disabled="true"
        label="Adopted"
        class="w-full"
      />
      <Adopt
        v-else
        @adopt="() => confirmationModal?.openModal()"
        :catID="cat.id"
      />
    </div>
  </div>

  <Modal :header="false" ref="confirmationModal" class="!max-w-[265px] !h-auto">
    <div class="flex flex-col items-center justify-center w-full gap-6">
      <div class="flex flex-col items-center justify-center gap-4">
        <div
          class="flex items-center justify-center w-10 h-10 bg-green-100 rounded"
        >
          <Icon
            class="text-2xl !text-brand-success !bg-brand-success"
            name="ph:check"
          />
        </div>
        <span class="text-xl font-semibold text-brand-primary"
          >Application Submitted!</span
        >
      </div>

      <span class="text-center text-brand-secundary">
        Thank you for submitting your adoption application! Our team will review
        your application and get back to you shortly.
      </span>
      <div class="w-full mt-4">
        <Button
          class="border w-full border-solid !border-brand-stroke"
          type="button"
          label="Close"
          @click="confirmationModal?.closeModal()"
        ></Button>
      </div>
    </div>
  </Modal>
</template>
