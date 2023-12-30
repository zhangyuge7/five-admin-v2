<script setup>
const props = defineProps({
  modelValue: { type: String, default: 'default' },
})
const emit = defineEmits(['update:modelValue'])

function onLayoutTypeClick(layoutType) {
  emit('update:modelValue', layoutType)
}
function isActive(layoutType) {
  return props.modelValue === layoutType ? 'layout-is-active' : ''
}
</script>

<template>
  <ul class="layout-select">
    <li class="layout-select-item" :class="isActive('default')" @click.stop="onLayoutTypeClick('default')">
      <div class="layout-select-item-header" />
      <div class="layout-select-item-sub-menu flex flex-col  items-center">
        <div v-for="i in 5" :key="i" class="w-[8px] h-[3px] bg-slate-400 mt-1" />
      </div>
    </li>
    <li class="layout-select-item" :class="isActive('crosswise')" @click.stop="onLayoutTypeClick('crosswise')">
      <div class="layout-select-item-header flex items-center justify-center ">
        <div v-for="i in 5" :key="i" class="w-[3px] h-[8px] bg-slate-400 ml-1" />
      </div>
    </li>
    <li class="layout-select-item" :class="isActive('mixture')" @click.stop="onLayoutTypeClick('mixture')">
      <div class="layout-select-item-header flex items-center justify-center ">
        <div v-for="i in 5" :key="i" class="w-[3px] h-[8px] bg-slate-400 ml-1" />
      </div>
      <div class="layout-select-item-sub-menu flex flex-col  items-center">
        <div v-for="i in 3" :key="i" class="w-[8px] h-[3px] bg-slate-400 mt-1" />
      </div>
    </li>
    <li class="layout-select-item" :class="isActive('doubleAside')" @click.stop="onLayoutTypeClick('doubleAside')">
      <div class="layout-select-item-header" />
      <div class=" flex-1">
        <div class="layout-select-item-sub-menu  flex flex-col  items-center float-left h-full">
          <div v-for="i in 5" :key="i" class="w-[8px] h-[3px] bg-slate-400 mt-1" />
        </div>
        <div
          class="layout-select-item-sub-menu flex flex-col  items-center float-left  h-full"
          style="background-color: #ebebeb;"
        >
          <div v-for="i in 3" :key="i" class="w-[8px] h-[3px] bg-slate-400 mt-1" />
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.layout-is-active {
  border: 2px solid var(--el-color-primary) !important;
}

.layout-select-item:hover {
  border: 2px solid var(--el-color-primary);
}

.layout-select-item {
  width: 60px;
  height: 60px;
  border: 2px solid var(--el-border-color);
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #b3b3b3;
  cursor: pointer;
  float: left;
  margin: 3px;
}

.layout-select-item-header {
  height: 15px;
  background-color: #1e1e1e;
}

.layout-select-item-sub-menu {
  flex-grow: 1;
  width: 15px;
  background-color: #f6f6f6;
}
</style>
