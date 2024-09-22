<script setup lang="ts">
import type { z } from "zod";
import { AuthSchema, type AuthSchemaTypes } from "@/validators/Auth";
import { useAuthStore } from "@/store";
import { Logo } from "~/components";
definePageMeta({
  alias: "/login",
});

const authStore = useAuthStore();
const loginError = ref("");
const loading = ref(false);
const validationErrors = ref<z.ZodFormattedError<AuthSchemaTypes> | null>(null);
const credentials = reactive({
  email: "",
  password: "",
});

async function onLogin() {
  loading.value = true;
  const valid = AuthSchema.safeParse(credentials);

  if (valid.success) {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        email: credentials.email,
        password: credentials.password,
      },
    });

    if (response.data?.user && response.data.session) {
      authStore.register(response.data);
    } else {
      loginError.value = response.error?.message || "";
    }
  } else {
    validationErrors.value = valid.error.format();
  }
  loading.value = false;
}

watch(credentials, () => {
  if (validationErrors.value) {
    validationErrors.value = null;
  }
  // if(loginError.value){
  //   loginError.value = ""
  // }
});
</script>

<template>
  <div class="flex justify-center w-full h-full gap-10 p-4 md:gap-20 lg:gap-40">
    <div
      class="relative hidden w-full h-full max-w-lg overflow-hidden sm:block bg-brand-main rounded-3xl"
    >
      <img
        src="../../public/Background.png"
        class="absolute object-cover w-full h-full"
        alt=""
      />
      <div class="absolute flex flex-col items-center w-full h-full">
        <div
          class="flex flex-col items-center justify-center max-w-md mt-10 text-4xl text-white"
        >
          <span class="text-center">Welcome to the Cat Adoption Panel</span>
        </div>
        <img
          src="../../public/Cat.png"
          class="object-cover object-top h-full"
          alt=""
        />
      </div>
    </div>
    <div
      class="flex flex-col items-start justify-center w-full h-full max-w-xs gap-4"
    >
      <div class="w-full">
        <Logo class="pb-4 border-b border-solid border-b-brand-stroke" />
        <h1 class="pt-4 text-2xl font-semibold">Login</h1>
      </div>
      <div v-if="loginError" class="w-full">
        <Message severity="error" class="flex justify-center w-full">{{
          loginError
        }}</Message>
      </div>
      <div class="flex flex-col w-full gap-2">
        <label for="email" class="text-sm font-semibold text-brand-main"
          >Email</label
        >
        <InputText
          id="email"
          class="w-full"
          placeholder="Enter the email"
          v-model="credentials.email"
          size="small"
          aria-describedby="email-help"
          :invalid="!!validationErrors?.email?._errors[0]"
        />
        <small id="email-help" class="text-brand-danger">{{
          validationErrors?.email?._errors[0]
        }}</small>
      </div>
      <div class="flex flex-col w-full gap-2">
        <label for="password" class="text-sm font-semibold text-brand-main"
          >Password</label
        >
        <Password
          id="password"
          v-model="credentials.password"
          aria-describedby="password-help"
          placeholder="Enter your password"
          :feedback="false"
          toggleMask
          inputClass="text-sm placeholder:text-sm w-full"
          :invalid="!!validationErrors?.password?._errors[0]"
        />

        <small id="password-help" class="text-brand-danger">{{
          validationErrors?.password?._errors[0]
        }}</small>
      </div>
      <div class="w-full mt-4">
        <Button
          @click="onLogin()"
          class="w-full"
          label="Login"
          :loading="loading"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
