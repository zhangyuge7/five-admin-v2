<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div>
    <p>此页面移除后不被缓存</p>
    <el-input-number v-model="count" />
  </div>
</template>
