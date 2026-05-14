<template>
    <div>
        <el-dialog v-model="visible" title="Tips" width="500">
            <span>新增角色</span>
            <!-- form一定要绑定ref，不然校验无法继续 -->
            <el-form ref="formRef" :model="form" label-width="auto">
                <el-form-item label="角色名" prop="roleName">
                    <el-input v-model="form.roleName" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="form.status">
                        <el-radio :value="true" size="large">启用</el-radio>
                        <el-radio :value="false" size="large">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="visible = false">Cancel</el-button>
                    <el-button type="primary" @click="confirmAdd(formRef)"> Confirm </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import type { RoleRow } from './api';
import { assignForm } from '@/utils';
import { ElMessage, type FormInstance } from 'element-plus';

// 采用Vue3给出的方法获取dialog的visible
const visible = defineModel<boolean>()

// 获取从父级传来的参数
const props = defineProps<{
    initial: RoleRow | null
}>()

// 向父级传送参数的方法
const emit = defineEmits<{
    (e: 'on-click', form: RoleRow): void
}>()

// 新增/编辑表单内的内容
const form = reactive<RoleRow>({
    roleName: '',
    status: false
})

//重置表单并关闭,在监听内使用
const reset = () => {
    form.roleName = ''
    form.status = false
    visible.value = false
}

//监听visible的变化,如果为true,则给表单赋值(赋值方法已单独提取)
watch(visible, (val) => {
    if (val && props.initial) {
        assignForm(form, props.initial)
    }
    if (!val) {
        reset()
    }
})

//表单ref,类似于React 的 Form.useForm(),定义后可以使用validate等表单控制类方法
const formRef = ref<FormInstance>()

// 确认修改 如果表单内存在值，在经过校验后会传递给父组件
const confirmAdd = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            emit('on-click', { ...props.initial, ...form })
            visible.value = false
        } else {
            ElMessage({
                message: '出现错误' + fields,
                type: 'error'
            })

        }
    })
}
</script>

<style scoped></style>