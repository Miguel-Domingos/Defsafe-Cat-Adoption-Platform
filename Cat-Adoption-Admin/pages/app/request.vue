<script setup lang="ts">
import type { IAdoptRequest } from "~/types/adopt";
import { Card } from "~/components";

definePageMeta({
  alias: "/request",
  layout: "app",
});

const toast = useToast();
const loading = ref(true);
const requests = ref<IAdoptRequest[]>([]);

async function fetchCats() {
  loading.value = true;
  const response = await $fetch("/api/adopt/get-all", {
    method: "get",
  });
  if (response.data) {
    requests.value = response.data.content;
  } else {
    toast.add({
      severity: "error",
      detail: "error loadin cat",
      life: 5000,
    });
  }

  loading.value = false;
}

onBeforeMount(() => {
  fetchCats();
});
</script>

<template>
  <div class="flex flex-col w-full h-full gap-5">
    <div class="flex items-center gap-2 cursor-pointer">
      <Tag severity="info">
        <Icon class="text-3xl bg-brand-main" name="ph:messenger-logo-fill" />
      </Tag>
      <span class="font-semibold text-brand-secundary">Cat Request</span>
    </div>

    <span v-if="loading" class="w-full font-semibold text-brand-primary">
      Loading Requests
    </span>
    <template v-else>
      <span
        class="w-full font-semibold text-brand-primary"
        v-if="requests.length == 0"
      >
        0 Adopt Application
      </span>

      <div
        v-else
        class="w-full grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10"
      >
        <Card @change="fetchCats()" v-for="request in requests" :request />
      </div>
    </template>
  </div>
</template>
