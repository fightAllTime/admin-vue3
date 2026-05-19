<template>
    <div>
        权限管理
        <el-button @click="editRow(null)">新增</el-button>
        <el-table :data="treeData" style="width: 100%" row-key="permissionId" border lazy
            :tree-props="{ children: 'children' }">
            <el-table-column prop="permissionName" label="permissionName" />
            <el-table-column prop="permissionType" label="permissionType">
                <template #default="{ row }">
                    <el-tag :type="getPermissionMeta(row.permissionType).type">{{
                        getPermissionMeta(row.permissionType).label }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="permissionCode" label="权限标识" />
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button @click="editRow(row)">编辑</el-button>
                    <el-button @click="deleteRow(row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <PermissionModal v-model="visible" :initial="currentRow" :treeData="treeData" @submit="doDialogEdit">
        </PermissionModal>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PermissionType, PermissionRow, PermissionNode } from './api';
import { permissionTypeMap } from './commonValue'
import PermissionModal from './PermissionModal.vue';
import { ElMessage } from 'element-plus';

const mockData: PermissionRow[] = [
    {
        permissionId: 'sys_root',
        permissionName: '权限管理',
        permissionCode: 'sys:root',
        permissionType: 'MENU',
        parentId: null,
        routePath: '/permission/permissionMain',
        component: 'PermissionMain.vue',
        icon: 'Permission',
        sortOrder: 0
    },
    {
        permissionId: 'sys_user',
        permissionName: '用户管理',
        permissionCode: 'sys:user',
        permissionType: 'MENU',
        parentId: 'sys_root',
        routePath: '/system/user',
        component: 'SystemUser.vue',
        icon: 'User',
        sortOrder: 1
    },
    {
        permissionId: 'sys_user_add',
        permissionName: '用户管理新增',
        permissionCode: 'sys:user:add',
        permissionType: 'BUTTON',
        parentId: 'sys_user',
        icon: 'Add',
        sortOrder: 2
    }
]

const buildTree = (list: PermissionRow[]): PermissionNode[] => {
    const map = new Map<string, PermissionNode>()
    const roots: PermissionNode[] = []

    // 1️⃣ 初始化所有节点
    list.forEach(item => {
        map.set(item.permissionId, {
            ...item,
            children: []
        })
    })

    // 2️⃣ 挂载 children
    list.forEach(item => {
        const node = map.get(item.permissionId)!
        if (item.parentId === null) {
            roots.push(node)
        } else {
            map.get(item.parentId)?.children?.push(node)
        }
    })

    return roots
}

const treeData = ref<PermissionNode[]>(buildTree(mockData))

const visible = ref<boolean>(false)
const currentRow = ref<PermissionNode | null>(null)

const getPermissionMeta = (type: PermissionType) => {
    return permissionTypeMap[type]
}

const editRow = (row: PermissionNode | null) => {
    currentRow.value = row
    visible.value = true
}

const findNode = (
    list: PermissionNode[],
    id: string | null
): PermissionNode | null => {
    if (id === null) return null

    for (const node of list) {
        if (node.permissionId === id) return node
        if (node.children) {
            const found = findNode(node.children, id)
            if (found) return found
        }
    }
    return null
}


const doDialogEdit = (form: PermissionNode) => {
    if (currentRow.value) {
        // 编辑：原地修改
        Object.assign(currentRow.value, form)
        return
    }

    // 新增
    const newNode: PermissionNode = {
        ...form,
        permissionId: crypto.randomUUID(),
        children: [],
    }

    const parentId = form.parentId

    if (parentId === null) {
        // 挂在根
        treeData.value.push(newNode)
    } else {
        const parent = findNode(treeData.value, parentId)
        if (parent) {
            if (!parent.children) parent.children = []
            parent.children.push(newNode)
        }
    }
}
const deleteRow = (row: PermissionNode) => {
    if (row.children && row.children.length > 0) {
        ElMessage.warning('请先删除子权限')
        return
    }

    removeRow(row)
}

const removeRow = (row: PermissionNode) => {
    const remove = (list: PermissionNode[]) => {
        const idx = list.findIndex(l => l.permissionId === row.permissionId)
        if (idx > -1) {
            list.splice(idx, 1)
            return true
        }

        for (const node of list) {
            if (node.children && remove(node.children)) {
                return true
            }
        }

        return false
    }

    remove(treeData.value)
}

</script>

<style scoped></style>