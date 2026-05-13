<template>
    <div class="top_header flex items-center justify-between p-3 bg-blue-500 text-lg text-white">
        <div class="left_logo">
            <el-icon>
                <Mouse />
            </el-icon>鼠标系统
        </div>
        <el-dropdown>
            <span class="el-dropdown-link text-white">
                用户名 <el-icon>
                    <CaretBottom />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>