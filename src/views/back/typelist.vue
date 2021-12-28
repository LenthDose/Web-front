<template lang="">
  <div class="container">
    <el-button type="success" size="primary" style="margin-bottom: 1%;" @click="add">增加</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 85%"
    >
      <el-table-column
        :show-overflow-tooltip="true"
        prop="type_id"
        label="类型编号"
      />
      <el-table-column
        prop="type_name"
        label="类型名称"
      />
      <el-table-column
        prop="type_count"
        label="房间数"
      />
      <el-table-column
        prop="type_bednum"
        label="床数(张)"
      />
      <el-table-column
        prop="type_area"
        label="面积"
      />
      <el-table-column
        prop="type_desc"
        label="描述"
      />
      <el-table-column
        prop="type_price"
        label="价格（元）"
      />
      <el-table-column
        prop="type_pic"
        label="图片"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 50px"
            :src="formatterPicOne(scope.row.type_pic)"
            :preview-src-list="formatterPic(scope.row.type_pic)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="discount_id"
        label="折扣"
      >
        <template slot-scope="scope">
          <span
            v-for="item in discount"
            v-show="scope.row.discount_id == item.discount_id"
            :key="item.discount_id"
            :value="item.discount_id"
          >
            {{ item.discount_reason }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <div>
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
            >编辑
            </el-button>
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

    <el-dialog :title="dialogTitle" width="30%" :visible.sync="addFormVisible">
      <el-form ref="type" :model="type">
        <el-form-item label="类型名称" prop="type_name">
          <el-input v-model="type.type_name" />
        </el-form-item>
        <el-form-item label="房间数" prop="type_count">
          <el-input v-model="type.type_count" />
        </el-form-item>
        <el-form-item label="床数" prop="type_bednum">
          <el-input v-model="type.type_bednum" />
        </el-form-item>
        <el-form-item label="面积" prop="type_area">
          <el-input v-model="type.type_area" />
        </el-form-item>
        <el-form-item label="描述" prop="type_desc">
          <el-input v-model="type.type_desc" />
        </el-form-item>
        <el-form-item label="价格（元）" prop="type_price">
          <el-input v-model="type.type_price" />
        </el-form-item>
        <el-form-item label="折扣" prop="discount_id">
          <el-select v-model="type.discount_id" placeholder="请选择" style="margin-top: 10px">
            <el-option
              v-for="item in discount"
              :key="item.discount_id"
              :label="item.discount_reason"
              :value="item.discount_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="图片" prop="type_bednum">
          <el-upload
            v-model="type.type_pic"
            class="upload-demo"
            drag
            action="/hotel/type/uploadpic"
            :on-success="handleAvatarSuccess"
            multiple
            style="margin-top: 10px"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>
import { add, deleteType, getTypeList, ChangeType } from '@/api/type'
import { getDiscount } from '@/api/discount'
import { showNotify } from '@/api/notifty'
export default {
  data() {
    return {
      pageCurrent: 1,
      pageSize: 10,
      pageTotal: 0,
      type: {},
      tableData: [{}],
      dialogTitle: '',
      addFormVisible: false,
      url: '',
      srcList: [],
      discount: [{}]
    }
  },
  mounted() {
    this.TypeList()
    this.DiscuntList()
  },
  methods: {
    TypeList() {
      getTypeList(this.pageCurrent, this.pageSize).then(res => {
        this.tableData = res.data.records
        this.pageTotal = res.data.total
      })
    },
    DiscuntList() {
      getDiscount().then(res => {
        this.discount = res.data
      })
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
        return pic
      }
    },
    add() {
      this.dialogTitle = '添加'
      this.addFormVisible = true
    },
    handleAvatarSuccess(res) {
      if (this.type.type_pic !== undefined) {
        var oldUrl = this.type.type_pic
        this.type.type_pic = oldUrl + '+' + res.data
      } else {
        this.type.type_pic = res.data
      }
    },
    handleEdit(row) {
      this.dialogTitle = '编辑'
      this.type = row
      this.addFormVisible = true
    },
    handleDelete(row) {
      this.$confirm(`确定删除${row.type_name}吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        deleteType(row.type_id).then(res => {
          showNotify(res.data)
          this.TypeList()
        })
      }).catch(() => {})
    },
    onSubmit() {
      if (this.dialogTitle === '添加') {
        add(this.type).then(res => {
          showNotify(res.data)
          this.TypeList()
          this.addFormVisible = false
          this.$refs['type'].resetFields()
        }).catch(() => {
          this.$refs['type'].resetFields()
        })
      }
      if (this.dialogTitle === '编辑') {
        ChangeType(this.type).then(res => {
          showNotify(res.data)
          this.TypeList()
          this.addFormVisible = false
          this.$refs['type'].resetFields()
        }).catch(() => {
          this.$refs['type'].resetFields()
        })
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.TypeList()
    },
    handleCurrentChange(val) {
      this.pageCurrent = val
      this.TypeList()
    }
  }
}
</script>
<style lang="css">
 .container {
   margin-left:14%;
    margin-top: 5%;
 }
 .el-form-item{
     margin: 0;
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
