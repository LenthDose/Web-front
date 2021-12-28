<template lang="">
  <div>
    <div class="home-menu">
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="4" style="float: left">Matty酒店</el-menu-item>
        <el-menu-item v-if="user_id !== ''" index="5">{{ user_name }}</el-menu-item>
        <el-menu-item v-if="user_id !== ''" index="3" @click="personal">我的预定</el-menu-item>
        <el-menu-item v-if="user_id === ''" index="2" @click="register">注册</el-menu-item>
        <el-menu-item v-if="user_id === ''" index="1" @click="login">登录</el-menu-item>
      </el-menu>
    </div>
    <div class="home-pic">
      <el-carousel indicator-position="outside" style="width: 80%;margin-left: 10%;">
        <el-carousel-item v-for="item in imgList" :key="item.img">
          <img :src="item.img" style="width: 100%;height:100%">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="home-container">
      <el-row type="flex" style="flex-wrap: wrap;">
        <el-col v-for="(item) in type" :key="item.type_id" :span="3" style="margin-right: -25px; margin-top: 10px">
          <el-tooltip effect="dark" placement="right" content="点击查看更多">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" :offset="1" @click.native="check(item)">
              <el-image
                style="object-fit: contain;"
                :src="formatterPicOne(item.type_pic)"
              />
              <div style="padding: 14px;">
                <span>{{ item.type_name }}</span><br>
                <span>{{ item.type_desc }}</span><br>
                <span v-if="item.discount_id === null">￥{{ item.type_price }}</span>
                <span
                  v-if="item.discount_id !== null"
                  style="text-decoration:line-through;"
                >￥{{ item.type_price }}</span>
                <span v-if="item.discount_id !== null" style="margin-left: 10px">
                  ￥{{ bookprice(item) }}
                </span>
              </div>
            </el-card>
          </el-tooltip>
        </el-col>
      </el-row>
    </div>
    <el-dialog :title="dialogTitle" width="30%" :visible.sync="dialogFormVisible">
      <el-form ref="book" v-loading="loading" :model="book" :rules="rules">
        <el-form-item label="入住时间" prop="book_arrire">
          <el-col :span="11">
            <el-date-picker
              v-model="book.book_arrire"
              type="datetime"
              placeholder="选择日期"
              style="width: 100%"
              default-time="12:00:00"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="退房时间" prop="book_leave">
          <el-col :span="11">
            <el-date-picker
              v-model="book.book_leave"
              type="datetime"
              placeholder="选择日期"
              style="width: 100%"
              default-time="12:00:00"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="calTime"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="入住人数" prop="book_person">
          <el-input v-model="book.book_person" style="margin-left: 10%" />
        </el-form-item>
        <el-form-item label="预定人电话" prop="book_phone">
          <el-input v-model="book.book_phone" style="margin-left: 7.5%" />
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button type="primary" @click="Cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="detailTitle" width="80%" :visible.sync="detailFormVisible">
      <el-row>
        <el-col :span="17" style="margin-left: 0;">
          <el-carousel height="570px" style="width: 95%">
            <el-carousel-item v-for="item in pic" :key="item">
              <img :src="item" style="width: 100%;height:100%">
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span="7" style="margin-left: 0;">
          <div class="content">
            <div>
              <h2>基础信息</h2>
              <span>
                <svg-icon icon-class="area" style="width: 25px; height: 25px" />
                <span class="details">{{ show.type_area }}</span>
              </span>
              <br>
              <span>
                <svg-icon icon-class="bed" style="width: 25px; height: 25px; " />
                <span class="details">{{ show.type_bednum }}</span>
                <br>
                <span class="details" style="margin-left: 8%">该房型不可加床</span>
              </span>
            </div>
            <br>
            <div>
              <h2>全部信息</h2>
              <h3>洗浴用品</h3>
              <div class="aside-content">
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">牙刷</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">牙膏</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">沐浴露</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">洗发水</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">护发素</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">香皂</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">浴帽</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">梳子</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">剃须刀</span>
                </div>
              </div>
            </div>
            <div>
              <h3>便利设施</h3>
              <div class="aside-content">
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">房间内高速上网</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">客房WIFI（免费）</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">遮光窗帘</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">手动窗帘</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">空调（免费）</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">空调（仅制冷）</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">书桌</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">餐桌</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">床具:毯子或被子</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">针线包</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">衣架</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">地毯</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">单一规格电源插座</span>
                </div>
              </div>
            </div>
            <div>
              <h3>媒体科技</h3>
              <div class="aside-content">
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">电话</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">电视机</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">有线频道</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">智能门锁</span>
                </div>
              </div>
            </div>
            <div>
              <h3>浴室</h3>
              <div class="aside-content">
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">独立淋浴间</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">独立卫生间</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">吹风机</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">24小时热水</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">拖鞋</span>
                </div>
              </div>
            </div>
            <div>
              <h3>食品饮品</h3>
              <div class="aside-content">
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">瓶装水（免费）</span>
                </div>
                <div class="icon-with-text">
                  <i class="el-icon-circle-check" />
                  <span class="icon-span">电热水壶</span>
                </div>
              </div>
            </div>
          </div>
          <el-button type="primary" style="margin-top: 25px" @click="choose">选择房间</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog :title="loginFormTitle" width="20%" :visible.sync="loginFormVisible">
      <el-form ref="loginForm" :model="loginForm">
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="loginForm.user_name" />
        </el-form-item>
        <el-form-item label="密码" prop="user_pwd">
          <el-input v-model="loginForm.user_pwd" style="margin-left: 4%" />
        </el-form-item>
        <el-form-item style="margin-left: 4%; margin-top: 20px">
          <el-button type="primary" @click="loginSubmit">登录</el-button>
          <el-button type="primary" @click="Cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="registerFormTitle" width="40%" :visible.sync="registerFormVisible">
      <el-form ref="user" :model="user">
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="user.user_name" />
        </el-form-item>
        <el-form-item label="密码" prop="user_pwd">
          <el-input v-model="user.user_pwd" style="margin-left: 4%" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="user.user_gender" placeholder="请选择" style="margin-left: 4%">
            <el-option
              v-for="item in gender"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="registerSubmit">注册</el-button>
          <el-button type="primary" @click="Cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="userDetailsTitle" width="40%" :visible.sync="userDetailsVisible">
      <el-descriptions v-for="(item) in bookDetails" :key="item.book_id" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-home" />
            客房类型
          </template>
          {{ item.type_name }}
        </el-descriptions-item>
        <el-descriptions-item label="预定状态">
          <el-tag v-if="item.room_id === null">预定失败</el-tag>
          <el-tag v-if="item.room_id !== null">预定成功</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="订单时间">
          {{ item.create_time }}
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>
<script>
import { getDiscount } from '@/api/discount'
import { getTypeOtherList } from '@/api/type'
import { add, getBookByUser, getListByUser, deleteById } from '@/api/book'
import { validPhone } from '@/utils/validate'
import { showNotify, showMessage, showMessageBox } from '@/api/notifty'
import { Userlogin, register } from '@/api/user'
export default {
  data() {
    return {
      imgList: [
        { img: require('../assets/img/VCG21gic13922910.jpg') },
        { img: require('../assets/img/VCG211173472548.jpg') }
      ],
      gender: [{ value: 0, label: '女' },
        { value: 1, label: '男' }],
      dialogTitle: '预定',
      detailFormVisible: false,
      detailTitle: '',
      loginFormTitle: '登录',
      loginFormVisible: false,
      registerFormTitle: '注册',
      registerFormVisible: false,
      userDetailsTitle: '预定信息',
      userDetailsVisible: false,
      loginForm: { user_name: '', user_pwd: '' },
      bookDetails: [{}],
      user_id: '',
      user_name: '',
      room_id: '',
      book_id: '',
      user: { user_name: '', user_pwd: '', user_gender: '' },
      book: {},
      dialogFormVisible: false,
      type: [{ type_id: '' }],
      discount: [{ discount_id: '', discount_value: 0, discount_reason: '' }],
      loading: false,
      pic: [],
      show: {},
      keep: '',
      rules: {
        book_arrire: [{ required: true, message: '请选择入住时间', trigger: 'change' }],
        book_leave: [{ required: true, message: '请选择离开时间', trigger: 'change' }],
        book_person: [{ required: true, message: '请填写入住人数', trigger: 'blur' }],
        book_phone: [{ required: true, message: '请填写电话', trigger: 'blur' }]
      }
    }
  },
  watch: {
    'room_id'(val) {
      console.log(val)
      this.loading = false
      clearInterval(this.keep)
    },
    'loading'(val) {
      if (val === false) {
        this.dialogFormVisible = false
        this.detailFormVisible = false
        this.$refs['book'].resetFields()
        if (this.room_id !== null) {
          showMessageBox('您已预定成功，感谢您的支持')
        } else {
          this.$alert('已满房,请重新选择其他房型预定', '提示', {
            center: true
          }).then(() => {
            deleteById(this.book_id)
          })
        }
      }
    }
  },
  mounted() {
    getTypeOtherList().then(res => {
      this.type = res.data
    })
    getDiscount().then(res => {
      this.discount = res.data
    })
  },
  methods: {
    personal() {
      this.userDetailsVisible = true
      this.getList()
    },
    registerSubmit() {
      register(this.user).then(res => {
        showNotify(res.data)
        this.registerFormVisible = false
      })
      this.$refs['loginForm'].resetFields()
    },
    getBook() {
      getBookByUser(this.user_id).then(res => {
        this.room_id = res.data.room_id
        this.book_id = res.data.book_id
      }).catch(() => {})
    },
    getList() {
      getListByUser(this.user_id).then(res => {
        this.bookDetails = res.data
      })
    },
    loginSubmit() {
      Userlogin(this.loginForm.user_name, this.loginForm.user_pwd).then(res => {
        this.loginFormVisible = false
        this.user_id = res.data.user_id
        this.user_name = res.data.user_name
        showNotify('登录成功')
      }).catch(() => {
        showMessageBox('您输入的账户密码有误,是否已经注册')
      })
      this.$refs['loginForm'].resetFields()
    },
    register() {
      this.registerFormVisible = true
    },
    Cancel() {
      this.registerFormVisible = false
      this.loginFormVisible = false
      this.dialogFormVisible = false
    },
    login() {
      this.loginFormVisible = true
    },
    setBook(val) {
      let obj = {}
      this.book.user_id = this.user_id
      this.book.type_id = val.type_id
      this.book.type_price = val.type_price
      this.book.type_name = val.type_name
      if (val.discount_id === null) {
        this.book.book_price = val.type_price
      } else {
        obj = this.discount.find((item) => {
          return item.discount_id === val.discount_id
        })
        this.book.book_price = parseFloat(val.type_price) * parseFloat(obj.discount_value)
        this.book.dis_value = obj.discount_value
        this.book.dis_reason = obj.discount_reason
      }
    },
    check(val) {
      if (this.user_id !== '') {
        this.detailFormVisible = true
        this.formatterPic(val.type_pic)
        this.show.type_area = val.type_area
        this.show.type_bednum = val.type_bednum
        this.detailTitle = val.type_name
        this.setBook(val)
      } else {
        this.$alert('请先登录', '提示', {
          center: true
        }).then(() => {
          this.loginFormVisible = true
        })
      }
    },
    choose() {
      this.dialogFormVisible = true
    },
    onSubmit() {
      if (validPhone(this.book.book_phone)) {
        add(this.book).then(() => {
          this.loading = true
          this.keep = setInterval(() => { this.getBook() }, 4000)
        }).catch(() => {
          this.$refs['book'].resetFields()
        })
      } else {
        this.$refs['book'].resetFields()
        showMessage('您输入信息有误，请重新输入')
      }
    },
    formatterPicOne(row) {
      if (row !== undefined) {
        const pic = row.split('+')
        return pic[0]
      }
    },
    formatterPic(row) {
      if (row !== undefined) {
        const pic = row.split('+')
        this.pic = pic
      }
    },
    calTime() {
      const stime = this.book.book_arrire
      const etime = this.book.book_leave
      const usedTime = Date.parse(etime) - Date.parse(stime)
      const days = Math.floor(usedTime / (24 * 3600 * 1000))
      this.book.book_day = days
    },
    bookprice(val) {
      let obj = {}
      if (val.discount_id !== null) {
        obj = this.discount.find((item) => {
          return item.discount_id === val.discount_id
        })
        const price = parseFloat(val.type_price) * parseFloat(obj.discount_value)
        return price
      }
    }
  }
}
</script>
<style scope>
.el-carousel{
    margin: 5px;
}
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.el-col {
  margin-left: 10%;
}
.button {
  padding: 0;
  float: right;
}
.el-input {
  width: 46%
}
.details {
  margin-left: 10px;
  font-size:17px
}
.icon-with-text {
  width: 46%;
  display: inline-flex;
  vertical-align: top;
  margin-top: 5%;
  font-size:15px
}
.icon-span {
  margin-left: 7px;
}
.content {
  height: 510px;
  overflow :auto
}
h3 {
  margin-bottom: 0;
  font-size: 15px;
}
h2 {
  font-size: 24px;
}
.el-dialog__header {
  margin-left: 5px;
  padding: 20px 20px 0px;
}
.el-dialog__title {
    line-height: 24px;
    font-size: 24px;
    color: #303133;
}
.el-dialog__body{
  padding: 20px 20px
}
.el-carousel__container {
  position: relative;
  height: 500px;
}
.el-card.is-hover-shadow {
    width: 320px;
}
.el-menu--horizontal>.el-menu-item {
    float: right;
}
</style>
