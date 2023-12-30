<script setup>
import { ref } from 'vue'

const val = ref()
</script>

<template>
  <div>
    数据大屏2
    <el-input v-model="val" placeholder="请输入" style="width: 200px;" />

    <RouterLink to="/screen/1">
      去大屏1
    </RouterLink>
    <RouterLink to="/">
      回首页
    </RouterLink>
  </div>
</template>
