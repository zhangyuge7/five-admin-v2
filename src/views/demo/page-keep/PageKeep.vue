<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div>
    <p>多个组件间动态切换时当前页面被缓存</p>
    <p>路由元数据 meta 的 isKeep 属性决定此页面是否在移除后缓存</p>
    <el-input-number v-model="count" />
  </div>
</template>
