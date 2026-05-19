<template>
    <div class="common-layout">
        <el-container>
            <el-header>角色管理</el-header>
            <el-main>
                <el-form ref="roleManageFormRef" inline :model="form">
                    <el-form-item>
                        <el-input v-model="form.searchData" placeholder="请输入角色名" @keyup.enter="doSearch" />
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="doSearch">查询</el-button>
                        <el-button @click="doReset()">重置</el-button>
                        <el-button @click="addTableData">新建角色</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="roleName" label="角色名" />
                    <el-table-column prop="status" label="状态">
                        <template #default='{ row }'>
                            <el-tag :type="row.status ? 'primary' : 'danger'">{{
                                row.status ? '启用' : '禁用' }}</el-tag>

                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="260">
                        <template #default="{ row }">
                            <el-button @click="doEdit(row)">编辑</el-button>
                            <el-button :type="row.status ? 'danger' : 'primary'" link @click="changeRowstatus(row)">{{
                                row.status ? '禁用' : '启用' }}</el-button>
                            <el-button type="danger" link @click="doDeleteRow(row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="pagination">
                    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total"
                        :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper" />
                </div>
            </el-main>
        </el-container>

        <RoleAdd v-model="visible" :initial="currentRow" @on-click="addProps"></RoleAdd>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus';
// 引入类型
import type { RoleRow } from './api';
// 引入 composable
import useRoleCrud from '@/hooks/useGenericCom'
// 引入新增/编辑角色页面
import RoleAdd from './RoleAdd.vue'

// 查询表单的关联字段
const form = reactive<{ searchData: string }>({
    searchData: ''
})
// 表单ref
const roleManageFormRef = ref<FormInstance>()

// 遍历一百个数据
const data: RoleRow[] = new Array(100).fill(0).map((_, index) => ({
    roleId: Date.now() + index,
    roleCode: Math.floor(Math.random() * 1000),
    roleName: `这是第${index}个角色`,
    status: index % 2 === 0
}))

// 引入useRoleCrud
const { currentPage, pageSize, initData, visible, currentRow, total, tableData, setKeyword, setCurrentRow, saveRow, doDeleteRow } = useRoleCrud(data, 'roleId')

//新增数据，当前行没有值，调整弹窗显示
const addTableData = () => {
    setCurrentRow(null)
    visible.value = true
}

// 调取emit的方法
const addProps = (row: RoleRow) => {
    saveRow(row)
}

// 查询 
const doSearch = () => {
    setKeyword(form.searchData)
}

// 重置
const doReset = () => {
    roleManageFormRef.value?.resetFields()
    setKeyword('')
}

//表格行编辑
const doEdit = (row: RoleRow) => {
    setCurrentRow(row)
    visible.value = true
}

//改变状态
const changeRowstatus = (row: RoleRow) => {
    initData[initData.findIndex(m => m.roleId === row.roleId)].status = !row.status
}


</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
}
</style>