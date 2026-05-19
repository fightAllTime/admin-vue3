<template>
    <div>
        <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑权限' : '新增权限'" width="500">
            <el-form ref="formRef" :rules="pDialogRules" :model="form" label-width="100px">
                <el-form-item label="permissionName" prop="权限名称">
                    <el-input v-model="form.permissionName" />
                </el-form-item>
                <el-form-item label="permissionCode" prop="权限代码">
                    <el-input v-model="form.permissionCode" />
                </el-form-item>
                <el-form-item label="permissionType" prop="权限类型">
                    <el-radio-group v-model="form.permissionType">
                        <el-radio-button v-for="(value, key) in permissionTypeMap" :key="key" :label="key" :value="key"
                            size="large">{{ value.label }}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上级权限" prop="parentId">
                    <el-tree-select v-model="form.parentId" :data="menuTree"
                        :props="{ label: 'permissionName', value: 'permissionId', children: 'children', disabled: 'disabled' }"
                        placeholder="请选择上级权限（留空为根节点）" clearable :check-strictly='true' default-expand-all />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="doSubmit(formRef)">  {{ isEdit ? '保存' : '立即创建' }} </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue';
import type { PermissionNode } from './api';
import { permissionTypeMap } from './commonValue';
import { type FormInstance, } from 'element-plus';
import { assignForm } from '@/utils';

const formRef = ref<FormInstance>()

const initialForm: PermissionNode = {
    permissionId: '',
    permissionName: '',
    permissionCode: '',
    permissionType: "API",
    parentId: null,
    icon: ''
}

const form = reactive<PermissionNode>({ ...initialForm })

const pDialogRules = {
    permissionName: [
        { required: true, message: '请输入permissionName！', trigger: 'blur' }
    ],
    permissionCode: [
        { required: true, message: '请输入permissionName！', trigger: 'blur' }
    ],
    permissionType: [
        { required: true, message: '请输入permissionName！', trigger: 'change' }
    ],
    parentId: [
        { required: true, message: '请输入permissionName！', trigger: 'blur' }
    ],
}

const dialogVisible = defineModel<boolean>()

const props = defineProps<{
    initial: PermissionNode | null,
    treeData: PermissionNode[]
}>()

// 预处理 treeData：给每个节点加上 disabled 标记
// 非 MENU 类型全部禁用；编辑模式下当前节点自身也禁用（防止选自己做上级）
const menuTree = computed(() => {
    const editId = props.initial?.permissionId

    const markDisabled = (list: PermissionNode[]): any[] => {
        return list.map(node => ({
            ...node,
            disabled: node.permissionType !== 'MENU' || node.permissionId === editId,
            children: node.children?.length ? markDisabled(node.children) : undefined,
        }))
    }

    return [{
        permissionId: null,
        permissionName: '顶级权限',
        permissionCode: '',
        permissionType: 'MENU',
        parentId: null,
        icon: '',
        disabled: false,
        children: markDisabled(props.treeData || []),
    }]
})

const emit = defineEmits<{
    // (e: 'on-click', form: PermissionNode): void
    (e: 'submit', form: PermissionNode): void
}>()

const isEdit = computed(() => !!props.initial?.permissionId)


const reset = () => {
    formRef.value?.resetFields()
    Object.assign(form, initialForm) // 重置为初始状态
}

watch(dialogVisible, (val) => {
    if (val && props.initial) {
        assignForm(form, props.initial)
    } else {
        reset()
    }
})

const doSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate()
    emit('submit', form)
    dialogVisible.value = false
}


</script>

<style scoped></style>