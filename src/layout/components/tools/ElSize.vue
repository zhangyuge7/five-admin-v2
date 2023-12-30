<script setup>
import { computed } from 'vue'
import SvgIcon from '@/components/svg-icon/index.vue'
import { useAppStore } from '@/stores/modules/app'
import { elementSizes } from '@/appConfig'

defineProps({
  size: { type: String || Number },
})
const appStore = useAppStore()

function command(flag) {
  appStore.appConfig.elementSize = flag
}
const elSize = computed(() => appStore.appConfig.elementSize)
</script>

<template>
  <div class="tools-item">
    <el-dropdown class="h-full" size="default" :trigger="appStore.appConfig.trigger" @command="command">
      <div class="el-dropdown-link">
        <el-icon :size="size">
          <SvgIcon name="IconoirTextSize" />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in elementSizes" :key="item.value" :command="item.value" :disabled="elSize === item.value">
            {{ $t(item.label) }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.el-dropdown{
    color: inherit;
}
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
