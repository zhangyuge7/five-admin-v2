<script setup>
import { reactive } from 'vue'

defineOptions({ name: 'SystemMenu' })
const columns = [
  { id: 'menuName', label: '菜单名称' },
  { id: 'sort', label: '排序' },
  { id: 'path', label: '访问路径' },
  { id: 'describe', label: '描述' },
]

const state = reactive({
  form: {
    menuName: '',
    path: '',
  },
  tableData: [
    { menuName: '首页1', path: '/home1', sort: 1, describe: 'FiveAdmin页面示例' },
    { menuName: '首页2', path: '/home2', sort: 2, describe: 'FiveAdmin页面示例' },
    { menuName: '首页3', path: '/home3', sort: 3, describe: 'FiveAdmin页面示例' },
    { menuName: '首页4', path: '/home4', sort: 4, describe: 'FiveAdmin页面示例' },
    { menuName: '首页5', path: '/home5', sort: 5, describe: 'FiveAdmin页面示例' },
    { menuName: '首页6', path: '/home6', sort: 6, describe: 'FiveAdmin页面示例' },
    { menuName: '首页7', path: '/home7', sort: 7, describe: 'FiveAdmin页面示例' },
    { menuName: '首页8', path: '/home8', sort: 8, describe: 'FiveAdmin页面示例' },
    { menuName: '首页9', path: '/home9', sort: 9, describe: 'FiveAdmin页面示例' },
    { menuName: '首页10', path: '/home10', sort: 10, describe: 'FiveAdmin页面示例' },
  ],
})
</script>

<template>
  <el-main>
    <el-card shadow="never">
      <el-form inline>
        <el-form-item label="菜单名称：">
          <el-input v-model="state.form.menuName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="路径：">
          <el-input v-model="state.form.path" placeholder="请输入" />
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
