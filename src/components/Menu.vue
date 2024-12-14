<script setup lang="ts">
import { Menu } from '@headlessui/vue'
import { RouterLink } from 'vue-router'
import type { Route } from '@/router'
import { AcademicCapIcon } from "@heroicons/vue/24/outline";
import { ShieldCheckIcon } from "@heroicons/vue/24/outline";

const { routes } = defineProps<{
  routes: Array<Route>
}>()

</script>

<template>
  <Menu as="nav" class="flex gap-4">
    <RouterLink v-for="{ label, path, name } in routes" :to="path"
      class="inline-flex justify-center gap-2 rounded-md text-black/75 px-4 py-2 text-sm font-bold hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
      <span class="font-medium">{{ label }}</span>
      <component class="h-6 w-6 text-gray-500" :is="name === 'docs' ? ShieldCheckIcon : AcademicCapIcon"></component>
    </RouterLink>
  </Menu>
</template>
