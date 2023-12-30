<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { onClickOutside } from '@vueuse/core'
import { useAppStore } from '@/stores/modules/app'

defineOptions({ name: 'Tools' })
const { appConfig } = useAppStore()
const moreRef = ref()
const isDev = import.meta.env.MODE === 'development'

const Dark = defineAsyncComponent(() => import('./Dark.vue'))
const Locale = defineAsyncComponent(() => import('./Locale.vue'))
const Settings = isDev && defineAsyncComponent(() => import('./Settings.vue'))
const ElSize = defineAsyncComponent(() => import('./ElSize.vue'))
const FullScreen = defineAsyncComponent(() => import('./FullScreen.vue'))
const Refresh = defineAsyncComponent(() => import('./Refresh.vue'))
const NavSearch = defineAsyncComponent(() => import('./NavSearch.vue'))
const size = '18'

const isUnfold = ref(false)
onClickOutside(moreRef, () => {
  if (appConfig.trigger === 'click' && isUnfold.value)
    isUnfold.value = false
})
function onMore() {
  if (appConfig.trigger === 'click')
    isUnfold.value = !isUnfold.value
}
function onMouseover(v) {
  if (appConfig.trigger === 'hover')
    isUnfold.value = v
}
const icon = computed(() => isUnfold.value ? ArrowRight : ArrowLeft)
const toolsMaxWidth = computed(() => {
  if (appConfig.headerToolsOmit) {
    if (isUnfold.value)
      return '300px'

    else
      return '32px'
  }
  else {
    return 'initial'
  }
})
</script>

<template>
  <div class="h-full flex items-center">
    <div ref="moreRef" class="h-full flex items-center tools justify-end" :style="{ maxWidth: toolsMaxWidth }" @mouseleave="onMouseover(false)">
      <NavSearch :size="size" />
      <Locale :size="size" />
      <Dark :size="size" />
      <FullScreen :size="size" />
      <ElSize :size="size" />
      <div v-if="appConfig.headerToolsOmit" class="tools-item" title="展开" @click.stop="onMore" @mouseenter="onMouseover(true)">
        <el-icon>
          <Transition mode="out-in" name="scale">
            <Component :is="icon" />
          </Transition>
        </el-icon>
      </div>
    </div>
    <Settings v-if="isDev" :size="size" />
    <Refresh :size="size" />
  </div>
</template>

<style scoped>
.tools{
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s;
}
.tools-item {
  @apply h-full pl-2 pr-2 flex items-center justify-center cursor-pointer hover:bg-[var(--fv-tools-hover-bg-color)]
}
</style>
