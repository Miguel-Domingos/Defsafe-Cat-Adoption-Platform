<script setup lang="ts">
import { z } from "zod";
import { Modal } from "@/components";
import { CatSchema, type CatSchemaTypes } from "~/validators/ModalForms";
import type { ICat } from "~/types/cat";
import { NameGenerator } from "~/helpers/NameGenerator";

const modalRef = ref<InstanceType<typeof Modal> | null>(null);

const toast = useToast();
const props = defineProps<{ cat: ICat }>();
const emit = defineEmits(["update"]);
const supabase = useSupabaseClient();
const fileButtonRef = ref<HTMLInputElement | null>(null);

const loading = ref(false);
const updateCatError = ref("");

const data = reactive({
  image: props.cat.image,
  name: props.cat.name,
  description: props.cat.description,
});

const validationErrors = ref<z.ZodFormattedError<CatSchemaTypes> | null>(null);

async function onEditCat() {
  loading.value = true;

  const valid = CatSchema.safeParse(data);

  if (valid.success) {
    const response = await $fetch(`/api/cat/${props.cat.id}`, {
      method: "PUT",
      body: {
        image: data.image,
        name: data.name,
        description: data.description,
      },
    });

    if (response.data) {
      emit("update");
      toast.add({
        severity: "success",
        detail: "cat updated",
        life: 5000,
      });

      modalRef.value?.closeModal();
    } else {
      toast.add({
        severity: "error",
        detail: "error updating cat",
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
      <span class="text-xl font-semibold"> Update Cat Profile </span>
    </template>
    <div class="flex flex-col w-full gap-2">
      <Message class="mt-1" v-if="updateCatError" severity="error">{{
        updateCatError
      }}</Message>

      <div class="flex flex-col w-full gap-2">
        <label for="email" class="text-sm font-semibold text-brand-main"
          >Image</label
        >
        <IconField>
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

        <small id="image-help" class="text-brand-danger"></small>
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
          aria-describedby="name-help"
        />
        <small id="name-help" class="text-brand-danger"></small>
      </div>

      <div class="flex flex-col w-full gap-2">
        <label for="email" class="text-sm font-semibold text-brand-main"
          >Description</label
        >
        <Textarea
          rows="5"
          id="name"
          class="w-full"
          placeholder="Write here..."
          v-model="data.description"
          aria-describedby="description-help"
        />
        <small id="description-help" class="text-brand-danger"></small>
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
        @click="onEditCat()"
        class="!text-white"
        type="button"
        label="update"
        :loading="loading"
      ></Button>
    </div>
  </Modal>

  <Tag @click="modalRef?.openModal()" severity="info" class="cursor-pointer">
    <Icon class="text-xl" name="solar:pen-bold" />
  </Tag>
</template>
