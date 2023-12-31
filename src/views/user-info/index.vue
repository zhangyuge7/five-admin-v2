<script setup>
defineOptions({ name: 'UserInfo' })
const tableData = [
  { type: '登陆', ip: '127.0.0.1', addr: '东营', isOk: '成功' },
  { type: '登出', ip: '127.0.0.1', addr: '东营', isOk: '成功' },
  { type: '登陆', ip: '127.0.0.1', addr: '东营', isOk: '成功' },
  { type: '登陆', ip: '127.0.0.1', addr: '东营', isOk: '失败' },
  { type: '登陆', ip: '127.0.0.1', addr: '东营', isOk: '成功' },
  { type: '登出', ip: '127.0.0.1', addr: '东营', isOk: '成功' },
  { type: '登陆', ip: '127.0.0.1', addr: '东营', isOk: '成功' },
  { type: '登陆', ip: '127.0.0.1', addr: '东营', isOk: '成功' },
]
const columns = [
  { label: '类型', id: 'type', width: 'auto' },
  { label: 'IP', id: 'ip', width: 'auto' },
  { label: '地址', id: 'addr', width: 'auto' },
  { label: '状态', id: 'isOk', width: 'auto' },
]
</script>

<template>
  <el-main style="height: 100%;">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="never">
          <template #header>
            <div>
              <span>基本信息</span>
            </div>
          </template>
          <div>
            <p class=" flex items-center">
              <el-avatar :size="50" src="https://tse1-mm.cn.bing.net/th/id/OIP-C.jRmS7Hl4Q6YTW-sRDVqY7AAAAA?w=197&h=197&c=7&r=0&o=5&pid=1.7" />
              <span class=" ml-2">路飞</span>
            </p>
            <p class="mt-2">
              <span>角色：</span>
              <span>海贼</span>
            </p>
            <p class="mt-2">
              <span>组织机构：</span>
              <span>草帽海贼团</span>
            </p>
            <p class="mt-2">
              <span>职务：</span>
              <span>船长</span>
            </p>
            <p class="mt-2">
              <span>个人简介：</span>
              <span>海贼王是大海之中最自由的人</span>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :offset="0">
        <el-card shadow="never">
          <template #header>
            <div>
              <span>登陆记录</span>
            </div>
          </template>
          <el-table :data="tableData" border stripe>
            <el-table-column type="index" width="50" />
            <el-table-column
              v-for="col in columns"
              :key="col.id"
              :prop="col.id"
              :label="col.label"
              :width="col.width"
            />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>
