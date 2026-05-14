<template>
    <div class="common-layout">
        <el-container>
            <el-header>用户管理主页面</el-header>

            <el-main>
                <el-form inline :model="form">
                    <el-form-item label="用户名">
                        <el-input v-model="form.searchData" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="doSearch">查询</el-button>
                        <el-button type="primary" @click="doReset">重置</el-button>
                        <el-button type="primary" @click="addRow">
                            新增用户
                        </el-button>
                    </el-form-item>
                </el-form>

                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="userId" label="ID" />
                    <el-table-column prop="userName" label="用户名" />
                    <el-table-column prop="email" label="邮箱" />
                    <el-table-column prop="character" label="角色" />
                    <el-table-column prop="status" label="状态">
                        <template #default="{ row }">
                            <el-tag v-if="row.status === 'on'" type="success">启用</el-tag>
                            <el-tag v-else type="danger">禁用</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="150">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="editRow(row)">
                                编辑
                            </el-button>
                            <el-button type="danger" link @click="confirmDelete(row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="pagination">
                    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :total="total"
                        :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper" />
                </div>
            </el-main>
        </el-container>
    </div>

    <UserAdd v-model="visible" :initial="currentRow" @on-click="addProps" />
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import UserAdd from './UserAdd.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

interface UserRow {
    userId?: string
    userName: string
    email: string
    character: string
    status: string
}

interface FormProps {
    searchData: string
}

const form = reactive<FormProps>({
    searchData: ''
})

const pageNum = ref(1)
const pageSize = ref(10)
const keyword = ref('')

const visible = ref(false)
const currentRow = ref<UserRow | null>(null)

const allUsers = reactive<UserRow[]>([
    {
        userId: '1',
        userName: 'admin',
        email: 'xxx',
        character: '超管',
        status: '启用'
    },
    {
        userId: '2',
        userName: 'admin1',
        email: 'xxx',
        character: '超管',
        status: '启用'
    }
])

const tableData = computed(() => {
    const filtered = allUsers.filter(u =>
        u.userName.includes(keyword.value)
    )
    const start = (pageNum.value - 1) * pageSize.value
    return filtered.slice(start, start + pageSize.value)
})

const total = computed(() =>
    allUsers.filter(u => u.userName.includes(keyword.value)).length
)

const doSearch = () => {
    keyword.value = form.searchData
    pageNum.value = 1
}

const doReset = () => {
    keyword.value = ''
    form.searchData = ''
    pageNum.value = 1
}

const addRow = () => {
    currentRow.value = null
    visible.value = true
}

const editRow = (row: UserRow) => {
    currentRow.value = row
    visible.value = true
}

const addProps = (form: UserRow) => {
    if (form.userId) {
        const idx = allUsers.findIndex(u => u.userId === form.userId)
        allUsers[idx] = form
    } else {
        allUsers.push({
            ...form,
            userId: Date.now().toString()
        })
    }
}

const confirmDelete = (row: UserRow) => {
    ElMessageBox.confirm(
        '确认删除该用户？',
        '重要操作警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        const idx = allUsers.findIndex(u => u.userId === row.userId)
        if (idx !== -1) {
            allUsers.splice(idx, 1)
        }
        ElMessage.success('已删除该用户')
    }).catch((error) => {
        ElMessage.success(error)
    })
}
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
}
</style>