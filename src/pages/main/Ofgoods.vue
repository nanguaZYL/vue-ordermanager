<template>
  <div class="ofgood">
    <p>
      <span>商品分类</span>
      <el-button type="primary" @click="dialogFormVisible = true">添加分类</el-button>

      <!-- 添加分类 -->
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="分类名称" label-width="120px">
            <el-input v-model="form.name" placeholder="分类名称" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" label-width="120px">
            <el-switch v-model="form.value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="clickadd">确 定</el-button>
        </div>
      </el-dialog>
    </p>

    <!-- :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>

      <el-table-column label="分类名称">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.name}}</span>
          <el-input v-model="scope.row.name" v-show="scope.row.isedit"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="是否启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="!scope.row.isedit"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :type="scope.row.isedit==false?'':'success'"
            @click="clickBtn(scope.row)"
          >{{scope.row.isedit==false?'编辑':'完成'}}</el-button>
          <el-button size="mini" type="danger" @click="clickDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5,10,15,20]"
      :page-size="pageSize"
      layout="total, sizes,prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>


<script>
import { ofgood, delgood, editcate, adddata } from "@/api/apis";
export default {
  data() {
    return {
      dialogFormVisible: false,
      pageSize: 5,
      currentPage4: 1,
      total: 0,
      form: {
        name: "",
        value: true,
      },
      button: "",
      tableData: [],
      search: "",
    };
  },
  methods: {
    // 点击编辑
    clickBtn(item) {
      if (item.isedit) {
        editcate(item.id, item.name, item.state).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: "恭喜你,修改成功",
              type: "success",
            });
            this.loadnum();
          } else {
            this.$message.error("修改失败，请稍后再试");
            this.loadnum();
          }
        });
        item.isedit = false;
      } else {
        item.isedit = true;
      }
    },
    // 点击删除
    clickDel(row) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          delgood(row.id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.loadnum();
            }
            // else {
            //   this.$message({
            //     showClose: true,
            //     message: "删除失败，请稍后再试",
            //     type: "error",
            //   });
            // }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
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
    clickadd() {
      if (this.form.name.length > 0) {
        adddata(this.form.name, this.form.value).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.dialogFormVisible = false;
            this.loadnum();
            this.form = { name: "", value: true };
          }
        });
      } else {
        this.$message.error("分类名称不能为空哦！");
      }
    },
    loadnum() {
      ofgood(this.currentPage4, this.pageSize).then((res) => {
        this.total = res.data.total;
        var newarr = res.data.data.map((item) => {
          return (item = {
            id: item.id,
            name: item.cateName,
            state: (item = item.state == 1),
            isedit: false,
          });
        });
        this.tableData = newarr;
         if (!res.data.data.length && this.currentPage4 !== 1) {
          this.currentPage4 -= 1; // 页码-1
          this.loadnum(); // 重新获取数据
        }
      });
    },
  },
  created() {
    this.loadnum();
  },
};
</script>

<style lang="less" scoped>
.ofgood {
  background: #fff;
  padding-bottom: 20px;
  > p {
    display: flex;
    padding: 15px;
    border-bottom: 1px solid #eff1f7;
    align-items: center;
    span {
      flex: 1;
    }
    .el-input {
      margin-right: 15px;
    }
  }
  .el-pagination {
    margin-top: 15px;
  }
}
.el-form-item {
  display: flex;
  .el-input {
    width: 400px;
  }
}
</style>