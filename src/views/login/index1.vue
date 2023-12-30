<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useUserStore } from '@/stores/modules/user'

const title = import.meta.env.VITE_APP_TITLE
const useUser = useUserStore()

const formRef = ref()
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 16, message: '3 到 16 个字符长度', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 30, message: '6 到 30 个字符长度', trigger: 'blur' },
  ],
}
const form = reactive({
  username: 'admin',
  password: 'admin',
})
const loginLoading = ref(false)
function resetForm(formEl) {
  if (!formEl)
    return
  formEl.resetFields()
}
async function onSubmit(formEl) {
  if (!formEl)
    return
  await formEl.validate((valid) => {
    if (valid) {
      loginLoading.value = true
      doLogin()
    }
  })
}

async function doLogin() {
  await useUser.login({ ...form })
  loginLoading.value = false
}

function enterKey(event) {
  const code = event.keyCode
    ? event.keyCode
    : event.which
      ? event.which
      : event.charCode
  if (code === 13 && !loginLoading.value)
    onSubmit(formRef.value)
}
onMounted(() => {
  document.addEventListener('keyup', enterKey)
})
onUnmounted(() => {
  document.removeEventListener('keyup', enterKey)
})
</script>

<template>
  <div class="login-container">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header>
        <div>
          <span>{{ title }}</span>
        </div>
      </template>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loginLoading" type="primary" @click="onSubmit(formRef)">
            登录
          </el-button>
          <el-button @click="resetForm(formRef)">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
    @apply h-full w-full flex justify-center items-center
}
</style>
