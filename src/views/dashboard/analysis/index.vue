<!-- 页面展示，不是组件展示，不涉及封装组件 -->
<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'

const methods = {
  initChar1() {
    const list = [
      { name: '1月', value1: 200, value2: 280 },
      { name: '2月', value1: 300, value2: 80 },
      { name: '4月', value1: 150, value2: 380 },
      { name: '5月', value1: 260, value2: 100 },
      { name: '6月', value1: 400, value2: 280 },
      { name: '7月', value1: 300, value2: 80 },
      { name: '8月', value1: 500, value2: 100 },
      { name: '9月', value1: 180, value2: 200 },
      { name: '10月', value1: 260, value2: 150 },
      { name: '11月', value1: 100, value2: 110 },
      { name: '12月', value1: 290, value2: 380 },
    ]
    const chartDom = document.getElementById('char1')
    const myChart = echarts.init(chartDom)

    const option = {
      title: {
        text: '模型数量每月增长趋势',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: ['2023年', '2024年'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: list.map(item => item.name),
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '2023年',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: list.map(item => item.value1),
        },
        {
          name: '2024年',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: list.map(item => item.value2),
        },
      ],
    }

    option && myChart.setOption(option)
  },
  initChar2() {
    const list = [
      { name: '分类模型', value: 320 },
      { name: '回归模型', value: 120 },
      { name: '预测模型', value: 520 },
      { name: '聚类模型', value: 300 },
      { name: '其他模型', value: 100 },
    ]
    const chartDom = document.getElementById('char2')
    const myChart = echarts.init(chartDom)
    const option = {
      title: {
        text: '各类模型占比',
      },
      tooltip: {
        trigger: 'item',
      },

      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'center',
      },
      series: [
        {
          type: 'pie',
          data: list,
          label: {
            formatter: '{d}%',
          },
        },
      ],
    }

    option && myChart.setOption(option)
  },
  initChar3() {
    const list = [
      { name: '自学习', value: 320 },
      { name: '实时预估', value: 120 },
      { name: '批量预估', value: 520 },
      { name: '其他', value: 300 },
    ]
    const chartDom = document.getElementById('char3')
    const myChart = echarts.init(chartDom)
    const option = {
      title: {
        text: '模型应用分布',
      },
      tooltip: {
        trigger: 'item',
      },

      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'center',
      },
      series: [
        {
          type: 'pie',
          data: list,
          label: {
            formatter: '{d}%',
          },
        },
      ],
    }

    option && myChart.setOption(option)
  },
  initChars() {
    methods.initChar1()
    methods.initChar2()
    methods.initChar3()
  },
}
onMounted(() => {
  methods.initChars()
})
</script>

<template>
  <el-main class="h-full ">
    <div class="h-full flex justify-between">
      <div class="w-[74%] flex flex-col flex-shrink-0 justify-between">
        <el-card id="char1" class="h-[59%] flex-shrink-0" />
        <div class="h-[38%] flex-shrink-0 flex justify-between">
          <el-card id="char2" class="w-[49%]" />
          <el-card id="char3" class="w-[49%]" />
        </div>
      </div>
      <el-card class="w-[24%] flex-shrink-0 " body-class="flex flex-col h-full">
        <p class=" dark:text-[#464646]" style="font-size: 18px;font-weight: 800;">
          重要指标情况分析
        </p>
        <div id="char4" class="flex-grow flex-shrink-0 flex justify-center items-center">
          <el-progress type="circle" :percentage="83" :stroke-width="15">
            <template #default="{ percentage } ">
              <div class="flex justify-center items-center flex-col">
                <p style="font-size: 20px;color: var(--el-color-primary);font-weight: 800;">
                  {{ `${percentage}%` }}
                </p>
                <p style="font-size: 12px;margin-top: 5px;color: var(--el-color-primary);">
                  使用率
                </p>
              </div>
            </template>
          </el-progress>
        </div>
        <div class="flex-grow flex-shrink-0  flex justify-center items-center">
          <el-progress type="circle" :percentage="100" status="success" :stroke-width="15">
            <template #default="{ percentage } ">
              <div class="flex justify-center items-center flex-col">
                <p style="font-size: 20px;font-weight: 800;">
                  {{ `${percentage}%` }}
                </p>
                <p style="font-size: 12px;margin-top: 5px;">
                  准确率
                </p>
              </div>
            </template>
          </el-progress>
        </div>
        <div class="flex-grow flex-shrink-0  flex justify-center items-center">
          <el-progress type="circle" :percentage="30" status="warning" :stroke-width="15">
            <template #default="{ percentage } ">
              <div class="flex justify-center items-center flex-col">
                <p style="font-size: 20px;font-weight: 800;">
                  {{ `${percentage}%` }}
                </p>
                <p style="font-size: 12px;margin-top: 5px;">
                  完成率
                </p>
              </div>
            </template>
          </el-progress>
        </div>
      </el-card>
    </div>
  </el-main>
</template>
