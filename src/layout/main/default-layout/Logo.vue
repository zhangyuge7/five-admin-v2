<script setup>
const title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <div class="flex items-center pl-5 pr-5 h-full fv-logo">
    <img src="/src/assets/images/logo.png" class="h-[65%] mr-3">
    <h1 class="text-xl font-black">
      {{ title }}
    </h1>
  </div>
</template>

<style scoped>
.fv-logo{
  background: var(--fv-logo-bg);
  color: var(--fv-logo-title-color);
}
</style>
