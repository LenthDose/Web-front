<template lang="">
  <div class="container">
    <el-table
      :data="tableData"
      border
      style="width: 85%"
    >
      <el-table-column
        :show-overflow-tooltip="true"
        prop="orders_id"
        label="订单编号"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="checkin_id"
        label="入住单号"
      />
      <el-table-column
        prop="cost_money"
        label="消费金额"
      />
      <el-table-column
        prop="cost_type"
        label="消费方式"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="room_id"
        label="客房编号"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="create_time"
        label="消费时间"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
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
  </div>
</template>
<script>
import { getList, deleteById } from '@/api/order'
import { showNotify, showMessage } from '@/api/notifty'
export default {
  data() {
    return {
      tableData: [],
      pageCurrent: 1,
      pageSize: 10,
      pageTotal: 0
    }
  },
  mounted() {
    this.List()
  },
  methods: {
    List() {
      getList(this.pageCurrent, this.pageSize).then(res => {
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
      this.$confirm(`确定删除${row.orders_id}吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        deleteById(row.orders_id).then(res => {
          showNotify(res.data)
        })
        this.List()
      }).catch(() => {
        showMessage('取消删除')
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
</style>
