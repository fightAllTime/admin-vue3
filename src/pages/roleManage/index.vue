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
                    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :total="total"
                        :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper" />
                </div>
            </el-main>
        </el-container>

        <RoleAdd v-model="visible" :initial="currentRow" @on-click="addProps"></RoleAdd>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import type { RoleRow } from './api';
// 引入新增/编辑角色页面
import RoleAdd from './RoleAdd.vue'
import type { FormInstance } from 'element-plus';

// 表格数据进行computed时的判断依据
const keyWord = ref<string>('')
// 查询表单的关联字段
const form = reactive<{ searchData: string }>({
    searchData: ''
})
// 表单ref
const roleManageFormRef = ref<FormInstance>()

// 遍历一百个数据
const data = new Array(100).fill(0).map((_, index) => ({
    roleId: Date.now() + index,
    roleCode: Math.floor(Math.random() * 1000),
    roleName: `这是第${index}个角色`,
    status: index % 2 === 0
}))

//给数据进行双向数据绑定
const allManagers = reactive<RoleRow[]>(data)

// 分页（当前页数、每页数据数量）
const pageNum = ref<number>(1)
const pageSize = ref<number>(10)

// 总数
const total = computed(() => {
    return allManagers.filter(m => m.roleName.includes(keyWord.value)).length
})

// 表单渲染的数据，computed自动计算
const tableData = computed(() => {
    //查询时过滤
    const filteredData = allManagers.filter((m: RoleRow) =>
        m.roleName.includes(keyWord.value)
    )
    // 分页
    const start = (pageNum.value - 1) * pageSize.value
    return filteredData.slice(start, start + pageSize.value)
})

//弹窗是否显示
const visible = ref<boolean>(false)
//当前行的数据 
const currentRow = ref<RoleRow | null>(null)

//新增数据，当前行没有值，调整弹窗显示
const addTableData = () => {
    currentRow.value = null
    visible.value = true
}

// 调取emit的方法
const addProps = (row: RoleRow) => {
    // 如果传回来的数据携带roleId，则证明是编辑
    if (row.roleId) {
        const idx = allManagers.findIndex(m => m.roleId === row.roleId)
        allManagers[idx] = { ...allManagers[idx], ...row }
    } else {
        // 否则为新增
        allManagers.push({
            ...row,
            roleId: Date.now() + allManagers.length,
            roleCode: Math.floor(Math.random() * 1000)
        })
    }
}

// 查询 
const doSearch = () => {
    keyWord.value = form.searchData
}

// 重置
const doReset = () => {
    roleManageFormRef.value?.resetFields()
    keyWord.value = ''
}

//表格行编辑
const doEdit = (row: RoleRow) => {
    currentRow.value = row
    visible.value = true
}

//改变状态
const changeRowstatus = (row: RoleRow) => {
    allManagers[allManagers.findIndex(m => m.roleId === row.roleId)].status = !row.status
}

// 删除表格行
const doDeleteRow = (row: RoleRow) => {
    const start = allManagers.findIndex(m => m.roleId === row.roleId)
    allManagers.splice(start, 1)
}
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
}
</style>