<script setup>
import { useRoute } from 'vue-router'
import SvgIcon from '@/components/svg-icon/index.vue'

const route = useRoute()
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in route.matched" :key="item.path" :to="{ path: item.path }">
      <span class="flex">
        <el-icon v-if="item.meta?.icon">
          <SvgIcon :name="item.meta.icon" />
        </el-icon>
        <span v-if="item.meta?.title" style="margin-left: 3px;">
          {{ $t(item.meta.title) }}
        </span>
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>
:deep(.el-breadcrumb__item:last-child) .el-breadcrumb__inner{
  color: inherit;
}

:deep(.el-breadcrumb__inner){
  color: inherit;
}
:deep(.el-breadcrumb__separator){
  color: inherit;
}
</style>
