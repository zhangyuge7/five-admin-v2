<script setup>
import { HomeFilled, RefreshLeft } from '@element-plus/icons-vue'
import router from '@/router'

function toIndex() {
  router.push('/')
}
function doBack() {
  router.back()
}
</script>

<template>
  <el-main class="fv-error-404">
    <img src="/src/assets/images/error/notPermission.png" class="fv-error-404-img">
    <div>
      <el-button style="background-color: #61d3ba;" class=" dark:text-black" :icon="HomeFilled" @click="toIndex">
        回首页
      </el-button>
      <el-button style="background-color: #fbc623;" class=" dark:text-black" :icon="RefreshLeft" @click="doBack">
        回上一页
      </el-button>
    </div>
  </el-main>
</template>

<style scoped>
.fv-error-404{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
}
.fv-error-404-img{
  height: 80%;
}
</style>
