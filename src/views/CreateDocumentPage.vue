<template>
  <div class="container mx-auto px-4 py-8">
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Document Name</label>
        <input
            type="text"
            id="name"
            v-model="form.name"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label for="expiryDate" class="block text-sm font-medium text-gray-700">Expiry Date</label>
        <input
            type="date"
            id="expiryDate"
            v-model="form.expiryDate"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label for="file" class="block text-sm font-medium text-gray-700">Select File</label>
        <input
            type="file"
            id="file"
            @change="handleFileChange"
            accept=".pdf"
            required
            class="mt-1 block w-full"
        />
      </div>
      <div>
        <button
            type="submit"
            :disabled="isUploading"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <span v-if="isUploading">Uploading...</span>
          <span v-else>Upload Document</span>
        </button>
      </div>
    </form>
    <div v-if="error" class="mt-4 text-red-500">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="mt-4 text-green-500">
      {{ successMessage }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { documentsClient } from '../client.ts';
import {DateTime} from "luxon";

interface DocumentFormData {
  name: string;
  expiryDate: string;
  file: File | null;
}

const form = ref<DocumentFormData>({
  name: '',
  expiryDate: '',
  file: null,
});

const isUploading = ref(false);
const error = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    form.value.file = target.files[0];
  } else {
    form.value.file = null;
  }
};

const submitForm = async () => {
  if (!form.value.file) {
    error.value = true;
    errorMessage.value = 'Please select a file to upload.';
    return;
  }

  isUploading.value = true;
  error.value = false;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const formData = new FormData();

    formData.append('name', form.value.name);
    formData.append('expires_at', Math.floor(DateTime.fromFormat(form.value.expiryDate, 'yyyy-mm-dd').toSeconds()).toString());
    formData.append('file', form.value.file);

    await documentsClient.createDocument(formData);

    successMessage.value = 'Document uploaded successfully!';
    form.value.name = '';
    form.value.file = null;
  } catch (err: any) {
    error.value = true;
    errorMessage.value = err.response?.data?.message || 'An error occurred while uploading.';
  } finally {
    isUploading.value = false;
  }
};

</script>
