<script setup>
import screenfull from 'screenfull'
import { computed, ref } from 'vue'
import SvgIcon from '@/components/svg-icon/index.vue'
import { t } from '@/i18n'

defineProps({
  size: { type: String || Number },
})
const isFullscreen = ref(screenfull.isFullscreen)
const title = computed(() => isFullscreen.value ? t('tools.exitFullScreen') : t('tools.fullScreen'))
function clickSetting() {
  if (screenfull.isEnabled)
    screenfull.toggle()
}
if (screenfull.isEnabled) {
  screenfull.on('change', () => {
    isFullscreen.value = screenfull.isFullscreen
  })
}
</script>

<template>
  <el-tooltip
    :content="title"
    placement="bottom"
  >
    <div class="tools-item" @click="clickSetting">
      <el-icon :size="size">
        <SvgIcon :name="isFullscreen ? 'AntDesignFullscreenExitOutlined' : 'AntDesignFullscreenOutlined'" />
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
