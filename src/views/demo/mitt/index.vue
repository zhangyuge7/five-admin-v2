<script setup>
import Mitt1 from './Mitt1.vue'
import Mitt2 from './Mitt2.vue'
</script>

<template>
  <div>
    这是父组件，演示 两个子组件使用 mitt 全局事件总线实现组件通信
    <Mitt1 />
    <Mitt2 />
  </div>
</template>
