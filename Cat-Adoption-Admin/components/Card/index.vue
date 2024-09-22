<script setup lang="ts">
import { AdoptApplication, AdoptDecline, AdoptApprove } from "../Forms";

import { Modal } from "~/components";
import type { IAdopt, IAdoptRequest } from "~/types/adopt";

defineProps<{ request: IAdoptRequest }>();
const confirmationModal = ref<InstanceType<typeof Modal> | null>(null);
defineEmits(["change"]);
</script>

<template>
  <div
    class="w-full bg-white flex flex-col shadow-lg gap-4 rounded-lg border border-solid !border-brand-stroke p-4"
  >
    <div class="w-full overflow-hidden rounded-md">
      <img
        :src="request.cat.image"
        :alt="request.cat.name"
        class="object-cover w-full"
      />
    </div>
    <div>
      <span class="font-semibold text-brand-primary">
        {{ request.cat.name }}
      </span>
      <span class="font-light text-brand-secundary line-clamp-2">
        {{ request.cat.description }}
      </span>
    </div>
    <div class="flex flex-col w-full gap-2">
      <AdoptApplication :application="request" />
      <AdoptDecline @decline="$emit('change')" :application="request" />
      <AdoptApprove @approve="$emit('change')" :application="request" />
    </div>
  </div>
</template>
