<template lang="">
  <div>
    <el-form :inline="true" :model="staff" class="demo-form-inline">
      <el-form-item label="账号">
        <el-input v-model="staff.staff_name" placeholder="账号" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="staff.staff_password" placeholder="密码" />
      </el-form-item>
      <el-form-item label="权限">
        <el-select v-model="staff.staff_role" placeholder="请选择">
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="账号有效">
        <el-select v-model="staff.is_enabled" placeholder="请选择">
          <el-option
            v-for="item in enabled"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-model="staff.staff_avatar" label="员工图片">
        <el-upload
          class="upload-demo"
          drag
          action="hotel/staff/uploadpic"
          :on-success="handleAvatarSuccess"
          multiple
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="iconFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addOne()">确 定</el-button>
    </div>
  </div>
</template>
<script>
import { add } from '@/api/user'
export default {
  data() {
    return {
      roles: [
        { value: 'ROLE_SUPER', label: '超级管理员' },
        { value: 'ROLE_FRONT', label: '前台' }
      ],
      enabled: [
        { value: 1, label: '有效' },
        { value: 0, label: '无效' }
      ]
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code === 200) {
        this.staff.staff_avatar = res.data
      }
    },
    addOne() {
      add(this.staff).then(res => {
        if (res.code === 200) {
          this.$notify({
            title: res.data,
            type: 'success'
          })
          this.addFormVisible = false
        } else {
          this.$notify({
            title: res.data,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style lang="">

</style>
