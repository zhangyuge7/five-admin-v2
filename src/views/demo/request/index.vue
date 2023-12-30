<script setup>
import axios from '@/utils/axios'

function successRequest(successMsgType) {
  axios.get('/demo/successRequest', { successMsgType })
}

function errorRequest(errorMsgType) {
  axios.get('/demo/errorRequest', { errorMsgType })
}

function request500() {
  axios.get('/demo/request500')
}

function postRequest() {
  axios.post('/demo/postRequest', {}, { successMsgType: 'msg' })
}
</script>

<template>
  <el-button @click="successRequest">
    成功请求(默认不提示)
  </el-button>
  <el-button @click="successRequest('msg')">
    成功请求(msg)
  </el-button>
  <el-button @click="successRequest('box')">
    成功请求(box)
  </el-button>

  <el-button @click="errorRequest">
    错误请求(默认(msg))
  </el-button>
  <el-button @click="errorRequest('none')">
    错误请求(不提示)
  </el-button>
  <el-button @click="errorRequest('msg')">
    错误请求(msg)
  </el-button>
  <el-button @click="errorRequest('box')">
    错误请求(box)
  </el-button>

  <el-button @click="request500">
    500请求
  </el-button>

  <el-button @click="postRequest">
    post请求
  </el-button>
</template>
