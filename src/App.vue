<template>
  <div>
    <div
      v-if="isLoggedIn"
      class="flex w-full justify-between bg-gray-100 p-4 my-4 shadow-md rounded-lg"
    >
      <div class="flex space-x-2">
        <RouterLink
          class="block rounded-md px-3 py-2 text-base font-normal rounded-md transition-all"
          :class="
            route.path === '/home'
              ? 'bg-white shadow'
              : 'hover:shadow hover:bg-white/50'
          "
          :to="{ path: '/home' }"
        >
          Home
        </RouterLink>

        <RouterLink
          class="block rounded-md px-3 py-2 text-base font-normal rounded-md transition-all"
          :class="
            route.path === '/documents/create'
              ? 'bg-white shadow'
              : 'hover:shadow hover:bg-white/50'
          "
          :to="{ path: '/documents/create' }"
        >
          Create Document
        </RouterLink>
      </div>

      <button
        class="block rounded-md px-3 py-2 text-base font-normal rounded-md transition-all ml-auto border border-gray-300 hover:border-gray-400"
        @click="logoutMutation.mutate"
      >
        Logout
      </button>
    </div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { useRoute, useRouter } from "vue-router";
import { authClient } from "./client";
import { useLocalStorage } from "@vueuse/core";

const route = useRoute();
const router = useRouter();

const isLoggedIn = useLocalStorage("isLoggedIn", false);
const logoutMutation = useMutation({
  mutationFn: authClient.logout,
  onSuccess: () => {
    router.push({ path: "/" });
    isLoggedIn.value = false;
  },
});
</script>
