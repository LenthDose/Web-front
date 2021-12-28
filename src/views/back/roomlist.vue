<template lang="">
  <div class="roomlist">
    <div class="contanier-query">
      <el-form ref="wrapper" :inline="true" :model="wrapper">
        <el-form-item label="客房类型" prop="type_id">
          <el-select v-model="wrapper.type_id" placeholder="请选择">
            <el-option
              v-for="item in type"
              :key="item.type_id"
              :label="item.type_name"
              :value="item.type_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="room_status">
          <el-select v-model="wrapper.room_status" placeholder="请选择">
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetWrapper">重置条件</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-table
        :data="tableData"
        border
        style="width: 85%"
      >
        <el-table-column
          prop="room_id"
          label="客房编号"
        />
        <el-table-column
          prop="type_id"
          label="客房类型"
        >
          <template slot-scope="scope">
            <span
              v-for="item in type"
              v-show="scope.row.type_id == item.type_id"
              :key="item.type_id"
              :value="item.type_id"
            >
              {{ item.type_name }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="room_floor"
          label="楼层"
        />
        <el-table-column
          prop="room_status"
          label="状态"
        >
          <template slot-scope="scope">
            <el-tag
              v-for="item in status"
              v-show="scope.row.room_status == item.value"
              :key="item.type_id"
              :value="item.type_id"
            >
              {{ item.label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除
            </el-button>
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

    <el-dialog :title="dialogTitle" width="50%" :visible.sync="dialogFormVisible">
      <el-form ref="room" :model="room">
        <el-form-item label="客房类型" prop="type_id">
          <el-select v-model="room.type_id" placeholder="请选择">
            <el-option
              v-for="item in type"
              :key="item.type_id"
              :label="item.type_name"
              :value="item.type_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="楼层" prop="room_floor">
          <el-input v-model="room.room_floor" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button type="primary" @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addOne, deleteById, getList, getListByStatus, getListByType, getListByWarpper } from '@/api/room'
import { getTypeOtherList } from '@/api/type'
import { showNotify } from '@/api/notifty'
export default {
  data() {
    return {
      pageCurrent: 1,
      pageSize: 10,
      pageTotal: 0,
      status: [
        { value: 0, label: '空闲' },
        { value: 1, label: '已入住' },
        { value: 2, label: '已预定' }
      ],
      wrapper: {
        type_id: '',
        room_status: ''
      },
      type: [],
      tableData: [],
      dialogTitle: '添加',
      dialogFormVisible: false,
      room: { type_id: '', room_floor: '' }
    }
  },
  watch: {
    'wrapper.room_status'(val) {
      if (val !== '') {
        this.ListByStatus(val)
      }
    },
    'wrapper.type_id'(val) {
      if (val !== '') {
        this.ListByType(val)
      }
    }
  },
  mounted() {
    this.getTypeList()
    this.List()
  },
  methods: {
    getTypeList() {
      getTypeOtherList().then(res => {
        this.type = res.data
      })
    },
    List() {
      getList(this.pageCurrent, this.pageSize).then(res => {
        this.tableData = res.data.records
        this.pageTotal = res.data.total
      })
    },
    ListByStatus(val) {
      getListByStatus(this.pageIndex, this.pageSize, val).then(res => {
        this.tableData = res.data.records
        this.pageTotal = res.data.total
      })
    },
    ListByType(val) {
      getListByType(this.pageIndex, this.pageSize, val).then(res => {
        this.tableData = res.data.records
        this.pageTotal = res.data.total
      })
    },
    ListByWrapper(status, type) {
      getListByWarpper(this.pageIndex, this.pageSize, status, type).then(res => {
        this.tableData = res.data.records
        this.pageTotal = res.data.total
      })
    },
    resetWrapper() {
      this.$refs['wrapper'].resetFields()
    },
    handleDelete(row) {
      this.$confirm(`确定删除${row.room_id}吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        deleteById(row.room_id).then(() => {
          this.List()
        })
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      const type_id = this.wrapper.type_id
      const room_status = this.wrapper.room_status
      if (type_id !== '' && room_status !== '') {
        this.ListByWrapper(room_status, type_id)
      } else if (type_id === '' && room_status !== '') {
        this.ListByStatus(room_status)
      } else if (type_id !== '' && room_status === '') {
        this.ListByType(type_id)
      }
    },
    handleCurrentChange(val) {
      this.pageCurrent = val
      const type_id = this.wrapper.type_id
      const room_status = this.wrapper.room_status
      if (type_id !== '' && room_status !== '') {
        this.ListByWrapper(room_status, type_id)
      } else if (type_id === '' && room_status !== '') {
        this.ListByStatus(room_status)
      } else if (type_id !== '' && room_status === '') {
        this.ListByType(type_id)
      }
    },
    onAdd() {
      this.dialogFormVisible = true
    },
    onCancel() {
      this.dialogFormVisible = false
    },
    onSubmit() {
      addOne(this.room).then(res => {
        showNotify(res.data)
        this.dialogFormVisible = false
        this.$refs['room'].resetFields()
        this.$refs['wrapper'].resetFields()
        this.List()
      }).catch(() => {
        this.$refs['room'].resetFields()
      })
    }
  }
}
</script>
<style lang="css">
.roomlist{
    margin-top: 5%;
    margin-left: 15%;
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
