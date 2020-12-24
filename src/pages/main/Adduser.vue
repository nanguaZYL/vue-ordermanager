<template>
  <div class="add_user">
    <p>添加账号</p>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="用户组">
        <el-select v-model="form.region" placeholder="请选择用户组">
          <el-option v-for="(item,index) in option" :key="index" :label="item.lebal" :value="item.value"></el-option>
        </el-select>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button @click="clear">重置</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { adduser } from "@/api/apis";
export default {
  data() {
    return {
      form: {
        name: "",
        pwd: "",
        region: "",
      },
      option:[{lebal:'超级管理员',value:'超级管理员'},{lebal:'普通管理员',value:'普通管理员'}]
    };
  },
  methods: {
    onSubmit() {
      // for(let i = 1;i<40;i++){
      //   adduser('user'+i,'pwd'+i,i%2==0?'超级管理员':'普通管理员')
      // }
      if (
        this.form.name.length > 0 &&
        this.form.pwd.length > 0 &&
        this.form.region.length > 0
      ) {
        adduser(this.form.name, this.form.pwd, this.form.region).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: "恭喜你,添加成功",
              type: "success",
            });
            this.form = {
              name: "",
              pwd: "",
              region: "",
            };
          } else {
            this.$message({
              showClose: true,
              message: "添加失败，请稍后再试",
              type: "error",
            });
          }
        });
      } else {
        this.$message.error("账号，密码，用户组不能为空哦！");
      }
    },
    clear() {
      this.form = [];
    },
  },
};
</script>

<style lang="less" scoped>
.add_user {
  background: #fff;
  padding-bottom: 20px;
  > p {
    padding: 15px 0;
    text-indent: 15px;
    border-bottom: 1px solid #eff1f7;
  }
  .el-form-item {
    margin-top: 15px;
    display: flex;
  }
}
</style>