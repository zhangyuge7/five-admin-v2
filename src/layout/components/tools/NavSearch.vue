<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import Fuse from 'fuse.js'
import { Search } from '@element-plus/icons-vue'
import { getAncestors } from 'cut-tree'
import { useDebouncedRef } from '@/hooks/useDebouncedRef'
import { useRouteStore } from '@/stores/modules/route'
import { t } from '@/i18n'
import router from '@/router'

defineProps({
  size: { type: String || Number },
})
// 关键字
const keyword = useDebouncedRef('')
// 菜单原数据
const { menus } = useRouteStore()
// 当前选择项
const currentActivate = ref('')

// 控制 search 显示
const dialogVisible = ref(false)
// 显示的列表数据
const searchOptions = ref([])
const searchInputRef = ref()
function onShowClick() {
  dialogVisible.value = true
  nextTick(() => {
    setTimeout(() => searchInputRef.value && searchInputRef.value.focus(), 0)
  })
}

function onActive(path) {
  dialogVisible.value = false
  if (path.startsWith('http:') || path.startsWith('https:')) {
    const paths = path.split(',')
    if (paths.length > 1)
      window.open(paths[0], paths[1])
    else
      window.open(paths[0])
  }
  else {
    router.push(path)
  }
}
function initScrollEl() {
  const outerEl = document.getElementById('result_list')
  nextTick(() => {
    const activateEl = document.getElementsByClassName('activate')[0]
    activateEl && outerEl.scrollTo({ top: activateEl.offsetTop - 200, behavior: 'smooth' })
  })
}
// 键盘按下
function onKeydown(e) {
  if (!['ArrowUp', 'ArrowDown', 'Enter'].includes(e.code))
    return
  const activateItem = searchOptions.value.find(item => item.item.path === currentActivate.value)
  const i = searchOptions.value.indexOf(activateItem)
  if (e.code === 'ArrowUp') {
    if (i <= 0)
      currentActivate.value = searchOptions.value[searchOptions.value.length - 1].item.path
    else
      currentActivate.value = searchOptions.value[i - 1].item.path
    initScrollEl()
  }
  else if (e.code === 'ArrowDown') {
    if (i === -1 || i === searchOptions.value.length - 1)
      currentActivate.value = searchOptions.value[0].item.path
    else
      currentActivate.value = searchOptions.value[i + 1].item.path
    initScrollEl()
  }
  else if (e.code === 'Enter') {
    if (i !== -1) {
      onActive(activateItem.item.path)
      dialogVisible.value = false
    }
  }
}

// 搜索方法
let fuse
function querySearch(query) {
  if (!query) {
    searchOptions.value = []
    fuse._docs.forEach((item) => {
      searchOptions.value.push({ item })
    })
  }
  else {
    searchOptions.value = fuse.search(query)
  }
}
/**
 * 初始化Fuse第三方工具库
 */
function initFuse(ls) {
  fuse = new Fuse(ls, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配算法放弃的时机， 阈值 0.0 需要完美匹配（字母和位置），阈值 1.0 将匹配任何内容。
    threshold: 0.4,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7,
      },
      {
        name: 'path',
        weight: 0.3,
      },
    ],
  })
}

onMounted(() => {
  searchOptions.value = []
  const list = []
  const ancestors = getAncestors(menus, { id: 'path', children: 'children' })
  Object.keys(ancestors).forEach((key) => {
    list.push(
      {
        path: key,
        title: ancestors[key].map(item => t(item.meta.title)).join(' > '),
      },
    )
  })
  list.forEach((item) => {
    searchOptions.value.push({ item })
  })

  initFuse(list)
})
watch(() => keyword.value, (v) => {
  initScrollEl()
  querySearch(v)
})
// 高亮显示匹配字
const getHTML = computed(() => {
  return (text) => {
    if (keyword.value.trim()) {
      const words = text.split('')
      const keys = keyword.value.trim().replace(/\s*/g, '').split('')
      keys.forEach((key) => {
        for (let i = 0; i < words.length; i++) {
          if (words[i] === key)
            words[i] = `<span style="color: var(--el-color-warning); font-weight: bolder;">${key}</span>`
        }
        text = words.join('')
      })
    }
    return text
  }
})
</script>

<template>
  <el-tooltip :content="$t('tools.navSearch')" placement="bottom">
    <div class="tools-item" @click.stop="onShowClick">
      <el-icon :size="size">
        <Search />
      </el-icon>
    </div>
  </el-tooltip>
  <el-dialog v-model="dialogVisible" title="模糊查询" width="50%" append-to-body @keydown="onKeydown">
    <div class="flex flex-col items-center">
      <div class="group">
        <el-icon class=" icon">
          <Search />
        </el-icon>
        <input ref="searchInputRef" v-model="keyword" class="input" placeholder="名称、路径">
      </div>
      <ul id="result_list" class="result_list">
        <li v-if="!searchOptions.length" class="empty">
          <el-empty description="description" />
        </li>
        <li
          v-for="item in searchOptions" v-else :key="item.item.path" class="result_list_item"
          :class="item.item.path === currentActivate ? 'activate' : ''" :title="item.item.path"
          @click="onActive(item.item.path)"
        >
          <h3 v-html="getHTML(item.item.title)" />
        </li>
      </ul>
    </div>
    <template #footer>
      Enter 选择 ↑ ↓ 切换  Esc 退出
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.result_list {
  margin-top: 20px;
  width: 90%;
  height: 330px;
  overflow: auto;
  padding: 0 5px;

  .result_list_item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.5rem 2rem;
    background-color: var(--el-bg-color);
    border: 1px solid var(--el-border-color);
    border-radius: 5px;
    margin: 1rem 0;
    cursor: pointer;
  }

  .activate {
    box-shadow: inset 0px 0px 5px 1px var(--el-color-primary);
  }

  .result_list_item:hover {
    box-shadow: inset 0px 0px 5px 1px var(--el-color-primary);
  }

  .result_list_item:active {
    box-shadow: inset 0px 0px 10px 1px var(--el-color-primary);
  }
}

.group {
  display: flex;
  align-items: center;
  position: relative;
  width: 90%;
}

.input {
  width: 100%;
  height: 45px;
  line-height: 30px;
  padding: 0 1rem;
  padding-left: 2.5rem;
  border: 2px solid var(--el-border-color);
  border-radius: 10px;
  outline: none;
  background-color: var(--el-bg-color);
  transition: .5s ease;
}

.input:focus,
input:hover {
  outline: none;
  border-color: var(--el-color-primary);
  box-shadow: 0 0 0 5px var(--el-color-primary-light-8);
}

.icon {
  position: absolute;
  left: 1rem;
  fill: none;
  width: 1rem;
  height: 1rem;
}

.tools-item {
  @apply h-full pl-2 pr-2 flex items-center justify-center cursor-pointer hover:bg-[var(--fv-tools-hover-bg-color)]
}
</style>
