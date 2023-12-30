<script setup>
import useAuth from '@/hooks/useAuth'

const { hasRole, hasRoleAll, hasPerm, hasPermAll, userInfo } = useAuth()
const roles = userInfo.roles
const prems = userInfo.perms
</script>

<template>
  <div class=" p-5">
    <p>支持字符串通配符匹配校验</p>
    <p> ? 字符匹配任何单个字符。</p>
    <p>* 字符匹配任何字符序列。</p>
    <el-button v-hasRole="'*'" type="primary">
      *角色可见（所有角色）
    </el-button>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <el-divider>根据角色判断权限</el-divider>
        <span>当前角色 {{ roles }}</span>
        <p>指令方式</p>
        <el-button v-hasRole="'admin'" type="primary">
          admin角色可见
        </el-button>
        <el-button v-hasRole="'test'" type="primary">
          test角色可见
        </el-button>
        <el-button v-hasRole="['admin', 'test']" type="warning">
          'admin'或'test'角色可见
        </el-button>
        <el-button v-hasRole:all="['admin', 'admin1']" type="success">
          'admin'并'admin1'角色可见
        </el-button>
        <el-divider />
        <p>函数方式</p>
        <el-button v-if="hasRole('admin')" type="primary">
          admin角色可见
        </el-button>
        <el-button v-if="hasRole('test')" type="primary">
          test角色可见
        </el-button>
        <el-button v-if="hasRole(['admin', 'test'])" type="warning">
          'admin'或'test'角色可见
        </el-button>
        <el-button v-if="hasRoleAll(['admin', 'admin1'])" type="success">
          'admin'并'admin1'角色可见
        </el-button>

        <el-divider>根据权限标识符判断权限</el-divider>
        <span>当前拥有权限标识符 {{ prems }}</span>
        <p>指令方式</p>
        <el-button v-hasPerm="'admin:button'" type="primary">
          admin:button可见
        </el-button>
        <el-button v-hasPerm="'test:button'" type="primary">
          test:button可见
        </el-button>
        <el-button v-hasPerm="['admin:button', 'test:button']" type="warning">
          拥有'admin:button'或'test:button'可见
        </el-button>
        <el-button v-hasPerm:all="['admin:button', 'admin1:button']" type="success">
          拥有'admin:button'并'admin1:button'可见
        </el-button>

        <p>函数方式</p>
        <el-button v-if="hasPerm('admin:button')" type="primary">
          拥有 admin:button 标识符可见
        </el-button>
        <el-button v-if="hasPerm('test:button')" type="primary">
          拥有 test:button 标识符可见
        </el-button>
        <el-button v-if="hasPerm(['admin:button', 'test:button'])" type="warning">
          拥有'admin:button'或'test:button'可见
        </el-button>
        <el-button v-if="hasPermAll(['admin:button', 'admin1:button'])" type="success">
          拥有'admin:button'并'admin1:button'可见
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>
