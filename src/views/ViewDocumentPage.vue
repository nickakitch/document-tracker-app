<template>
  {{ props }}
</template>

<script lang="ts" setup>
import {onMounted} from "vue";

const props = defineProps<{ documentId: string }>();
import { documentsClient } from "../client.ts";

const downloadDocument = async () => {
  const response = await documentsClient.getDocument(parseInt(props.documentId));
  const blob = new Blob([response.data], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  const fileName = documentData.value?.name || 'document';
  link.download = `${fileName}.pdf`;

  // Append link to the DOM
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
};

onMounted(() => {
  console.log('Downloading document');
  downloadDocument();
});

</script>
