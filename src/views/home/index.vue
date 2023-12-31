<script setup>
import packagejson from '/package.json'
import { shallowRef } from 'vue'

defineOptions({ name: 'Home' })
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
        <el-col :span="12" :offset="0">
          <el-card shadow="never">
            <template #header>
              简介
            </template>
            <h3>
              🚀 开箱即用的前端后台管理系统模板！基于 JavaScript、Vue3、Vite5、Pinia、ElementPlus、Tailwindcss 等技术栈开发，助力你快速开发业务功能，专注与业务开发！
            </h3>
            <br>
            <h3>
              🌟 强大的功能：
            </h3>
            <p>
              &emsp;支持现代化的路由管理和导航，方便快捷地定位页面。
            </p>
            <p>
              &emsp;模块化开发，可快速扩展和定制化，适应不同项目需求。
            </p>
            <p>
              &emsp;内置丰富的主题和布局，为你提供丰富多样的页面展示效果。
            </p>
            <p>
              &emsp;强大的数据管理与状态管理，采用 Pinia 提供可靠且高效的数据流管理。
            </p>
            <p>
              &emsp;基于 ElementPlus，提供美观、易用的组件库，方便快速搭建页面。
            </p>
            <p>
              &emsp;使用 Tailwindcss 作为 CSS 工具库，简化界面样式的开发与调整。
            </p>
            <br>
            <h3>
              👩‍💻 简化你的开发流程：
            </h3>
            <p>&emsp;利用 Vue3 进行开发，享受响应式的开发体验。</p>
            <p>&emsp;使用 Vite5 作为开发服务器，实现更快的热重载和开发效率。</p>
            <p>&emsp;使用 PNPM 管理依赖，保证项目的稳定性和可维护性的。</p>
            <br>
            <p>✨ 轻松上手，高效开发，无需花费大量时间和精力，通过简单的配置即可创建出精致的管理系统。</p>
            <p>
              💼 适用于各类企业内部管理系统、后台管理系统、数据管理系统等场景。
            </p>
          </el-card>
        </el-col>
        <el-col :span="12" :offset="0">
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
