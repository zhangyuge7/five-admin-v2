<script setup>
/**
 * 组件描述：滚动文字组件
 * 特别感谢：vue-amazing-ui
 * https://themusecatcher.github.io/vue-amazing-ui/guide/components/textscroll.html
 * 源码来自vue-amazing-ui， 改动：TS -> JS
 */
import { computed, ref, watch } from 'vue'
import { cancelRaf, rafTimeout, useResizeObserver } from '@/utils/textScrollUtil.js'

const props = defineProps({
  // 滚动文字数组，single 为 true 时，类型为 Text；多条文字滚动时，数组长度必须大于等于 amount 才能滚动
  scrollText: {
    type: [Array, Object],
    default: () => [],
  },
  // 是否启用单条文字滚动效果，只支持水平文字滚动，为 true 时，amount 自动设为 1
  single: {
    type: Boolean,
    default: false,
  },
  // 滚动区域宽度，单位 px
  width: {
    type: [Number, String],
    default: '100%',
  },
  // 滚动区域高度，单位 px
  height: {
    type: [Number, String],
    default: 50,
  },
  // 滚动区域样式，优先级低于 width、height
  boardStyle: {
    type: Object,
    default: () => ({}),
  },
  // 滚动文字样式
  textStyle: {
    type: Object,
    default: () => ({}),
  },
  // 滚动区域展示条数，水平滚动时生效
  amount: {
    type: Number,
    default: 4,
  },
  // 水平滚动文字各列间距或垂直滚动文字两边的边距，单位 px
  gap: {
    type: Number,
    default: 20,
  },
  // 水平滚动动画执行时间间隔，单位 ms，水平滚动时生效
  interval: {
    type: Number,
    default: 10,
  },
  // 水平滚动动画每次执行时移动距离，单位 px，水平滚动时生效，与 interval 配合控制滚动速度
  step: {
    type: Number,
    default: 1,
  },
  // 是否垂直滚动
  vertical: {
    type: Boolean,
    default: false,
  },
  // 垂直文字滚动时间间隔，单位 ms，垂直滚动时生效
  verticalInterval: {
    type: Number,
    default: 3000,
  },
})
const emit = defineEmits(['click'])
const textData = computed(() => {
  if (props.single) {
    return [props.scrollText, props.scrollText]
  }
  else {
    const text = props.scrollText
    if (text.length === props.amount)
      return [...text, ...text]
    else
      return [...text]
  }
})
const textAmount = computed(() => {
  return textData.value.length || 0
})
const totalWidth = computed(() => {
  // 文字滚动区域总宽度
  if (typeof props.width === 'number')
    return `${props.width}px`
  else
    return props.width
})
const displayAmount = computed(() => {
  if (props.single)
    return 1
  else
    return props.amount
})
const horizontalRef = ref() // 水平滚动 DOM 引用
const verticalRef = ref() // 垂直滚动 DOM 引用
const left = ref(0)
const distance = ref(0) // 每条滚动文字移动距离
const horizontalMoveRaf = ref()
const verticalMoveRaf = ref()
const origin = ref(true) // 垂直滚动初始状态
watch(
  () => [
    textData,
    props.width,
    props.amount,
    props.gap,
    props.step,
    props.interval,
    props.vertical,
    props.verticalInterval,
  ],
  () => {
    initScroll()
  },
  {
    deep: true, // 强制转成深层侦听器
    flush: 'post',
  },
)
useResizeObserver([horizontalRef, verticalRef], () => {
  initScroll()
})
function initScroll() {
  if (!props.vertical)
    distance.value = getDistance() // 获取每列文字宽度
  else
    origin.value = true

  horizontalMoveRaf.value && cancelRaf(horizontalMoveRaf.value)
  verticalMoveRaf.value && cancelRaf(verticalMoveRaf.value)
  startMove() // 开始滚动
}
function getDistance() {
  return Number.parseFloat((horizontalRef.value.offsetWidth / displayAmount.value).toFixed(2))
}
function startMove() {
  if (props.vertical) {
    if (textAmount.value > 1) {
      verticalMoveRaf.value && cancelRaf(verticalMoveRaf.value)
      verticalMove() // 垂直滚动
    }
  }
  else {
    if (textAmount.value > displayAmount.value) {
      // 超过 amount 条开始滚动
      horizontalMoveRaf.value && cancelRaf(horizontalMoveRaf.value)
      horizonMove() // 水平滚动
    }
  }
}
function horizonMove() {
  horizontalMoveRaf.value = rafTimeout(
    () => {
      if (left.value >= distance.value) {
        textData.value.push(textData.value.shift()) // 将第一条数据放到最后
        left.value = 0
      }
      else {
        left.value += props.step // 每次移动step（px）
      }
    },
    props.interval,
    true,
  )
}
function stopMove() {
  // 暂停动画
  if (props.vertical)
    verticalMoveRaf.value && cancelRaf(verticalMoveRaf.value)
  else
    horizontalMoveRaf.value && cancelRaf(horizontalMoveRaf.value)
}
function onClick(text) {
  // 通知父组件点击的标题
  emit('click', text)
}
const activeIndex = ref(0)
function verticalMove() {
  verticalMoveRaf.value = rafTimeout(
    () => {
      if (origin.value)
        origin.value = false

      activeIndex.value = (activeIndex.value + 1) % textAmount.value
      verticalMove()
    },
    origin.value ? props.verticalInterval : props.verticalInterval + 1000,
  )
}
</script>

<template>
  <div
    v-if="!vertical"
    ref="horizontalRef"
    class="m-slider-horizontal"
    :style="[boardStyle, `--text-gap: ${gap}px; height: ${height}px; width: ${totalWidth};`]"
  >
    <div class="m-scroll-view" :style="`will-change: transform; transform: translateX(${-left}px);`">
      <a
        v-for="(text, index) in textData"
        :key="index"
        class="slide-text"
        :style="[textStyle, `width: ${distance}px;`]"
        :title="text.title"
        :href="text.link ? text.link : 'javascript:;'"
        :target="text.link ? '_blank' : '_self'"
        @mouseenter="stopMove"
        @mouseleave="startMove"
        @click="onClick(text)"
      >
        {{ text.title || '--' }}
      </a>
    </div>
  </div>
  <div
    v-else
    ref="verticalRef"
    class="m-slider-vertical"
    :style="[
      boardStyle,
      ` --enter-move: ${height}px; --leave-move: ${-height}px; --tex-gap: ${gap}px; height: ${height}px; width: ${totalWidth};`,
    ]"
  >
    <TransitionGroup name="slide">
      <div v-for="(text, index) in textData" v-show="activeIndex === index" :key="index" class="m-scroll-view">
        <a
          class="slide-text"
          :style="textStyle"
          :title="text.title"
          :href="text.link ? text.link : 'javascript:;'"
          :target="text.link ? '_blank' : '_self'"
          @mouseenter="stopMove"
          @mouseleave="startMove"
          @click="onClick(text)"
        >
          {{ text.title || '--' }}
        </a>
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
// 水平滚动
.m-slider-horizontal {
  overflow: hidden;
  box-shadow: 0px 0px 5px var(--el-box-shadow);
  border-radius: 6px;
  background-color: var(--el-bg-color);
  .m-scroll-view {
    height: 100%;
    display: inline-flex;
    align-items: center;
    .slide-text {
      padding-left: var(--text-gap);
      font-size: 16px;
      font-weight: 400;
      // color: rgba(0, 0, 0, 0.88);
      line-height: 1.57;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
}
// 垂直滚动
.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;
}
.slide-enter-from {
  transform: translateY(var(--enter-move)) scale(0.5);
  opacity: 0;
}
.slide-leave-to {
  transform: translateY(var(--leave-move)) scale(0.5);
  opacity: 0;
}
.m-slider-vertical {
  overflow: hidden;
  box-shadow: 0px 0px 5px var(--el-box-shadow);
  border-radius: 6px;
  background-color: var(--el-bg-color);
  position: relative;
  .m-scroll-view {
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 var(--tex-gap);
    .slide-text {
      font-size: 16px;
      font-weight: 400;
      // color: rgba(0, 0, 0, 0.88);
      line-height: 1.57;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
