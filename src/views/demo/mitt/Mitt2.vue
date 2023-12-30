<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import mittBus from '@/utils/mitt'

const count = ref(0)
onMounted(() => {
  mittBus.on('onCountChange', (val) => {
    count.value = val
  })
})
onUnmounted(() => {
  mittBus.off('onCountChange')
})
</script>

<template>
  <div>
    这是子组件2，监听数据
    <span>{{ count }}</span>
  </div>
</template>
