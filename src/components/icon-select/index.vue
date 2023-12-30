<script setup>
import { ClickOutside as vClickOutside } from 'element-plus'
import { computed, ref, unref } from 'vue'
import { useVModel } from '@vueuse/core'
import SvgIcon from '@/components/svg-icon/index.vue'

defineOptions({
  name: 'IconSelect',
})
const prop = defineProps({
  modelValue: { type: String, default: '' },
  // 'button' || 'input'
  type: { type: String, default: 'input' },
  width: { type: String, default: '200px' },
  popoverWidth: { type: String, default: '' },
  scrollbarHeight: { type: String, default: '200px' },
  placement: { type: String, default: 'bottom' },
})
const emit = defineEmits(['update:modelValue'])
const selectValue = useVModel(prop, 'modelValue', emit)
const selectRef = ref()
const searchValue = ref('')
const popoverRef = ref()

// 点击其它区域隐藏 popover 弹窗
function clickOutside() {
  unref(popoverRef).popperRef?.delayHide?.()
}

// 加载所有svg图标
const icons = []
function loadIcons() {
  const svgs = import.meta.glob('/src/assets/icons/svg/*.svg')
  for (const icon in svgs) {
    const iconName = icon.split('assets/icons/svg/')[1].split('.svg')[0]
    icons.push(iconName)
  }
}
loadIcons()

const filterIcons = computed(() => {
  if (prop.type === 'button')
    return icons.filter(item => item.toLowerCase().includes(searchValue.value.toLowerCase()))
  else
    return icons.filter(item => item.toLowerCase().includes(prop.modelValue.toLowerCase()))
})

// 选则图标
function selectIcon(icon) {
  selectValue.value = icon
  popoverRef.value?.hide()
  searchValue.value = ''
}
</script>

<template>
  <div class="icon-select-container relative" :style="{ width }">
    <el-input
      v-if="type === 'input'"
      ref="selectRef"
      v-model="selectValue"
      v-click-outside="clickOutside"
      placeholder="点击选择图标"
      :readonly="false"
      clearable
    >
      <template #prepend>
        <SvgIcon :name="selectValue" />
      </template>
    </el-input>
    <el-button v-else ref="selectRef" v-click-outside="clickOutside" :style="{ width }">
      <SvgIcon :name="selectValue" />
      <span class="ml-[4px]">{{ selectValue ? '点击更换图标' : '点击选择图标' }}</span>
    </el-button>
    <el-popover
      ref="popoverRef"
      :hide-after="0"
      shadow="none"
      :virtual-ref="selectRef"
      virtual-triggering
      :placement="placement"
      trigger="click"
      :teleported="false"
      :width="popoverWidth || width"
    >
      <el-input v-if="type === 'button'" v-model="searchValue" placeholder="输入名称搜索图标" />
      <el-divider v-if="type === 'button'" border-style="dashed" />
      <el-scrollbar :height="scrollbarHeight">
        <ul class="icon-list m-0 pl-[10px]">
          <template v-for="icon in filterIcons" :key="icon">
            <el-tooltip effect="dark" :content="icon" placement="top">
              <li
                class="icon-item p-[5px] mr-[10px] mb-[10px] w-[30px] cursor-pointer"
                @click="selectIcon(icon)"
              >
                <SvgIcon :name="icon" />
              </li>
            </el-tooltip>
          </template>
        </ul>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.icon-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;

  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    border: 1px solid #ccc;

    &:hover {
      color: var(--el-color-primary);
      border-color: var(--el-color-primary);
      transition: all 0.2s;
      transform: scaleX(1.1);
    }
  }
}
</style>
