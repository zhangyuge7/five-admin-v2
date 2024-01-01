<script setup>
import { reactive } from 'vue'

defineOptions({ name: 'SystemUser' })
const columns = [
  { id: 'userName', label: '用户名' },
  { id: 'nickName', label: '昵称' },
  { id: 'sort', label: '排序' },
  { id: 'describe', label: '描述' },
]

const state = reactive({
  form: {
    userName: '',
    nickName: '',
  },
  tableData: [
    { userName: 'user1', nickName: '用户昵称1', sort: 1, describe: 'FiveAdmin页面示例' },
    { userName: 'user2', nickName: '用户昵称2', sort: 2, describe: 'FiveAdmin页面示例' },
    { userName: 'user3', nickName: '用户昵称3', sort: 3, describe: 'FiveAdmin页面示例' },
    { userName: 'user4', nickName: '用户昵称4', sort: 4, describe: 'FiveAdmin页面示例' },
    { userName: 'user5', nickName: '用户昵称5', sort: 5, describe: 'FiveAdmin页面示例' },
    { userName: 'user6', nickName: '用户昵称6', sort: 6, describe: 'FiveAdmin页面示例' },
    { userName: 'user7', nickName: '用户昵称7', sort: 7, describe: 'FiveAdmin页面示例' },
    { userName: 'user8', nickName: '用户昵称8', sort: 8, describe: 'FiveAdmin页面示例' },
    { userName: 'user9', nickName: '用户昵称9', sort: 9, describe: 'FiveAdmin页面示例' },
    { userName: 'user10', nickName: '用户昵称10', sort: 10, describe: 'FiveAdmin页面示例' },
  ],
})
</script>

<template>
  <el-main>
    <el-card shadow="never">
      <el-form inline>
        <el-form-item label="用户名称：">
          <el-input v-model="state.form.userName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="用户编码：">
          <el-input v-model="state.form.nickName" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            查询
          </el-button>
          <el-button type="success">
            新增
          </el-button>
          <el-button type="warning">
            导出
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never" class="mt-5">
      <el-table :data="state.tableData" border stripe>
        <el-table-column type="index" width="50" />
        <el-table-column
          v-for="col in columns"
          :key="col.id"
          :prop="col.id"
          :label="col.label"
          :width="col.width"
        />

        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default>
            <el-button type="primary" size="small" link>
              查看
            </el-button>
            <el-button type="primary" size="small" link>
              修改
            </el-button>
            <el-button type="primary" size="small" link>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-main>
</template>
