<template lang="">
  <div class="container">
    <el-button type="success" size="primary" style="margin-bottom: 1%;" @click="add">增加</el-button>
    <el-table :data="tableData" border style="width: 85%">
      <el-table-column
        :show-overflow-tooltip="true"
        prop="discount_id"
        label="折扣类型编号"
      />
      <el-table-column
        prop="discount_value"
        label="折扣值"
      />
      <el-table-column
        prop="discount_reason"
        label="折扣原因"
      />
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <div>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除
            </el-button>
          </div>
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
    <el-dialog :title="dialogTitle" width="50%" :visible.sync="dialogFormVisible">
      <el-form ref="discount" :model="discount">
        <el-form-item label="折扣值" prop="discount_value">
          <el-input v-model="discount.discount_value" />
        </el-form-item>
        <el-form-item label="折扣原因" prop="discount_reason">
          <el-input v-model="discount.discount_reason" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { deleteById, listBypage, create } from '@/api/discount'
import { showNotify } from '@/api/notifty'
export default {
  data() {
    return {
      pageCurrent: 1,
      pageSize: 10,
      pageTotal: 0,
      tableData: [],
      dialogTitle: '添加',
      dialogFormVisible: false,
      discount: {}
    }
  },
  mounted() {
    this.list()
  },
  methods: {
    list() {
      listBypage(this.pageCurrent, this.pageSize).then(res => {
        this.tableData = res.data.records
        this.pageTotal = res.data.total
      })
    },
    handleDelete(val) {
      this.$confirm(`确定删除${val.discount_id}吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        deleteById(val.discount_is).then(res => {
          showNotify(res.data)
        })
      }).catch(() => {
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.list()
    },
    handleCurrentChange(val) {
      this.pageCurrent = val
      this.list()
    },
    add() {
      this.dialogFormVisible = true
    },
    onSubmit() {
      create(this.discount).then(res => {
        showNotify(res.data)
        this.dialogFormVisible = false
      }).catch(() => {
        this.$refs['discount'].resetFields()
      })
      this.$refs['discount'].resetFields()
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
</style>
