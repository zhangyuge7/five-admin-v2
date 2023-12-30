<script setup>
import SvgIcon from '@/components/svg-icon/index.vue'
import { useAppStore } from '@/stores/modules/app'

defineProps({
  size: { type: String || Number },
})
const { appConfig } = useAppStore()
</script>

<template>
  <div :title="$t('tabs.largeScreen')" class="tools-item" @click="appConfig.pageLargeScreen = !appConfig.pageLargeScreen">
    <el-icon :size="size">
      <SvgIcon :name="appConfig.pageLargeScreen ? 'OcticonScreenNormal' : 'OcticonScreenFull'" />
    </el-icon>
  </div>
</template>

<style scoped>
.tools-item{
    @apply
    h-full
    pl-2
    pr-2
    flex
    items-center
    justify-center
    cursor-pointer
    hover:bg-[var(--fv-tools-hover-bg-color)]
}
</style>
