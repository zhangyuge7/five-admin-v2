<script setup>
import { ref } from 'vue'
import { ArrowDownBold, ArrowUpBold, SwitchButton, User } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/modules/app'
import { useUserStore } from '@/stores/modules/user'
import router from '@/router'

const userStore = useUserStore()

const { appConfig } = useAppStore()
const visible = ref(false)

// 下拉菜单指令
function command(flag) {
  // 退出登录
  if (flag === 'logout')
    userStore.logout()
  else if (flag === 'userinfo')
    router.push('/user-info')
}
</script>

<template>
  <div class="pl-5 pr-5 flex items-center">
    <el-dropdown :trigger="appConfig.trigger" @visible-change="visible = $event" @command="command">
      <span class="el-dropdown-link  text-[16px]">
        <el-avatar class="mr-3" :src="userStore.userInfo?.avatar || '/default-avatar.png'" />
        {{ userStore.userInfo?.nickName }}
        <el-icon class="el-icon--right ">
          <Transition name="scale" mode="out-in">
            <component :is="visible ? ArrowUpBold : ArrowDownBold" />
          </Transition>
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="userinfo">
            <el-icon>
              <User />
            </el-icon>
            <span>{{ $t("user.personalCenter") }}</span>
          </el-dropdown-item>
          <el-dropdown-item divided command="logout">
            <el-icon>
              <SwitchButton />
            </el-icon>
            <span>{{ $t("user.logout") }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.el-dropdown{
    color: inherit;
}
</style>
