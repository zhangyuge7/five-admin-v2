<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const linkSrc = ref('')
const load = ref(true)
function handleIframeLoad() {
  load.value = false
}
// 侦听路由
watch(() => route.path, () => {
  load.value = true
  linkSrc.value = route.meta?.iframeLink
}, { immediate: true })
</script>

<template>
  <div v-loading="load" class="w-full h-full">
    <iframe :src="linkSrc" class="w-full h-full" @load="handleIframeLoad" />
  </div>
</template>
