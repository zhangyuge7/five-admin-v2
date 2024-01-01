<script setup>
import { reactive } from 'vue'

defineOptions({ name: 'SystemRole' })
const columns = [
  { id: 'roleName', label: '角色名称' },
  { id: 'roleCode', label: '角色编码' },
  { id: 'sort', label: '排序' },
  { id: 'describe', label: '描述' },
]

const state = reactive({
  form: {
    roleName: '',
    roleCode: '',
  },
  tableData: [
    { roleName: '角色1', roleCode: 'role1', sort: 1, describe: 'FiveAdmin页面示例' },
    { roleName: '角色2', roleCode: 'role2', sort: 2, describe: 'FiveAdmin页面示例' },
    { roleName: '角色3', roleCode: 'role3', sort: 3, describe: 'FiveAdmin页面示例' },
    { roleName: '角色4', roleCode: 'role4', sort: 4, describe: 'FiveAdmin页面示例' },
    { roleName: '角色5', roleCode: 'role5', sort: 5, describe: 'FiveAdmin页面示例' },
    { roleName: '角色6', roleCode: 'role6', sort: 6, describe: 'FiveAdmin页面示例' },
    { roleName: '角色7', roleCode: 'role7', sort: 7, describe: 'FiveAdmin页面示例' },
    { roleName: '角色8', roleCode: 'role8', sort: 8, describe: 'FiveAdmin页面示例' },
    { roleName: '角色9', roleCode: 'role9', sort: 9, describe: 'FiveAdmin页面示例' },
    { roleName: '角色10', roleCode: 'role10', sort: 10, describe: 'FiveAdmin页面示例' },
  ],
})
</script>

<template>
  <el-main>
    <el-card shadow="never">
      <el-form inline>
        <el-form-item label="角色名称：">
          <el-input v-model="state.form.roleName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="角色编码：">
          <el-input v-model="state.form.roleCode" placeholder="请输入" />
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
