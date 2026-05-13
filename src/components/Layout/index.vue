<template>
    <div class="common-layout">
        <el-container>
            <el-header class="header">
                <Header></Header>
            </el-header>
            <el-container>
                <el-aside class="sidebar">
                    <AsideMenu></AsideMenu>
                </el-aside>
                <el-main class="main">
                    <el-breadcrumb class="breadcrumb" separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">
                            首页
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            {{ $route.meta.title }}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-card class="page-card" shadow="hover">
                        <router-view />
                    </el-card>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script setup lang="ts">
import Header from './Header/index.vue'
import AsideMenu from './Aside/index.vue'
import '@/assets/css/main.css'
</script>

<style scoped>
.sidebar {
    width: 160px;
    background: #fff;
    border-right: 1px solid #e8e8e8;
}

.header {
    padding: 0;
}

.main {
    background: #f5f7fa;
    padding: 0 10px 0;
}

.breadcrumb {
    padding: 5px 0 10px;
}

.page-card {
    min-height: calc(100vh - 100px);
}
</style>
