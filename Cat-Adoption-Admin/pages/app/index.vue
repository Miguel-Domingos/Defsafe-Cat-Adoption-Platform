<script setup lang="ts">
import { EditCat, DeleteCat, NewCat } from "@/components/Forms";
import type { ICat } from "~/types/cat";

definePageMeta({
  alias: "/",
  layout: "app",
});

const loading = ref(false);
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
  <div class="flex flex-col w-full h-full gap-5">
    <div class="flex justify-between w-full">
      <div class="flex items-center gap-2 cursor-pointer">
        <Tag severity="info">
          <Icon class="text-3xl bg-brand-main" name="solar:cat-bold" />
        </Tag>
        <span class="font-semibold text-brand-secundary">Cat List</span>
      </div>

      <NewCat @create="fetchCats()" />
    </div>
    <ClientOnly>
      <DataTable
        class="overflow-hidden bg-white border border-solid rounded-lg border-brand-placeholder"
        :value="cats"
        :loading="loading"
        paginator
        :rows="5"
        :rowsPerPageOptions="[3, 5, 10]"
        dataKey="id"
      >
        <template #empty>
          <div class="w-full text-center">No cats found</div>
        </template>
        <template #loading>
          <div class="text-center">Loading cats</div>
        </template>
        <Column field="id" class="w-1/6" header="ID"></Column>
        <Column field="image" class="w-1/6" header="Image">
          <template #body="{ data }">
            <div class="w-10 h-10 overflow-hidden rounded-full">
              <img
                :src="data.image"
                alt=""
                srcset=""
                class="object-cover w-full h-full"
              />
            </div>
          </template>
        </Column>
        <Column field="name" class="w-1/6" header="Name"></Column>
        <Column field="description" class="w-full" header="Description">
          <template #body="{ data }">
            <div class="line-clamp-2">
              {{ data.description }}
            </div>
          </template>
        </Column>
        <Column field="actions" header="Actions" class="w-0">
          <template #body="{ data }">
            <div class="flex items-center gap-4">
              <EditCat @update="fetchCats()" :cat="data"> </EditCat>

              <DeleteCat @delete="fetchCats()" :cat="data"></DeleteCat>
            </div>
          </template>
        </Column>
      </DataTable>
    </ClientOnly>
  </div>
</template>

<style>
.p-datatable-column-title {
  @apply !text-brand-main;
}
</style>
