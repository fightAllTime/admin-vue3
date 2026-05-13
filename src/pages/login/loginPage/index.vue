<template>
  <div class="login-page">
    <el-card class="login-box">
      <h2 class="mb-4">系统登录</h2>

      <el-form :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username" />
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" />
        </el-form-item>

        <el-button type="primary" @click="login">
          登录
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  username: '',
  password: ''
})

const login = () => {
  // 模拟登录成功
  localStorage.setItem('token', 'mock-token')
  router.push('/dashboard')
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-box {
  width: 400px;
}
</style>