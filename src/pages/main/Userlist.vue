<template>
  <div class="userlist">
    <p class="top">账号列表</p>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      ref="multipleTable"
      type=" selection "
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column label="账号" width="200">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>

      <el-table-column prop="address" label="用户组" width="200"></el-table-column>

      <el-table-column prop="date" label="创建时间" show-overflow-tooltip></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row,scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      :current-page="currentPage4"
      :page-size="pageSize"
      :page-sizes="[3,6,9,12]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <el-button type="danger" @click="itsmTableCountSelect">批量删除</el-button>
    <el-button type="primary" @click="toggleSelection()">取消选择</el-button>

    <!-- 模态框 -->
    <el-dialog title="编辑资料" :visible.sync="dialogFormVisible">
      <el-form label-width="100px">
        <el-form-item label="账号">
          <el-input v-model="input1" placeholder="分类名称"></el-input>
        </el-form-item>

        <el-form-item label="用户组">
          <el-select v-model="input2" placeholder="请选择用户组">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>

        <p style="text-align:right;">
          <el-button type="primary" @click="clickremove">确认修改</el-button>
        </p>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { userlist, deluser, accmsg, edituser, batch } from "@/api/apis";
import { getnewtime } from "@/utils/utils";
export default {
  data() {
    return {
      currentPage4: 1, //当前页码
      pageSize: 3, //每页数据条数
      total: 0, //总条数
      tableData: [],
      multipleSelection: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      input1: "",
      input2: "",
      loading: true,
    };
  },

  methods: {
    clickremove() {
      edituser(sessionStorage.id, this.input1, this.input2).then((res) => {
        if (res.data.code == 0) {
          this.dialogFormVisible = false;
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.loadnum();
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 编辑
    handleEdit(index, row, id) {
      sessionStorage.id = id;
      accmsg(id).then((res) => {
        this.input1 = res.data.accountInfo.account;
        this.input2 = res.data.accountInfo.userGroup;
        this.dialogFormVisible = true;
      });
    },
    // 删除
    handleDelete(index, id) {
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      }).then(() => {
        deluser(id).then((res) => {
          console.log(res.data.code);
          if (res.data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.tableData.splice(index, 1);
            this.loadnum();
          }
        });
      });
    },
    loadnum() {
      this.loading = true;
      userlist(this.currentPage4, this.pageSize).then((res) => {
        this.total = res.data.total;
        this.loading = false;
        var newarr = res.data.data.map((item) => {
          var time = getnewtime(item.ctime);
          return (item = {
            name: item.account,
            address: item.userGroup,
            date: time,
            id: item.id,
          });
        });
        this.tableData = newarr;
        if (!res.data.data.length && this.currentPage4 !== 1) {
          this.currentPage4 -= 1; // 页码-1
          this.loadnum(); // 重新获取数据
        }
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
    // 取消全选
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    // 批量删除
    itsmTableCountSelect() {
      this.$confirm("此操作将永久删除所选账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      }).then(() => {
        let arr = [];
        this.$refs.multipleTable.selection.forEach((item) => {
          arr.push(item.id);
        });
        if (arr.length > 0) {
          batch(JSON.stringify(arr)).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.loadnum();
            } else {
              this.$message({
                showClose: true,
                message: "删除失败，请稍后再试",
                type: "error",
              });
            }
          });
        } else {
          this.$message.error("还未选择账号");
        }
      }).catch(()=>{
        this.$message.error('未选中账号')
      });
    },
  },
  created() {
    this.loadnum();
  },
};
</script>

<style lang="less" scoped>
.userlist {
  background: #fff;
  > p.top {
    padding: 15px 0;
    text-indent: 15px;
    border-bottom: 1px solid #eff1f7;
  }
  .el-table {
    width: 100%;
    padding: 20px 15px;
    border: 0;
  }
  .el-pagination {
    padding: 20px 15px;
    border: 0;
  }
  > .el-button {
    margin: 10px 5px 20px 15px;
  }
}
.el-form-item {
  .el-input {
    width: 400px;
  }
  .el-select {
    width: 400px;
  }
}
// .el-table {
//   height: 400px;
//   overflow-y:scroll;
// }
</style>