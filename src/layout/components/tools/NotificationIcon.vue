<script setup>
import { computed, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import SvgIcon from '@/components/svg-icon/index.vue'

defineProps({
  size: { type: String || Number },
})
const state = reactive({
  // 消息数据
  msgData: [
    {
      id: 1,
      title: '测试标题测试标题', // 标题
      content: '测试内容测试内容测试内容测试内容', // 内容
      time: '2022-01-01 12:00:00', // 时间
      isReaded: false, // 是否已读
    },
    {
      id: 2,
      title: '测试标题1',
      content: '测试内容测试内容测试内容测试内容测试内容测试内容',
      time: '2024-03-02 12:23:11',
      isReaded: false,
    },
    {
      id: 3,
      title: '测试标题2',
      content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容',
      time: '2023-11-23 12:00:00',
      isReaded: false,
    },
    {
      id: 4,
      title: '测试标题3',
      content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容',
      time: '2023-11-23 12:00:00',
      isReaded: true,
    },
    {
      id: 5,
      title: '测试标题4',
      content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容',
      time: '2023-11-23 12:00:00',
      isReaded: true,
    },
  ],
})
// 是否有未读
const hasNotReaded = computed(() => {
  return !!state.msgData.filter(item => !item.isReaded).length
})
// 通知项点击事件
function notClick(e) {
  ElMessage.success(e.title)
  e.isReaded = true
}
// 全部已读点击事件
function doAllReaded() {
  state.msgData.forEach(item => item.isReaded = true)
}
// 查看所有点击事件
function doSeeAll() {
  ElMessage.success('查看所有消息')
}
// 清空事件
function doClean() {
  state.msgData = []
}
</script>

<template>
  <div class="tools-item">
    <el-popover
      placement="bottom"
      :width="400"
      trigger="click"
    >
      <template #reference>
        <el-badge class="notification-badge" :is-dot="hasNotReaded">
          <el-icon :size="size">
            <SvgIcon name="ph:bell-simple" />
          </el-icon>
        </el-badge>
      </template>
      <div class="not-box">
        <div class="not-header flex justify-between items-center">
          <span style="font-size: 18px;font-weight: 400;">通知</span>
          <el-tooltip content="全部标为已读" placement="bottom">
            <el-icon :size="18" style="cursor: pointer;" @click="doAllReaded">
              <SvgIcon name="ic:outline-mark-email-read" />
            </el-icon>
          </el-tooltip>
        </div>
        <div class="not-main">
          <el-empty v-if="!state.msgData.length" description="暂无通知" />
          <ul v-else>
            <li v-for="item in state.msgData" :key="item.id" class="not-item cursor-pointer" @click="notClick(item)">
              <el-badge :is-dot="!item.isReaded" style="width:100%;">
                <p style="font-weight: 600;font-size: 16px;">
                  {{ item.title }}
                </p>
              </el-badge>
              <p style="font-size: 14px;line-height: 28px;">
                {{ item.content }}
              </p>
              <p style="text-align: right;font-size: 12px;">
                {{ item.time }}
              </p>
            </li>
          </ul>
        </div>
        <div class="not-footer flex justify-between  items-center">
          <el-button type="primary" link @click="doClean">
            清空
          </el-button>
          <el-button type="primary" @click="doSeeAll">
            查看所有消息
          </el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<style scoped>
.not-item:hover{
  background-color: var(--el-color-info-light-8);

}
.not-item{
  padding: 10px 10px;
  border-bottom: 1px solid var(--el-border-color);
}
.not-box{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.not-header{
  border-bottom: 1px solid var(--el-border-color);
  padding: 10px 0;
}
.not-main{
  max-height: 300px;
  overflow-y: auto;
}
.not-footer{
  border-top: 1px solid var(--el-border-color);
  padding: 10px 0;
}
.notification-badge{
  margin-top: 6px;
}
</style>
