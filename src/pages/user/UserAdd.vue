<template>
  <el-dialog v-model="visible" title="用户表单" width="500">
    <el-form ref="ruleFormRef" :model="userAddForm" :rules="userAddRules" label-width="auto">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="userAddForm.userName" />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userAddForm.email" />
      </el-form-item>

      <el-form-item label="角色" prop="character">
        <el-select v-model="userAddForm.character" placeholder="请选择">
          <el-option label="超管" value="超管" />
          <el-option label="管理员" value="管理员" />
          <el-option label="用户" value="用户" />
          <el-option label="临时用户" value="临时用户" />
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="userAddForm.status">
          <el-radio value="on" label="启用" />
          <el-radio value="off" label="禁用" />
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="setValueToParent(ruleFormRef)">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { assignForm } from '@/utils'
import type { FormInstance, FormRules } from 'element-plus'

interface UserRow {
  userId?: string
  userName: string
  email: string
  character: string
  status: string
}

const ruleFormRef = ref<FormInstance>()

const props = defineProps<{
  initial?: UserRow | null
}>()

const emit = defineEmits<{
  (e: 'on-click', form: UserRow): void
}>()

const visible = defineModel<boolean>()

const userAddForm = reactive<UserRow>({
  userName: '',
  email: '',
  character: '',
  status: ''
})

const userAddRules = reactive<FormRules<UserRow>>({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' }
  ],
  character: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' }
  ]
})

const reset = () => {
  userAddForm.userId = ''
  userAddForm.userName = ''
  userAddForm.email = ''
  userAddForm.character = ''
  userAddForm.status = ''
}

watch(visible, (val) => {
  if (val && props.initial) {
    assignForm(userAddForm, props.initial)
  }

  if (!val) {
    reset()
  }
})

const setValueToParent = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit('on-click', { ...userAddForm })
      visible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>