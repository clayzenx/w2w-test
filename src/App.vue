<script setup lang="ts">
import { RouterView } from 'vue-router'
import Menu from './components/Menu.vue'
import { routes } from './router';
</script>

<template>
  <header>
    <Menu :routes/>
  </header>

  <RouterView />
</template>
