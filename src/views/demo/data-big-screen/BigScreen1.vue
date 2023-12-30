<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const val = ref()
</script>

<template>
  <div>
    数据大屏1-缓存组件
    <el-input v-model="val" placeholder="请输入" style="width: 200px;" />
    <RouterLink to="/screen/2">
      去大屏2
    </RouterLink>
    <RouterLink to="/">
      回首页
    </RouterLink>
  </div>
</template>
