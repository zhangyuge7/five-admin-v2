<script setup>
import { onMounted, onUnmounted, reactive } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import router from '@/router'

const useUser = useUserStore()

const state = reactive({
  loginLoading: false,
  form: {
    username: 'admin',
    password: 'admin',
  },
  passwordClass: 'owl',
})
const methods = {
  async onSubmit() {
    state.loginLoading = true
    try {
      await useUser.login({ ...state.form }, router.currentRoute.value.query.replace || '/')
    }
    catch (error) {

    }

    state.loginLoading = false
  },
  enterKey(event) {
    const code = event.keyCode
      ? event.keyCode
      : event.which
        ? event.which
        : event.charCode
    if (code === 13 && !state.loginLoading)
      methods.onSubmit()
  },
  onPasswordFocus() {
    state.passwordClass = 'owl password'
  },
  onPasswordBlur() {
    state.passwordClass = 'owl'
  },
}

onMounted(() => {
  document.addEventListener('keyup', methods.enterKey)
})
onUnmounted(() => {
  document.removeEventListener('keyup', methods.enterKey)
})
</script>

<template>
  <div class="login-body">
    <div class="login-box">
      <div id="owl" :class="state.passwordClass">
        <div class="hand" />
        <div class="hand hand-r" />
        <div class="arms">
          <div class="arm" />
          <div class="arm arm-r" />
        </div>
      </div>
      <form class="input-box">
        <input id="username" v-model="state.form.username" autocomplete="off" type="text" placeholder="账号">
        <input
          id="password"
          v-model="state.form.password" autocomplete="off" type="password" placeholder="密码" @focus="methods.onPasswordFocus"
          @blur="methods.onPasswordBlur"
        >
        <button v-loading="state.loginLoading" type="button" @click="methods.onSubmit">
          登录
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-body{
    /* 100%窗口高度 */
    height: 100%;
    width: 100%;
    /* 弹性布局 居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    /* 渐变背景 */
    background: linear-gradient(200deg,#72afd3,#96fbc4);
}
.login-box{
    /* 相对定位 */
    position: relative;
    width: 320px;
}
.input-box{
    /* 弹性布局 垂直排列 */
    display: flex;
    flex-direction: column;
}
.input-box input{
    height: 40px;
    border-radius: 3px;
    /* 缩进15像素 */
    text-indent: 15px;
    outline: none;
    border: none;
    margin-bottom: 15px;
}
.input-box input:focus{
    outline: 1px solid lightseagreen;
}
.input-box button{
    border: none;
    height: 45px;
    background-color: lightseagreen;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
}
/* 接下来是猫头鹰的样式 */
.owl{
    width: 211px;
    height: 108px;
    /* 背景图片 */
    background: url("/src/assets/images/pages/login-page/owl-login.png") no-repeat;
    /* 绝对定位 */
    position: absolute;
    top: -100px;
    /* 水平居中 */
    left: 50%;
    transform: translateX(-50%);
}
.owl .hand{
    width: 34px;
    height: 34px;
    border-radius: 40px;
    background-color: #472d20;
    /* 绝对定位 */
    position: absolute;
    left: 12px;
    bottom: -8px;
    /* 沿Y轴缩放0.6倍（压扁） */
    transform: scaleY(0.6);
    /* 动画过渡 */
    transition: 0.3s ease-out;
}
.owl .hand.hand-r{
    left: 170px;
}
.owl.password .hand{
    transform: translateX(42px) translateY(-15px) scale(0.7);
}
.owl.password .hand.hand-r{
    transform: translateX(-42px) translateY(-15px) scale(0.7);
}
.owl .arms{
    position: absolute;
    top: 58px;
    width: 100%;
    height: 41px;
    overflow: hidden;
}
.owl .arms .arm{
    width: 40px;
    height: 65px;
    position: absolute;
    left: 20px;
    top: 40px;
    background: url("/src/assets/images/pages/login-page/owl-login-arm.png") no-repeat;
    transform: rotate(-20deg);
    transition: 0.3s ease-out;
}
.owl .arms .arm.arm-r{
    transform: rotate(20deg) scaleX(-1);
    left: 158px;
}
.owl.password .arms .arm{
    transform: translateY(-40px) translateX(40px);
}
.owl.password .arms .arm.arm-r{
    transform: translateY(-40px) translateX(-40px) scaleX(-1);
}
</style>
