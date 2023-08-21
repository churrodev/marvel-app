<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import TheNavbarVue from './components/TheNavbar.vue';

  
</script>

<template>
  <div>
    <TheNavbarVue />
    <RouterView />
  </div>
</template>