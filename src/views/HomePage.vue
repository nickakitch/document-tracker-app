<template>
  <main>
    <div class="space-y-16 py-16 xl:space-y-20">
      <div>
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-base font-semibold leading-6 text-gray-900">
                Documents Expiring Soon
              </h1>
              <p class="mt-2 text-sm text-gray-700">
                A list of documents that will expire within the next 7 days
              </p>
            </div>
          </div>
          <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div
                class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
              >
                <table class="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Document Name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Expiry Date
                      </th>
                      <th
                        scope="col"
                      >
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="document in documents" :key="document.id">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                          {{ document.name }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                          {{ DateTime.fromSeconds(document.expiresAt).toLocaleString(DateTime.DATE_MED) }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                            href="#"
                            @click.prevent="downloadDocument(document.id, document.name)"
                            class="text-indigo-600 hover:text-indigo-900"
                          >Download</a
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import {useQuery} from "@tanstack/vue-query";
import { Document, documentsClient } from "../client.ts";
import { DateTime } from "luxon";

const { data: documents } = useQuery<Document[]>({
  queryKey: ['documents'],
  queryFn: async () => {
    const response = await documentsClient.getDocuments();
    return response.data.data;
  },
});

const downloadDocument = async (id: number, name: string) => {
  const response = await documentsClient.getDocument(id);
  const blob = new Blob([response.data], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = `${name}`;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
};

</script>