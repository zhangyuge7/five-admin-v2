<script setup>
import { computed } from 'vue'
import mittBus from '@/utils/mitt'
import { t } from '@/i18n'
import SvgIcon from '@/components/svg-icon/index.vue'

defineProps({
  size: { type: String || Number },
})
const title = computed(() => t('tools.setting'))
function clickSetting() {
  mittBus.emit('onShowSettingDrawer')
}
</script>

<template>
  <el-tooltip
    :content="title"
    placement="bottom"
  >
    <div class="tools-item" @click="clickSetting">
      <el-icon :size="size">
        <SvgIcon name="EpSetting" />
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
