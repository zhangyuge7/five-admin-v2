<!-- 页面展示，不是组件展示，不涉及封装组件 -->
<script setup>
import * as echarts from 'echarts'
import { onMounted, reactive } from 'vue'

defineOptions({ name: 'Workbench' })
const state = reactive({
  tableLoading: false,
  hotProductList: [],
  apps: [
    { name: '发货助手' },
    { name: '店铺监控' },
    { name: '所有订单' },
    { name: '更多应用' },
  ],
})
const methods = {
  initChar() {
    const list = [
      { name: '02-11', value1: 200, value2: 100, value3: 231, value4: 13 },
      { name: '02-12', value1: 210, value2: 100, value3: 100, value4: 20 },
      { name: '02-13', value1: 200, value2: 120, value3: 131, value4: 4 },
      { name: '02-14', value1: 130, value2: 110, value3: 31, value4: 8 },
      { name: '02-15', value1: 300, value2: 80, value3: 12, value4: 1 },
      { name: '02-16', value1: 200, value2: 60, value3: 31, value4: 69 },
      { name: '02-17', value1: 100, value2: 100, value3: 81, value4: 23 },
    ]
    const char1 = echarts.init(document.getElementById('char1'))
    const option = {
      grid: {
        top: '20%',
        left: '2%',
        right: '2%',
        bottom: '2%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: [{
        top: 'top',
        left: 'center',
        data: ['订单', '完成', '取消', '差评'],
        itemWidth: 15,
        itemHeight: 10,
        itemGap: 15,
        borderRadius: 4,
      }],
      xAxis: {
        type: 'category',
        data: list.map(item => item.name),

      },
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '订单',
          type: 'line',
          data: list.map(item => item.value1),
        },
        {
          name: '完成',
          type: 'line',
          data: list.map(item => item.value2),
        },
        {
          name: '取消',
          type: 'line',
          data: list.map(item => item.value3),
        },
        {
          name: '差评',
          type: 'line',
          data: list.map(item => item.value4),
        },
      ],
    }
    char1.setOption(option)
  },
  initHotProductList() {
    state.tableLoading = true
    setTimeout(() => {
      state.hotProductList = [
        { title: '震震果实', store: '娜美的黑店', exposure: 5000, price: 89.8, mSales: 80 },
        { title: '橡胶果实', store: '娜美的黑店', exposure: 5000, price: 89.8, mSales: 80 },
        { title: '香香果实', store: '娜美的黑店', exposure: 5000, price: 89.8, mSales: 80 },
        { title: '分裂果实', store: '娜美的黑店', exposure: 5000, price: 89.8, mSales: 80 },
        { title: '香克斯的左手', store: '娜美的黑店', exposure: 5000, price: 89.8, mSales: 80 },
        { title: '宾克斯的美酒', store: '娜美的黑店', exposure: 5000, price: 89.8, mSales: 80 },
      ]
      state.tableLoading = false
    }, 1000)
  },
}
onMounted(() => {
  methods.initChar()
  methods.initHotProductList()
})
</script>

<template>
  <el-main>
    <div class="flex justify-between">
      <div class="box-item">
        <div style="background: linear-gradient(to right, #1ed4a4, #8cffc8);">
          <span>150</span>
          <span>全部商品</span>
        </div>
      </div>
      <div class="box-item">
        <div style="background: linear-gradient(to right, #f7917e, #fcb3b3);">
          <span>300</span>
          <span>全部库存</span>
        </div>
      </div>
      <div class="box-item">
        <div style="background: linear-gradient(to right, #eea237, #ffca8b);">
          <span>120</span>
          <span>采购订单</span>
        </div>
      </div>
      <div class="box-item">
        <div style="background: linear-gradient(to right, #4d88ff, #8db3ff);">
          <span>100</span>
          <span>待采购订单</span>
        </div>
      </div>
    </div>
    <el-card shadow="always" body-class="h-[35vh]" class="mt-5">
      <div id="char1" class="w-full h-full" />
    </el-card>

    <el-row :gutter="20" class=" mt-5">
      <el-col :span="18" :offset="0">
        <el-card shadow="always">
          <template #header>
            <div class="flex justify-between">
              <span>火爆竞品</span>
              <el-button type="primary" link>
                更多>>
              </el-button>
            </div>
          </template>
          <el-table v-loading="state.tableLoading" :data="state.hotProductList" style="width: 100%">
            <el-table-column type="index" label="序号" width="60" />
            <el-table-column prop="title" label="商品标题" show-overflow-tooltip width="280" />
            <el-table-column prop="store" label="所属店铺" />
            <el-table-column prop="exposure" label="曝光量" align="right" />
            <el-table-column prop="price" label="价格(￥)" align="right" />
            <el-table-column prop="mSales" label="月销量" align="right" />
            <el-table-column label="操作" align="center">
              <template #default>
                <el-button type="primary" link size="small">
                  对比
                </el-button>
                <el-button type="primary" link size="small">
                  详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="0">
        <el-card shadow="always">
          <template #header>
            <span>工具</span>
          </template>
          <div v-for="item in state.apps" :key="item.name" class="apps-box-item">
            <span>{{ item.name }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<style scoped>
.apps-box-item{
  @apply
  w-[100px] h-[100px]  float-left rounded-lg cursor-pointer m-2 flex justify-center items-center
  border-2
  hover:border-4
}
.box-item {
  @apply flex-grow pl-3 pr-3 h-[20vh]
}

.box-item>div {
  @apply w-full h-full rounded-lg flex flex-col justify-center items-center shadow-xl cursor-pointer
}

.box-item>div:hover {
  @apply scale-105
}

.box-item>div {
  font-size: 18px;
  font-weight: 800;
  color: #fff;
}
</style>
