<script setup>
import { reactive, ref } from 'vue'
import TextScroll from '@/components/text-scroll/index.vue'

const state = reactive({
  single: false,
  height: 60,
  fontSize: 16,
  fontWeight: 400,
  color: 'rgba(0, 0, 0, 0.88)',
  backgroundColor: '#FFF',
  amount: 4,
  gap: 20,
  interval: 10,
  step: 1,
  vertical: false,
  verticalInterval: 3000,
})
const scrollText = ref([
  {
    title: '美国作家杰罗姆·大卫·塞林格创作的唯一一部长篇小说',
    link: 'https://blog.csdn.net/Dandrose?type=blog',
  },
  {
    title: '首次出版于1951年',
  },
  {
    title: '塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内,塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内',
  },
  {
    title: '并借鉴了意识流天马行空的写作方法，充分探索了一个十几岁少年的内心世界',
  },
  {
    title: '愤怒与焦虑是此书的两大主题，主人公的经历和思想在青少年中引起强烈共鸣',
  },
])
const singleText = {
  title: '请用一只玫瑰纪念我...',
  link: 'https://blog.csdn.net/Dandrose?type=blog',
}
function onClick(text) { // 获取点击的标题
  console.log('text:', text)
}
</script>

<template>
  <el-main>
    <p>水平文字滚动</p>
    <TextScroll :scroll-text="scrollText" @click="onClick" />
    <p>自定义滚动速度</p>
    <TextScroll :scroll-text="scrollText" :step="2" @click="onClick" />
    <p>单条文字滚动</p>
    <TextScroll
      :scroll-text="singleText"
      single
      :width="360"
      :text-style="{ fontSize: '24px', fontWeight: 600, color: '#FF5B29' }"
      @click="onClick"
    />
    <p>垂直文字滚动</p>
    <TextScroll
      :scroll-text="scrollText"
      :board-style="{ backgroundColor: '#e6f4ff' }"
      :text-style="{ fontSize: '20px' }"
      vertical
      @click="onClick"
    />
    <p>自定义样式</p>
    <TextScroll
      :scroll-text="scrollText"
      :board-style="{ backgroundColor: '#e6f4ff', borderRadius: '12px' }"
      :text-style="{ fontSize: '28px', color: '#FF9800' }"
      :gap="30"
      :height="80"
      @click="onClick"
    />
    <p>------------------------------------------文字滚动配置器--------------------------------------------------</p>
    <el-row :gutter="20">
      <el-col :span="6">
        height:
        <el-slider v-model="state.height" :min="6" :max="180" />
      </el-col>
      <el-col :span="6">
        fontSize:
        <el-slider v-model="state.fontSize" :min="6" :max="180" />
      </el-col>
      <el-col :span="6">
        fontWeight:
        <ElInputNumber v-model="state.fontWeight" :step="100" :min="100" :max="1000" />
      </el-col>
      <el-col :span="6">
        color:
        <ElInput v-model="state.color" placeholder="color" />
      </el-col>
      <el-col :span="6">
        backgroundColor:
        <ElInput v-model="state.backgroundColor" placeholder="backgroundColor" />
      </el-col>
      <el-col :span="6">
        amount:
        <ElSlider v-model="state.amount" :min="1" :max="scrollText.length" />
      </el-col>
      <el-col :span="6">
        gap:
        <ElSlider v-model="state.gap" :min="10" :max="100" />
      </el-col>
      <el-col :span="6">
        interval:
        <ElSlider v-model="state.interval" :min="5" :max="100" />
      </el-col>
      <el-col :span="6">
        step:
        <ElSlider v-model="state.step" :min="0.1" :step="0.1" :max="20" />
      </el-col>
      <el-col :span="6">
        vertical:
        <ElSwitch v-model="state.vertical" />
      </el-col>
      <el-col :span="6">
        verticalInterval:
        <ElSlider v-model="state.verticalInterval" :min="1000" :step="100" :max="10000" />
      </el-col>
    </el-row>
    <TextScroll
      class="mt30"
      :scroll-text="scrollText"
      :single="state.single"
      :height="state.height"
      :board-style="{
        backgroundColor: state.backgroundColor,
      }"
      :text-style="{
        fontSize: `${state.fontSize}px`,
        fontWeight: state.fontWeight,
        color: state.color,
      }"
      :amount="state.amount"
      :gap="state.gap"
      :interval="state.interval"
      :step="state.step"
      :vertical="state.vertical"
      :vertical-interval="state.verticalInterval"
      @click="onClick"
    />
  </el-main>
</template>
