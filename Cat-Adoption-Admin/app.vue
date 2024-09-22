<script setup lang="ts">
// Does not work in safari and firefox
useRouter().beforeResolve((to, from, next) => {
  // @ts-ignore
  if (!document.startViewTransition) return;
  return new Promise((resolve) => {
    // @ts-ignore
    document.startViewTransition(async () => {
      resolve();
      await next();
    });
  });
});
</script>

<template>
  <div class="w-screen h-screen">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toast />
  </div>
</template>

<style>
* {
  font-family: Inter;
  scrollbar-width: thin;
}
</style>
