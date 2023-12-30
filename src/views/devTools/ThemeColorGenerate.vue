<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { colorGradual, setThemeColor } from '@/utils/theme'

const color = ref('#409eff')
const theme = ref('primary')
const colorList = ref([])
const textarea = ref()

function textareaStr() {
  let str = ''
  colorList.value.forEach((item) => {
    str = `${str + item.label}: ${item.value};\n`
  })
  textarea.value = str
}
function onCreateClick() {
  if (!color.value || !color.value.startsWith('#') || color.value.length !== 7) {
    ElMessage.warning('颜色值不正确')
    return
  }
  colorList.value = []
  const colors = colorGradual(color.value, false)
  colors.forEach((item, i) => {
    if ([1, 2, 4, 6, 10].includes(i))
      return
    if (i !== 0)
      colorList.value.push({ label: `--el-color-${theme.value}-light-${i}`, value: item })

    else
      colorList.value.push({ label: `--el-color-${theme.value}`, value: item })
  })
  const darkColors = colorGradual(color.value, true)
  colorList.value.push({ label: `--el-color-${theme.value}-dark-2`, value: darkColors[2] })
  textareaStr()
}
function onPreviewClick() {
  if (!color.value || !color.value.startsWith('#') || color.value.length !== 7) {
    ElMessage.warning('颜色值不正确')
    return
  }
  setThemeColor(theme.value, color.value)
}
</script>

<template>
  <el-main>
    <el-input
      v-model="color"
      placeholder="#409eff"
      style="width: 500px;"
    >
      <template #prepend>
        <el-select v-model="theme" style="width: 115px">
          <el-option label="primary" value="primary" />
          <el-option label="success" value="success" />
          <el-option label="warning" value="warning" />
          <el-option label="danger" value="danger" />
          <el-option label="error" value="error" />
          <el-option label="info" value="info" />
        </el-select>
      </template>
      <template #append>
        <el-button @click="onCreateClick">
          生成
        </el-button>
      </template>
    </el-input>
    <el-color-picker v-model="color" />
    <el-button @click="onPreviewClick">
      预览
    </el-button>
    <div class="flex mt-5">
      <el-input
        v-model="textarea"
        :rows="8"
        type="textarea"
        style="width: 300px;"
        readonly
      />
      <div class="ml-5">
        <p v-for="item in colorList" :key="item.label" :style="`background-color: ${item.value};width: 300px;`">
          {{ item.label }}
        </p>
      </div>
    </div>
  </el-main>
</template>
