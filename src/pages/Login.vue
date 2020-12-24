<template>
  <div class="box">
    <div>
      <h2>登录系统</h2>
      <el-input prefix-icon="el-icon-user-solid" v-model="acc"></el-input>
      <el-input prefix-icon="el-icon-lock" v-model="pwd" type="password" show-password></el-input>
      <p v-if="flog">{{text}}</p>
      <el-button type="primary" @click="clicklogin">登录</el-button>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/apis";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      flog: false,
      text: "",
    };
  },
  methods: {
    clicklogin() {
      if (this.acc.length < 1 && this.pwd.length < 1) {
        this.flog = true;
        this.text = "用户名和密码不能为空";
      } else {
        login(this.acc, this.pwd).then((res) => {
          if (res.data.code == 0) {
            // 成功
            localStorage.token = res.data.token;
            localStorage.user = this.acc;
            localStorage.role = res.data.role;
            localStorage.id = res.data.id;
            this.$router.push("/main/index");
            this.$message({
              message: "恭喜你,登录成功",
              type: "success",
            });
          } else {
            // 失败
            this.flog = true;
            this.text = "用户名或密码不正确";
          }
        });
      }
    }
  },
};
</script>

<style lang="less" >
.box {
  width: 100%;
  height: 100%;
  background: #2d3a4b;
  > div {
    width: 400px;
    height: 300px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    h2 {
      text-align: center;
      color: #eeeeee;
      margin-bottom: 20px;
    }
    input {
      background: #283443;
      outline: none;
      margin: 10px 0;
      color: #fff;
    }
    button {
      margin-top: 25px;
      width: 100%;
    }
  }
  p {
    color: red;
    font-size: 14px;
    position: absolute;
  }
}
</style>