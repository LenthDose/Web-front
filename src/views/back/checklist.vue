<template lang="">
  <div>
    <div class="container">
      <el-table
        :data="tableData"
        border
        style="width: 95%"
      >
        <el-table-column
          :show-overflow-tooltip="true"
          prop="checkin_id"
          label="入住单号"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="book_id"
          label="预定单号"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="check_arrire"
          label="入住时间"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="check_leave"
          label="退房时间"
        />
        <el-table-column
          prop="check_person"
          label="入住人数"
        />
        <el-table-column
          prop="check_day"
          label="入住天数"
        />
        <el-table-column
          prop="type_name"
          label="客房类型"
        />
        <el-table-column
          prop="type_price"
          label="客房价格"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="room_id"
          label="客房编号"
        />
        <el-table-column
          prop="check_price"
          label="入住价格"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="create_time"
          label="创建时间"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="staff_id"
          label="操作人员编号"
        />
        <el-table-column
          label="是否删除"
          prop="is_deleted"
        >
          <template slot-scope="scope">
            <el-tag
              v-for="item in is_deleted"
              v-show="scope.row.is_deleted == item.value"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </el-tag>
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
  </div>
</template>
<script>
import { getlist } from '@/api/checkin'
export default {
  data() {
    return {
      pageCurrent: 1,
      pageSize: 10,
      pageTotal: 0,
      tableData: [],
      is_deleted: [
        { value: 1, label: '未删除' },
        { value: 0, label: '已删除' }
      ]
    }
  },
  mounted() {
    this.List()
  },
  methods: {
    List() {
      getlist(this.pageCurrent, this.pageSize).then(res => {
        this.tableData = res.data.records
        this.pageTotal = res.data.total
      })
    }
  }
}
</script>
<style lang="css">
 .container {
    margin-left:9%;
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
