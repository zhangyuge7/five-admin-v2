<script setup>
import { ref } from 'vue'

import mittBus from '@/utils/mitt'

const count = ref(0)
function countChange(val) {
  mittBus.emit('onCountChange', val)
}
</script>

<template>
  <div>
    这是子组件1，推送数据
    <el-input-number v-model="count" @change="countChange" />
  </div>
</template>
