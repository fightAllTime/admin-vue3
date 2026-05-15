<template>
    <div>
        权限管理
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
        </el-table>
    </div>
</template>

<script setup lang="ts">
import type { PermissionType, PermissionRow, PermissionNode, PermissionTypeMeta } from './api';
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

const treeData = buildTree(mockData)

const permissionTypeMap: Record<PermissionType, PermissionTypeMeta> = {
    MENU: { label: '菜单', type: 'primary' },
    BUTTON: { label: '按钮', type: 'success' },
    API: { label: '接口', type: 'warning' },
}

const getPermissionMeta = (type: PermissionType) => {
    return permissionTypeMap[type]
}


</script>

<style scoped></style>