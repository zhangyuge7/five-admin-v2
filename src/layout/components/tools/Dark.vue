<script setup>
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/modules/app'

defineProps({
  size: { type: String || Number },
})
const { appConfig } = useAppStore()
function onDarkClick() {
  appConfig.theme = appConfig.theme === 'dark' ? appConfig.oldTheme : 'dark'
}
</script>

<template>
  <el-tooltip
    :content="$t('tools.theme')"
    placement="bottom"
  >
    <div class="tools-item" @click="onDarkClick">
      <el-icon :size="size">
        <Sunny v-if="appConfig.theme === 'dark'" />
        <Moon v-else />
      </el-icon>
    </div>
  </el-tooltip>
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
