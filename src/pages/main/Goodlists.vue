<template>
  <div class="good_box">
    <p>商品列表</p>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.desc+'元' }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <img :src="props.row.src" alt style="width:80px;height:80px;" />
            </el-form-item>
            <el-form-item label="店铺评价">
              <span>{{ props.row.evaluation }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.time }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sales }}</span>
            </el-form-item>
            <el-form-item label="商品描述" class="desc">
              <span class="desc">{{ props.row.shop }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="shopId"></el-table-column>
      <el-table-column label="商品价格" >
        <span slot-scope="scope">{{scope.row.desc+'元'}}</span>
      </el-table-column>

      <el-table-column label="商品图片" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.src" alt style="width:80px;height:80px;" />
        </template>
      </el-table-column>

      <el-table-column label="商品描述" prop="shop"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 模态框 -->
    <el-dialog title="编辑商品" :visible.sync="dialogFormVisible" class="markbox">
      <el-form label-width="100px" width="300px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="form.category"></el-input>
        </el-form-item>
        <el-form-item label="所属分类">
          <el-select v-model="form.goodsDesc" placeholder="请选择所属分类">
            <el-option
              v-for="(item,index) in arr"
              :key="index"
              :label="item.cateName"
              :value="item.cateName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            ref="upload"
            list-type="picture-card"
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            :show-file-list="false"
            :on-change="imgPreview"
            :auto-upload="false"
            :on-success="success"
          >
            <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar" slot="trigger" />
          </el-upload>
          <!-- <template> -->
        </el-form-item>
        <p style="text-align:right;">
          <el-button type="primary" @click="clickremove">确认修改</el-button>
          <el-button type="danger" @click="Cancel">取消修改</el-button>
        </p>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  goodlist,
  delGood,
  query,
  removegood,
  imgadr,
  imgup,
} from "@/api/apis";
import { getTime } from "@/utils/utils";
export default {
  data() {
    return {
      currentPage4: 1, //页码数
      total: 0, //总条数
      pageSize: 10, //每页条数
      tableData: [],
      form: {
        name: "",
        category: "",
        price: 0,
        imgUrl: "",
        goodsDesc: "",
        url: "",
      },
      category: "",
      arr: [],
      imageUrl: "",
      dialogFormVisible: false,
      isnewimg: false, //是否更换图片
      imgadr: "", //图片地址接口
      imgup: "", //图片上传接口
    };
  },
  methods: {
    // 确认修改商品
    clickremove() {
      if (this.isnewimg) {
        this.$refs.upload.submit();
      } else {
        var obj = {
          name: this.form.name,
          category: this.form.goodsDesc,
          price: this.form.price,
          imgUrl: this.form.imgUrl,
          goodsDesc: this.form.category,
          id: this.form.id,
        };
        removegood(obj).then((res) => {
          if (res.data.code == 0) {
            this.dialogFormVisible = false;
            this.$message({
              message: "恭喜你,修改成功",
              type: "success",
            });
            this.loadnum();
          } else {
            this.dialogFormVisible = false;
            this.$message.error("修改失败，请重新修改");
          }
        });
      }
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = {
        name: row.name,
        category: row.category,
        price: row.desc,
        imgUrl: row.src,
        goodsDesc: row.shopId,
        id: row.id,
      };
      query().then((res) => {
        this.arr = res.data.categories;
      });
    },
    // 取消编辑
    Cancel(){
      this.dialogFormVisible=false
      this.$message('已经取消修改');
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除所选商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      }).then(() => {
        delGood(row.id).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.loadnum();
          }
        });
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadnum();
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.loadnum();
    },
    // 加载页面
    loadnum() {
      goodlist(this.currentPage4, this.pageSize).then((res) => {
        this.total = res.data.total;
        var newarr = res.data.data.map((item) => {
          var src = imgadr + "/" + item.imgUrl;
          return (item = {
            id: item.id,
            name: item.name,
            category: item.goodsDesc,
            desc: item.price,
            shop: item.goodsDesc,
            shopId: item.category,
            evaluation: item.rating,
            sales: item.sellCount,
            time: getTime(item.ctime),
            src,
          });
        });
        this.tableData = newarr;
        if (!res.data.data.length && this.currentPage4 !== 1) {
          this.currentPage4 -= 1; // 页码-1
          this.loadnum(); // 重新获取数据
        }
      });
    },
    // 选中图片
    imgPreview(file) {
      this.form.imgUrl = file.url;
      this.isnewimg = true;
    },
    // 图片上传成功
    success(img) {
      var obj = {
        name: this.form.name,
        category: this.form.goodsDesc,
        price: this.form.price,
        imgUrl: img.imgUrl,
        goodsDesc: this.form.category,
        id: this.form.id,
      };
      removegood(obj).then((res) => {
        if (res.data.code == 0) {
          this.dialogFormVisible = false;
          this.$message({
            message: "恭喜你,修改成功",
            type: "success",
          });
          this.loadnum();
        } else {
          this.dialogFormVisible = false;
          this.$message.error("修改失败，请重新修改");
        }
      });
    },
  },
  created() {
    this.loadnum();
    this.imgadr = imgadr;
    this.imgup = imgup;
  },
};
</script>

<style lang="less" scoped>
.good_box {
  background: #fff;
  padding-bottom: 15px;
  > p {
    padding: 15px 0;
    text-indent: 15px;
    border-bottom: 1px solid #eff1f7;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-pagination {
  margin: 20px;
}
.markbox {
  .el-form-item {
    display: flex;
    .el-input {
      width: 300px;
    }
  }
}
img {
  width: 100%;
  height: 100%;
}
</style>