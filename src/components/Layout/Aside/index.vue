<template>
    <div>
        <el-menu router :default-active="$route.path" class="asideMenu">
            <el-menu-item v-for="item in menuItems" :key="item.index" :index="item.index">
                <el-icon>
                    <component :is="item.icon" />
                </el-icon>
                <span>{{ item.name }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import {
    Document,
    House,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import type { Component } from 'vue'

interface MenuItem {
    index: string
    name: string
    icon: Component
}

const menuItems: MenuItem[] = [
    {
        index: '/dashboard',
        name: '仪表盘',
        icon: House
    },
    {
        index: '/users',
        name: '用户管理',
        icon: Document
    },
    {
        index: '/prommit',
        name: '权限管理',
        icon: Setting
    },
    {
        index: '/system',
        name: '系统设置',
        icon: Location
    }
]
</script>

<style scoped>
.asideMenu {
    border-right: 0
}
</style>