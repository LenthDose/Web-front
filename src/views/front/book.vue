<template lang="">
  <div class="container">
    <el-table
      :data="tableData"
      border
      style="width: 70%"
    >
      <el-table-column
        :show-overflow-tooltip="true"
        prop="book_arrire"
        label="入住时间"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="book_leave"
        label="退房时间"
      />
      <el-table-column
        prop="book_person"
        label="入住人数"
      />
      <el-table-column
        prop="book_day"
        label="入住天数"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="create_time"
        label="创建时间"
      />
      <el-table-column
        prop="book_phone"
        label="预定人电话"
      />
      <el-table-column
        prop="room_id"
        label="客房编号"
      >
        <template slot-scope="scope">
          <div>
            <el-button
              v-if="scope.row.room_id === null"
              type="primary"
              size="mini"
              @click="handleEdit(scope.row)"
            >选择
            </el-button>
            <span v-if="scope.row.room_id !== null">
              {{ scope.row.room_id }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <div>
            <el-button
              type="primary"
              size="mini"
              @click="onSubmit(scope.row)"
            >提交
            </el-button>
            <el-button
              type="primary"
              size="mini"
              @click="checkDetails(scope.row)"
            >详细信息
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
      <el-table
        :data="roomData"
        border
      >
        <el-table-column
          prop="room_id"
          label="客房编号"
        />
        <el-table-column
          prop="room_floor"
          label="楼层"
        />
        <el-table-column
          prop="room_status"
          label="状态"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.room_status == 0">
              空闲
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleChoose(scope.row)"
            >选择
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog :title="bookDetailsTitle" width="80%" :visible.sync="bookDetailsVisible">
      <el-descriptions border :column="4">
        <el-descriptions-item>
          <template slot="label">
            预定单号
          </template>
          {{ details.book_id }}
        </el-descriptions-item>
        <el-descriptions-item label="客房类型">
          {{ details.type_name }}
        </el-descriptions-item>
        <el-descriptions-item label="客房价格">
          {{ details.type_price }}
        </el-descriptions-item>
        <el-descriptions-item label="入住价格">
          {{ details.book_price }}
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getEmptyRoomWithType, changeStatusBook } from '@/api/room'
import { getBookNotCommit, chooseRoom, update } from '@/api/book'
import { showNotify, showMessage } from '@/api/notifty'
export default {
  data() {
    return {
      pageCurrent: 1,
      pageSize: 10,
      pageTotal: 0,
      tableData: [{}],
      roomData: [{}],
      details: {},
      status: [
        { value: 0, label: '空闲' },
        { value: 1, label: '已入住' }
      ],
      dialogFormVisible: false,
      dialogTitle: '选择',
      book_id: '',
      bookDetailsTitle: '预定信息',
      bookDetailsVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  mounted() {
    this.BookNotCommit()
  },
  methods: {
    BookNotCommit() {
      getBookNotCommit(this.pageCurrent, this.pageSize).then(res => {
        this.tableData = res.data.records
        this.pageTotal = res.data.total
      })
    },
    EmptyRoom(val) {
      getEmptyRoomWithType(val).then(res => {
        this.roomData = res.data
      })
    },
    checkDetails(val) {
      this.details = val
      this.bookDetailsVisible = true
    },
    handleEdit(row) {
      this.dialogFormVisible = true
      this.book_id = row.book_id
      this.EmptyRoom(row.type_id)
    },
    handleChoose(row) {
      chooseRoom(this.book_id, row.room_id).then(res => {
        showNotify(res.data)
        this.BookNotCommit()
      })
      this.dialogFormVisible = false
    },
    onSubmit(row) {
      this.$confirm('确定无误提交吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        update(row.book_id, this.id).then(res => {
          localStorage.setItem('book_id', row.book_id)
          showNotify(res.data)
          if (row.room_id !== null) {
            changeStatusBook(row.room_id)
          }
          this.BookNotCommit()
        })
      }).catch(() => {
        showMessage('取消提交')
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.BookNotCommit
    },
    handleCurrentChange(val) {
      this.pageCurrent = val
      this.BookNotCommit
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
