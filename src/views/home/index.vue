<script setup name="Home">
import packagejson from '/package.json'
import { shallowRef } from 'vue'

const dependencies = shallowRef([])
const devDependencies = shallowRef([])

Object.keys(packagejson.dependencies).forEach((key) => {
  dependencies.value.push({
    name: key,
    version: packagejson.dependencies[key],
  })
})

Object.keys(packagejson.devDependencies).forEach((key) => {
  devDependencies.value.push({
    name: key,
    version: packagejson.devDependencies[key],
  })
})
</script>

<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="10" :offset="0">
          <el-card shadow="never">
            <template #header>
              简介
            </template>
            <p>
              项目基于 FiveAdmin 重构。
            </p>
            <p>
              使用技术栈 JavaScript、Vue3、Vite4、Pinia、ElementPlus、Tailwindcss 等。
              为开发后台管理系统提供开箱即用的解决方案，使开发者可以轻松构建功能齐全的管理系统界面。
              使用 FiveAdminV2，开发者可以通过简单的配置，快速搭建后台管理系统，提高开发效率。
            </p>
            <br>
            <p>
              使用过程中如果有好的建议，欢迎指教。
            </p>
          </el-card>
        </el-col>
        <el-col :span="14" :offset="0">
          <el-card shadow="never">
            <template #header>
              <div>
                <span>相关依赖</span>
              </div>
            </template>
            <el-row :gutter="20">
              <el-col :span="12" :offset="0">
                <ul>
                  <li style="margin-bottom: 20px;font-size: 20px;">
                    <strong>dependencies</strong>
                  </li>
                  <li v-for="item, index in dependencies" :key="index">
                    <span>{{ item.name }}</span>
                    <span class=" ml-5">{{ item.version }}</span>
                  </li>
                </ul>
              </el-col>
              <el-col :span="12" :offset="0">
                <ul>
                  <li style="margin-bottom: 20px;font-size: 20px;">
                    <strong>devDependencies</strong>
                  </li>
                  <li v-for="item, index in devDependencies" :key="index">
                    <span>{{ item.name }}</span>
                    <span class=" ml-5">{{ item.version }}</span>
                  </li>
                </ul>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
