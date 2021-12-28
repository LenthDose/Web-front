<template lang="">
  <div>
    <div class="button-container">
      <el-row :gutter="30">
        <el-col :span="8">
          <el-button v-show="hidden" type="primary" @click="gotReservation">已预定</el-button>
        </el-col>
        <el-col :span="8">
          <el-button v-show="hidden" type="primary" @click="registration">现场登记</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 有预定的表格 -->
    <div v-show="flag" class="container">
      <el-table
        :data="tableData"
        border
        style="width: 95%"
      >
        <el-table-column
          :show-overflow-tooltip="true"
          prop="book_id"
          label="预定单号"
        />
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
          prop="type_name"
          label="客房类型"
        />
        <el-table-column
          prop="type_price"
          label="客房价格"
        />
        <el-table-column
          prop="book_price"
          label="入住价格"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="create_time"
          label="创建时间"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="book_phone"
          label="预定电话"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="room_id"
          label="客房编号"
        />
        <el-table-column
          label="客户信息"
        >
          <template>
            <el-button
              size="mini"
              type="primary"
              @click="handleCustomer()"
            >客户信息</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="消费方式"
        >
          <template>
            <el-button
              v-if="order.cost_type === ''"
              size="mini"
              type="primary"
              @click="handleCost()"
            >消费方式
            </el-button>
            <el-tag v-if="order.cost_type !== ''">{{ order.cost_type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="onSubmit(scope.row)"
            >办理入住
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

    <el-dialog :title="customerTitle" width="60%" :visible.sync="customerFormVisible">
      <el-form :model="customerForm">
        <el-form-item
          v-for="(item, index) in customerForm.customer"
          :key="item.key"
          :label="'客户'+ index"
          prop="customer"
          :rules="{required: true, message: '姓名和身份证不能为空', trigger: 'blur'}"
        >
          <el-input v-model="item.customer_name" placeholder="姓名" />
          <el-input v-model="item.customer_idcard" placeholder="身份证" />
          <el-button @click.prevent="removeDomain(item)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addCustomer">新增客户</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="closeCustomerDialog">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :title="costTitle" width="40%" :visible.sync="costFormVisible">
      <el-form :model="order">
        <el-form-item label="消费方式">
          <el-select v-model="order.cost_type" placeholder="请选择">
            <el-option
              v-for="item in cost_type"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div v-show="checkflag">
      <el-form ref="checkin" :model="checkin" label-width="80px" :inline="true">
        <el-form-item label="入住时间" prop="check_arrire">
          <el-col :span="11">
            <el-date-picker
              v-model="checkin.check_arrire"
              type="datetime"
              placeholder="选择日期"
              style="width: 190%"
              default-time="12:00:00"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="退房时间" prop="check_leave">
          <el-col :span="11">
            <el-date-picker
              v-model="checkin.check_leave"
              type="datetime"
              placeholder="选择日期"
              style="width: 190%"
              default-time="12:00:00"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="calTime"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="入住人数" prop="check_person">
          <el-input v-model="checkin.check_person" />
        </el-form-item>
        <el-form-item>
          <el-button @click="showRoom">选择客房</el-button>
        </el-form-item>
        <el-form-item label="客房编号" prop="room_id">
          <el-input v-model="checkin.room_id" />
        </el-form-item>
        <el-form-item label="入住价格" prop="check_price">
          <el-input v-model="checkin.check_price" />
        </el-form-item>
        <el-form-item label="操作">
          <el-button size="mini" type="primary" @click="handleCustomer()">添加客户信息</el-button>
          <el-button size="mini" type="primary" @click="handleCost()">添加消费方式</el-button>
          <el-button size="mini" type="primary" @click="onCheck()">办理入住</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-dialog :title="dialogTitle" width="60%" :visible.sync="dialogFormVisible">
        <el-form :inline="true" :model="wrapper">
          <el-form-item label="客房类型">
            <el-select v-model="wrapper.type_id" placeholder="请选择">
              <el-option
                v-for="item in type"
                :key="item.type_id"
                :label="item.type_name"
                :value="item.type_id"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <el-table :data="roomData" border>
          <el-table-column prop="room_id" label="客房编号" />
          <el-table-column prop="type_id" label="客房类型">
            <template slot-scope="scope">
              <el-tag
                v-for="item in type"
                v-show="scope.row.type_id == item.type_id"
                :key="item.type_id"
                :value="item.type_id"
              >
                {{ item.type_name }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="room_floor" label="楼层" />
          <el-table-column prop="room_status" label="状态">
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleChoose(scope.row)"
              >选择
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getCommitBook, deleteById } from '@/api/book'
import { addCustomer } from '@/api/customer'
import { check } from '@/api/checkin'
import { addOne } from '@/api/order'
import { getEmptyRoomWithType, changeStatus } from '@/api/room'
import { getDiscount } from '@/api/discount'
import { getTypeOtherList } from '@/api/type'
import { showNotify, showMessage } from '@/api/notifty'
export default {
  data() {
    return {
      pageCurrent: 1,
      pageSize: 10,
      pageTotal: 0,
      hidden: true,
      flag: false,
      checkflag: false,
      customerFormVisible: false,
      customerTitle: '添加客户信息',
      costFormVisible: false,
      costTitle: '消费方式',
      dialogFormVisible: false,
      dialogTitle: '客房列表',
      wrapper: {
        type_id: ''
      },
      tableData: [{}],
      type: [],
      status: [
        { value: 0, label: '空闲' },
        { value: 1, label: '已入住' }
      ],
      checkin_id: '',
      orders_id: '',
      room_id: '',
      customerForm: {
        customer: [{
          customer_name: '',
          customer_idcard: ''
        }]
      },
      discount: [],
      roomData: [],
      checkin: { check_arrire: '', check_leave: '', check_person: '', room_id: '', check_price: '' },
      order: {
        cost_type: ''
      },
      cost_type: [{ value: 0, label: '线上支付' }, { value: 1, label: '现金支付' }]
    }
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  watch: {
    'wrapper.type_id'(val) {
      this.EmptyRoomWithType(val)
    },
    'order.cost_type'(val) {
      this.costFormVisible = false
    }
  },
  mounted() {
    this.TypeList()
    this.DiscountList()
  },
  methods: {
    /** 条数变化 */
    handleSizeChange(val) {
      this.pageSize = val
      this.CommitBook()
    },
    /** 页数变化 */
    handleCurrentChange(val) {
      this.pageCurrent = val
      this.CommitBook()
    },
    /** 获取客房类型列表 */
    TypeList() {
      getTypeOtherList().then(res => {
        this.type = res.data
      })
    },
    /** 获取折扣列表 */
    DiscountList() {
      getDiscount().then(res => {
        this.discount = res.data
      })
    },
    /** 根据类型获取空闲房间列表 */
    EmptyRoomWithType(val) {
      getEmptyRoomWithType(val).then(res => {
        this.roomData = res.data
      })
    },
    /** 获取已经提交的预定 */
    CommitBook() {
      getCommitBook(this.pageCurrent, this.pageSize).then(res => {
        this.tableData = res.data.records
        this.pageTotal = res.data.total
      })
    },
    /** 计算入住天数 */
    calTime() {
      const stime = this.checkin.check_arrire
      const etime = this.checkin.check_leave
      const usedTime = Date.parse(etime) - Date.parse(stime)
      const days = Math.floor(usedTime / (24 * 3600 * 1000))
      this.checkin.check_day = days
    },
    /** 打开预定列表 */
    gotReservation() {
      this.hidden = false
      this.flag = true
      this.CommitBook()
    },
    /** 打开现场入住登记 */
    registration() {
      this.hidden = false
      this.checkflag = true
    },
    /** 关闭客户信息弹窗 */
    closeCustomerDialog() {
      this.customerFormVisible = false
    },
    /** 打开添加客户信息弹窗 */
    handleCustomer() {
      this.customerFormVisible = true
    },
    /** 删除增加的输入框 */
    removeDomain(item) {
      var index = this.customerForm.customer.indexOf(item)
      if (index !== -1) {
        this.customerForm.customer.splice(index, 1)
      }
    },
    /** 增加输入框 */
    addCustomer() {
      this.customerForm.customer.push({
        customer_name: '',
        customer_idcard: ''
      })
    },
    /** 打开选择消费方式弹框 */
    handleCost() {
      this.costFormVisible = true
    },
    /** 打开空闲客房列表弹窗 */
    showRoom() {
      this.dialogFormVisible = true
    },
    /** 预定的设定账单body */
    setOrder(row) {
      this.order.cost_money = row.check_price * row.check_day
      this.order.checkin_id = this.checkin_id
      this.order.room_id = row.room_id
      this.order.staff_id = this.id
    },
    /** 预定的重设置body */
    setCheckinTwoByRow(row) {
      row.check_arrire = row.book_arrire
      row.check_leave = row.book_leave
      row.check_person = row.book_person
      row.check_day = row.book_day
      row.check_price = row.book_price
      delete row.book_arrire
      delete row.book_leave
      delete row.book_person
      delete row.book_day
      delete row.book_price
    },
    /** 添加客户信息 */
    setCustomerAdd(val) {
      this.customerForm.customer.forEach((item) => {
        item.checkin_id = this.checkin_id
        item.orders_id = this.orders_id
        item.room_id = val.room_id
        addCustomer(item)
      })
    },
    /** 有预定的提交 */
    onSubmit(row) {
      this.setCheckinTwoByRow(row)
      check(row).then(res => {
        this.checkin_id = res.data
        changeStatus(row.room_id)
        deleteById(row.book_id)
        this.CommitBook()
        showNotify('登记成功')
        if (this.order.cost_type !== '') {
          this.setOrder(row)
          addOne(this.order).then(res => {
            this.orders_id = res.data.orders_id
            this.setCustomerAdd(row)
            showNotify('订单添加成功')
          })
        }
      })
    },
    /** 设置登记Body */
    setCheckinByWrapper(type, discount) {
      this.checkin.staff_id = this.id
      this.checkin.type_id = type.type_id
      this.checkin.type_name = type.type_name
      this.checkin.type_price = type.type_price
      this.checkin.dis_value = discount.discount_value
      this.checkin.dis_reason = discount.discount_reason
      this.checkin.check_price = parseFloat(type.type_price) * parseFloat(discount.discount_value)
    },
    handleChoose(row) {
      let type = {}
      let dis = {}
      type = this.type.find((item) => {
        return item.type_id === row.type_id
      })
      dis = this.discount.find((item) => {
        return item.discount_id === type.discount_id
      })
      this.checkin.room_id = row.room_id
      this.room_id = row.room_id
      this.setCheckinByWrapper(type, dis)
      this.dialogFormVisible = false
    },
    setCheck() {
      this.checkin.staff_id = this.id
    },
    onCheck() {
      this.setCheck()
      console.log(this.checkin)
      check(this.checkin).then(res => {
        this.checkin_id = res.data
        changeStatus(this.room_id)
        showNotify('登记成功')
        if (this.order.cost_type !== '') {
          this.setOrder(this.checkin)
          addOne(this.order).then(res => {
            this.orders_id = res.data.orders_id
            this.setCustomerAdd(this.checkin)
            showNotify('订单生成成功')
            this.$refs['checkin'].resetFields()
          })
        }
      }).catch(() => {
      })
    }
  }
}
</script>
<style lang="css">
.el-form{
  width: 30%;
  margin-left: 30px;
  margin-top: 30px;
}

.button-container{
  margin-top: 15%;
  margin-left: 35%;
}
.container {
    margin-left:5%;
    margin-top: 0;
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
