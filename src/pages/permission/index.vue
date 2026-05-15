<template>
    <div>
        权限管理
    </div>
</template>

<script setup lang="ts">
import type { PermissionRow, PermissionNode } from './api';
const mockData: PermissionRow[] = [
    {
        permissionId: 'root',
        permissionName: '初始节点',
        permissionCode: 'code_0',
        parentId: null,
    },
    {
        permissionId: '1',
        permissionName: '节点1',
        permissionCode: 'code_0_1',
        parentId: 'root'
    },
    {
        permissionId: '2',
        permissionName: '节点2',
        permissionCode: 'code_0_2',
        parentId: 'root'
    },
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

const TreeData = buildTree(mockData)
console.log('TreeData', TreeData);

</script>

<style scoped></style>