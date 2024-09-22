<script setup lang="ts">
import { z } from "zod";
import { Modal } from "@/components";
import { AdoptSchema, type AdoptSchemaTypes } from "~/validators/ModalForms";

interface IAdopt {
  name: string;
  email: string;
  telephone: string;
  reason: string;
}

const modalRef = ref<InstanceType<typeof Modal> | null>(null);
const toast = useToast();
const emit = defineEmits(["adopt"]);
const loading = ref(false);
const adoptCatError = ref("");
const props = defineProps<{ catID: number }>();

const checked = ref(false);
const data = reactive<IAdopt>({
  name: "",
  email: "",
  telephone: "",
  reason: "",
});

const validationErrors = ref<z.ZodFormattedError<AdoptSchemaTypes> | null>(
  null
);

async function onCreateCat() {
  loading.value = true;

  const valid = AdoptSchema.safeParse(data);

  if (valid.success) {
    const response = await $fetch("/api/adopt", {
      method: "POST",
      body: {
        name: data.name,
        email: data.email,
        telephone: data.telephone,
        reason: data.reason,
        catID: props.catID,
      },
    });

    if (response.data) {
      data.name = "";
      data.email = "";
      data.telephone = "";
      data.reason = "";
      emit("adopt");
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

watch(data, () => {
  if (validationErrors.value) {
    validationErrors.value = null;
  }
});
</script>

<template>
  <Modal ref="modalRef">
    <template #header>
      <span class="text-xl font-semibold"> Adoption Form </span>
    </template>
    <div class="flex flex-col w-full gap-2">
      <Message class="mt-1" v-if="adoptCatError" severity="error">{{
        adoptCatError
      }}</Message>

      <div class="flex flex-col w-full gap-2">
        <label for="name" class="text-sm font-semibold text-brand-main"
          >Full Name</label
        >
        <InputText
          id="name"
          class="w-full"
          placeholder="Enter your full name"
          v-model="data.name"
          :invalid="!!validationErrors?.name?._errors[0]"
          aria-describedby="name-help"
        />
        <small id="name-help" class="text-brand-danger">{{
          validationErrors?.name?._errors[0]
        }}</small>
      </div>

      <div class="flex flex-col w-full gap-2">
        <label for="email" class="text-sm font-semibold text-brand-main"
          >Email</label
        >
        <InputText
          id="email"
          class="w-full"
          placeholder="Enter your email"
          v-model="data.email"
          :invalid="!!validationErrors?.email?._errors[0]"
          aria-describedby="email-help"
        />
        <small id="email-help" class="text-brand-danger">{{
          validationErrors?.email?._errors[0]
        }}</small>
      </div>

      <div class="flex flex-col w-full gap-2">
        <label for="phone" class="text-sm font-semibold text-brand-main"
          >Telephone</label
        >
        <InputText
          id="phone"
          class="w-full"
          placeholder="Enter your telephone"
          v-model="data.telephone"
          :invalid="!!validationErrors?.telephone?._errors[0]"
          aria-describedby="telephone-help"
        />
        <small id="telephone-help" class="text-brand-danger">{{
          validationErrors?.telephone?._errors[0]
        }}</small>
      </div>

      <div class="flex flex-col w-full gap-2">
        <label for="reason" class="text-sm font-semibold text-brand-main"
          >Description</label
        >
        <Textarea
          rows="3"
          id="reason"
          class="w-full"
          placeholder="Write here..."
          v-model="data.reason"
          aria-describedby="reason-help"
          :invalid="!!validationErrors?.reason?._errors[0]"
        />
        <small id="reason-help" class="text-brand-danger">{{
          validationErrors?.reason?._errors[0]
        }}</small>
      </div>
      <div class="flex items-center w-full gap-2">
        <Checkbox v-model="checked" :binary="true" />

        <span to="agree" class="text-sm text-brand-secundary"
          >I agree to take care of this cat</span
        >
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
        :disabled="!checked"
        @click="onCreateCat()"
        class="!text-white *:!font-normal"
        label="Submit application"
        :loading="loading"
      />
    </div>
  </Modal>
  <Button @click="modalRef?.openModal()" label="Adopt" class="w-full" />
</template>
