<script setup>
import screenfull from 'screenfull'
import { computed, ref } from 'vue'

defineOptions({ name: 'FullScreen' })
const isFullscreen = ref(screenfull.isFullscreen)
const text = computed(() => isFullscreen.value ? '退出全屏' : '全屏此元素')

function fullScreen(id) {
  if (screenfull.isEnabled)
    screenfull.toggle(document.getElementById(id))
}
screenfull.on('change', () => {
  if (screenfull.isEnabled)
    isFullscreen.value = screenfull.isFullscreen
})
</script>

<template>
  <div>
    <div id="div1" class="div1">
      <span>元素1</span>
      <el-button type="primary" @click="fullScreen('div1')">
        {{ text }}
      </el-button>
    </div>
    <div id="div2" class="div2">
      <span>元素2</span>
      <el-button type="primary" @click="fullScreen('div2')">
        {{ text }}
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.div1,.div2{
    width: 50%;
    height: 200px;
    @apply
    flex
    justify-center
    items-center
}
.div1{
    background-color: rgb(250, 215, 248);
}
.div2{
    background-color: rgb(215, 243, 250);
}
</style>
