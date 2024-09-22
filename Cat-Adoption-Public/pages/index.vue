<script setup lang="ts">
import { Logo, Card } from "~/components";
import type { ICat } from "~/types/cat";

const loading = ref(true);
const toast = useToast();
const cats = ref<ICat[]>([]);

async function fetchCats() {
  loading.value = true;
  const response = await $fetch("/api/cat/get-all", {
    method: "get",
  });
  if (response.data) {
    cats.value = response.data.content;
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
  <div class="container flex flex-col w-full h-full gap-8 px-4 mx-auto mb-4">
    <div
      class="flex items-center w-full h-16 border-b border-solid border-b-brand-stroke"
    >
      <Logo />
    </div>

    <div class="flex flex-col flex-1 w-full gap-8">
      <div class="flex flex-col gap-1">
        <h1 class="text-4xl font-semibold text-brand-main">
          Cats for Adoption
        </h1>
        <span class="text-brand-secundary"
          >Explore our list of lovable cats looking for their homes.</span
        >
      </div>

      <template v-if="loading">
        <span class="font-semibold text-brand-primary">loading cats</span>
      </template>

      <template v-else>
        <div
          v-if="cats.length > 0"
          class="w-full grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10"
        >
          <Card v-for="cat in cats" :cat />
        </div>
        <div v-else>
          <span class="text-lg font-semibold text-brand-primary"
            >No cats available for adoption</span
          >
        </div>
      </template>
    </div>
  </div>
</template>
