<template lang="">
  <div class="container">
    <div>
      <div class="container-top">
        <el-input
          v-model="QueryParam"
          style="width: 20%; margin-right: 10px"
          placeholder="请输入查询姓名"
        />
        <el-button type="primary" @click="Query">查询</el-button>
        <el-button type="success" size="primary" style="margin-right: 10px" @click="add">增加</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 85%"
      >
        <el-table-column
          :show-overflow-tooltip="true"
          prop="staff_id"
          label="编号"
          width="200"
        />
        <el-table-column
          prop="staff_name"
          label="账号"
          width="80"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="staff_password"
          label="密码"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="create_time"
          label="创建时间"
          width="200"
        />
        <el-table-column
          prop="staff_role"
          label="权限"
          width="110"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.staff_role == 'ROLE_SUPER'">
              超级管理员
            </el-tag>
            <el-tag v-if="scope.row.staff_role== 'ROLE_FRONT'">
              前台
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_enabled"
          label="账号有效"
          width="80"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_enabled"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              @change="changeEnabled(scope.row)"
            />
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :current-page="pageCurrent"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <div>
        <el-dialog :title="dialogTitle" width="50%" :visible.sync="iconFormVisible">
          <el-form :inline="true" :model="staff">
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
                action="/hotel/staff/uploadpic"
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
            <el-button type="primary" @click="Submit">确 定</el-button>
          </div>
        </el-dialog>
      </div>

    </div>
  </div>
</template>
<script>
import { getList, change, add, deleteStaff, setEnabled, search } from '@/api/user'
import { showNotify } from '@/api/notifty'
export default {
  data() {
    return {
      pageCurrent: 1,
      pageSize: 10,
      pageTotal: 0,
      tableData: [{}],
      roles: [
        { value: 'ROLE_SUPER', label: '超级管理员' },
        { value: 'ROLE_FRONT', label: '前台' }
      ],
      enabled: [
        { value: 1, label: '有效' },
        { value: 0, label: '无效' }
      ],
      iconFormVisible: false,
      staff: {},
      dialogTitle: '',
      QueryParam: ''
    }
  },
  mounted() {
    this.StaffList()
  },
  methods: {
    StaffList() {
      getList(this.pageCurrent, this.pageSize).then(res => {
        this.tableData = res.data.records
        this.pageTotal = res.data.total
      })
    },
    Query() {
      search(this.QueryParam, this.pageCurrent, this.pageSize).then(res => {
        this.tableData = res.data.records
        this.pageTotal = res.data.total
      })
    },
    changeEnabled(val) {
      setEnabled(val.staff_id, val.is_enabled).then(res => {
        showNotify(res.data)
      })
    },
    add() {
      this.dialogTitle = '增加'
      this.iconFormVisible = true
    },
    handleEdit(row) {
      this.dialogTitle = '编辑'
      this.staff = row
      this.iconFormVisible = true
    },
    Submit() {
      if (this.dialogTitle === '增加') {
        add(this.staff).then(res => {
          showNotify(res.data)
          this.iconFormVisible = false
          this.StaffList()
        }).catch(() => {
          this.$refs['staff'].resetFields()
        })
      }
      if (this.dialogTitle === '编辑') {
        change(this.staff).then(res => {
          showNotify(res.data)
          this.iconFormVisible = false
          this.StaffList()
        }).catch(() => {
          this.$refs['staff'].resetFields()
        })
      }
    },
    handleDelete(row) {
      this.$confirm(`确定删除${row.staff_name}吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        deleteStaff(row.staff_id).then(res => {
          showNotify(res.data)
          this.StaffList()
        })
      }).catch(() => {})
    },
    handleAvatarSuccess(res) {
      this.staff.staff_avatar = res.data
    },
    handleSizeChange(val) {
      this.pageSize = val
      if (this.QueryParam !== '') {
        this.Query()
      } else {
        this.StaffList()
      }
    },
    handleCurrentChange(val) {
      this.pageCurrent = val
      if (this.QueryParam !== '') {
        this.Query()
      } else {
        this.StaffList()
      }
    }
  }
}

</script>
<style lang="css">
 .container {
    margin-left:14%;
    margin-top: 5%;
 }
  .block{
  position: relative;
  margin-top: 5%;
  left:25%;
}
.el-table {
   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
   border-radius: 4px
}
.container-top {
  margin-bottom: 1%;
}
</style>
