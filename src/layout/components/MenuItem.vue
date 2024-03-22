<script setup>
import SvgIcon from '@/components/svg-icon/index.vue'

const props = defineProps({
  routes: {
    type: Array,
    require: true,
  },
})

/** 判断路由是否为外链 */
function isLink(path) {
  return (path.startsWith('http:') || path.startsWith('https:'))
}

/** 打开外链地址 */
function openLink(path) {
  if (!isLink(path))
    return
  const arr = path.split(',')
  window.open(arr[0], arr[1])
}
</script>

<template>
  <template v-for="route in props.routes" :key="route.path">
    <el-sub-menu v-if="route.children" :index="route.path">
      <template #title>
        <el-icon v-if="route.meta?.icon">
          <SvgIcon :name="route.meta.icon" />
        </el-icon>
        <span v-if="route.meta?.title" style="text-overflow: ellipsis;overflow: hidden;">
          {{ $t(route.meta.title) }}
        </span>
      </template>
      <MenuItem :routes="route.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="isLink(route.path) ? '' : route.path" @click="openLink(route.path)">
      <el-icon v-if="route.meta?.icon">
        <SvgIcon :name="route.meta.icon" />
      </el-icon>
      <template v-if="route.meta?.title" #title>
        <span style="text-overflow: ellipsis;overflow: hidden;">
          {{ $t(route.meta.title) }}
        </span>
      </template>
    </el-menu-item>
  </template>
</template>
