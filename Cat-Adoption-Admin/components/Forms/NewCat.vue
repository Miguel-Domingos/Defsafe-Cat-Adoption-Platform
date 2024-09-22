<script setup lang="ts">
import { z } from "zod";
import { Modal } from "@/components";
import { CatSchema, type CatSchemaTypes } from "~/validators/ModalForms";
import type { ICat } from "~/types/cat";
import { NameGenerator } from "~/helpers/NameGenerator";

const modalRef = ref<InstanceType<typeof Modal> | null>(null);
const toast = useToast();
const emit = defineEmits(["create"]);
const loading = ref(false);
const createCatError = ref("");

const supabase = useSupabaseClient();
const data = reactive<ICat>({
  image: "",
  name: "",
  description: "",
});

const fileButtonRef = ref<HTMLInputElement | null>(null);
const validationErrors = ref<z.ZodFormattedError<CatSchemaTypes> | null>(null);

async function onCreateCat() {
  loading.value = true;

  const valid = CatSchema.safeParse(data);

  if (valid.success) {
    const response = await $fetch("/api/cat/create", {
      method: "POST",
      body: {
        image: data.image,
        name: data.name,
        description: data.description,
      },
    });

    if (response.data) {
      emit("create");
      toast.add({
        severity: "success",
        detail: "new cat registered",
        life: 5000,
      });

      data.name = "";
      data.description = "";
      data.image = "";

      modalRef.value?.closeModal();
    } else {
      toast.add({
        severity: "error",
        detail: "error registering cat",
        life: 5000,
      });
    }
  } else {
    validationErrors.value = valid.error.format();
  }
  loading.value = false;
}

async function onFileUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const response = await supabase.storage
    .from("avatars")
    .upload(`cat_${Date.now()}.png`, file);

  if (response.error) {
    console.log(response.error);
    return;
  }
  data.image = response.data.path;
}

watch(data, () => {
  if (validationErrors.value) {
    validationErrors.value = null;
  }
});
</script>

<template>
  <Modal ref="modalRef" class="!h-auto !max-w-md">
    <template #header>
      <span class="text-xl font-semibold"> Register New Cat </span>
    </template>
    <div class="flex flex-col w-full gap-2">
      <Message class="mt-1" v-if="createCatError" severity="error">{{
        createCatError
      }}</Message>

      <div class="flex flex-col w-full gap-2">
        <label for="image" class="text-sm font-semibold text-brand-main"
          >Image</label
        >
        <div class="flex items-center w-full gap-2">
          <div
            class="flex items-center justify-center w-full h-12 overflow-hidden rounded-full max-w-12 bg-brand-stroke"
          >
            <img
              v-if="data.image"
              :src="data.image"
              class="object-cover w-full h-full"
            />
            <span v-else class="font-semibold text-brand-primary">
              {{ data.name[0] }}
            </span>
          </div>
          <IconField class="w-full">
            <InputText
              id="name"
              class="w-full"
              placeholder="Enter the cat's name"
              v-model="data.image"
              aria-describedby="image-help"
            />
            <InputIcon class="cursor-pointer" @click="fileButtonRef?.click()">
              <input
                type="file"
                ref="fileButtonRef"
                class="hidden"
                @change="onFileUpload($event)"
              />
              <Icon
                class="-mt-[6px] text-3xl bg-brand-main"
                name="ph:camera-fill"
              />
            </InputIcon>
          </IconField>
        </div>
      </div>

      <div class="flex flex-col w-full gap-2">
        <div class="flex items-center justify-between w-full">
          <label for="name" class="text-sm font-semibold text-brand-main"
            >Name</label
          >
          <Tag
            class="cursor-pointer select-none"
            @click="data.name = NameGenerator()"
          >
            <span class="text-sm font-semibold text-brand-primary"
              >Generate Name</span
            >
          </Tag>
        </div>
        <InputText
          id="name"
          class="w-full"
          placeholder="Enter the cat's name"
          v-model="data.name"
          :invalid="!!validationErrors?.name?._errors[0]"
          aria-describedby="name-help"
        />
        <small id="name-help" class="text-brand-danger">{{
          validationErrors?.name?._errors[0]
        }}</small>
      </div>

      <div class="flex flex-col w-full gap-2">
        <label for="description" class="text-sm font-semibold text-brand-main"
          >Description</label
        >
        <Textarea
          rows="5"
          id="description"
          class="w-full"
          placeholder="Write here..."
          v-model="data.description"
          aria-describedby="description-help"
          :invalid="!!validationErrors?.description?._errors[0]"
        />
        <small id="description-help" class="text-brand-danger">{{
          validationErrors?.description?._errors[0]
        }}</small>
      </div>
    </div>

    <div class="flex justify-end gap-2 mt-4">
      <Button
        class="border border-solid !border-brand-stroke"
        type="button"
        label="Cancel"
        severity="secondary"
        @click="modalRef?.closeModal()"
      ></Button>

      <Button
        @click="onCreateCat()"
        class="!text-white"
        label="create"
        :loading="loading"
      />
    </div>
  </Modal>
  <Button @click="modalRef?.openModal()">New Cat</Button>
</template>
