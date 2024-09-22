<script setup lang="ts">
import { useAuthStore } from "@/store";
interface ILink {
  label: string;
  to: string;
  icon: string;
}

const authStore = useAuthStore();
const links: ILink[] = [
  {
    label: "Cat List",
    to: "/",
    icon: "solar:cat-bold",
  },
  {
    label: "Cat Requests",
    to: "/request",
    icon: "ph:messenger-logo-fill",
  },
];
</script>

<template>
  <div class="flex w-screen h-screen">
    <aside
      class="flex flex-col w-full h-full border border-solid shadow-lg max-w-20 md:max-w-64 border-slate-300"
    >
      <div
        class="flex justify-center w-full py-5 border-b-2 border-solid border-b-slate-300"
      >
        <div class="flex items-center justify-center w-full gap-2">
          <Icon class="text-4xl bg-brand-main" name="ph:cat-fill" />
          <span class="hidden font-semibold text-brand-main md:block">
            Cat Adoption Plataform
          </span>
        </div>
      </div>
      <div
        class="flex flex-col items-center w-full h-full px-2 py-4 md:items-start md:px-10 md:py-12"
      >
        <h1 class="hidden text-xs font-semibold text-brand-secundary md:block">
          MAIN MENU
        </h1>
        <div class="flex flex-col items-start flex-1 gap-4 mt-5 md:w-full">
          <NuxtLink
            v-for="link in links"
            :to="link.to"
            class="flex items-center justify-center w-full gap-2 p-2 transition-all rounded cursor-pointer bg-brand-stroke md:bg-transparent hover:bg-gray-300 md:hover:bg-brand-stroke md:justify-start"
          >
            <Icon class="text-2xl bg-brand-main" :name="link.icon" />
            <span class="hidden font-semibold text-brand-main md:block">{{
              link.label
            }}</span>
          </NuxtLink>
        </div>

        <Button
          severity="danger"
          class="flex items-center justify-center md:w-full"
          size="small"
          @click="authStore.reset()"
        >
          <span class="hidden md:block"> Logout </span>
          <Icon
            class="block text-2xl bg-white md:hidden"
            name="solar:logout-2-bold"
          />
        </Button>
      </div>
    </aside>

    <div
      class="w-[calc(100%-80px)] overflow-y-auto md:w-full h-full p-4 bg-brand-stroke"
    >
      <slot />
    </div>
  </div>
</template>
