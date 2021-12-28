<template lang="">
  <div class="container">
    <el-select v-model="customer_status" placeholder="请选择">
      <el-option
        v-for="item in status"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-table
      :data="tableData"
      border
      style="width: 85%"
    >
      <el-table-column
        :show-overflow-tooltip="true"
        prop="customer_id"
        label="客户编号"
      />
      <el-table-column
        prop="customer_name"
        label="客户姓名"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="customer_idcard"
        label="身份证号"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="room_id"
        label="客房编号"
      />
      <el-table-column
        prop="customer_status"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag
            v-for="item in status"
            v-show="scope.row.customer_status == item.value"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="checkin_id"
        label="入住单号"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="orders_id"
        label="账单编号"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.customer_status === 1 "
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
          >退房</el-button>
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
  </div>
</template>
<script>
import { getList, changStatus } from '@/api/customer'
import { changeStatusEmpty } from '@/api/room'
import { showNotify, showMessage } from '@/api/notifty'
import { deleteById } from '@/api/checkin'
export default {
  data() {
    return {
      tableData: [{}],
      pageCurrent: 1,
      pageSize: 10,
      pageTotal: 0,
      status: [
        { value: 0, label: '退房' },
        { value: 1, label: '入住' }
      ],
      customer_status: 1
    }
  },
  watch: {
    'customer_status'(val) {
      this.List(val)
    }
  },
  mounted() {
    this.List(this.customer_status)
  },
  methods: {
    List(val) {
      getList(this.pageCurrent, this.pageSize, val).then(res => {
        this.tableData = res.data.records
        this.pageTotal = res.data.total
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.List()
    },
    handleCurrentChange(val) {
      this.pageCurrent = val
      this.List()
    },
    handleEdit(row) {
      this.$confirm(`确定${row.customer_name}退房吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        changStatus(row.customer_id).then(res => {
          changeStatusEmpty(row.room_id).then(res => {
            showNotify(res.data)
          })
          deleteById(row.checkin_id)
        })
        this.List()
      }).catch(() => {
        showMessage('操作失败')
      })
    }
  }
}
</script>
<style lang="css">
 .container {
    margin-left:13%;
    margin-top: 5%;
 }
.el-table {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px
}
  .block{
  position: relative;
  margin-top: 5%;
  left:25%;
}
.el-select{
  margin-bottom: 2%;
}
</style>
