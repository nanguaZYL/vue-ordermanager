<template>
  <div class="changepwd">
    <p>修改密码</p>
    <div>
      <!-- 左边 -->
      <div class="left">
        <p>原密码</p>
        <p>新密码</p>
        <p>确认新密码</p>
      </div>
      <!-- 右边 -->
      <div class="right">
        <p>
          <el-input v-model="oldpwd"  @blur="blurfns"></el-input>
          <span v-if="show">原密码不正确，请输入正确的原密码</span>
        </p>
        <p>
          <el-input v-model="newpwd"></el-input>
        </p>
        <p>
          <el-input v-model="input" @blur="blurspan"></el-input>
          <span v-if="btn">与新密码不相同</span>
        </p>
        <p>
          <el-button type="primary" @click="clickbtn">确认</el-button>
          <el-button @click="remove">重置</el-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { oldpwd, editpwd } from "@/api/apis";
export default {
  data() {
    return {
      oldpwd: "",
      newpwd: "",
      input: "",
      show: false,
      btn: false,
    };
  },
  methods: {
    blurfns() {
      if (this.oldpwd) {
        console.log(this.oldpwd);
        oldpwd(this.oldpwd, localStorage.id).then((res) => {
          if (res.data.code == 0) {
            this.show = false;
          } else {
            this.show = true;
          }
        });
      }else{
        this.show=false
      }
    },
    blurspan() {
      if (this.newpwd === this.input) {
        this.btn = false;
      } else {
        this.btn = true;
      }
    },
    // onInputFocus() {
    //   if (this.show == true) {
    //     console.log(1);
    //   }
    // },
    clickbtn() {
      if (
        this.oldpwd.length > 0 &&
        this.newpwd.length > 0 &&
        this.input.length > 0
      )
        if (this.show == false && this.btn == false) {
          editpwd(this.newpwd, localStorage.id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.input = "";
              this.oldpwd = "";
              this.newpwd = "";
            } else {
              this.$message({
                showClose: true,
                message: "修改失败,请稍后再试",
                type: "error",
              });
            }
          });
        } else {
          this.$message.error("请核实后再修改");
        }
    },
    remove() {
      this.oldpwd = "";
      this.newpwd = "";
      this.input = "";
      this.show = false;
      this.btn = false;
    },
  },
};
</script>

<style lang="less" scoped>
.changepwd {
  background: #fff;
  padding-bottom: 20px;
  > p {
    padding: 15px 0;
    text-indent: 15px;
    border-bottom: 1px solid #eff1f7;
  }
  > div {
    display: flex;
    p {
      color: #b0b1b3;
      line-height: 60px;
    }
    .left {
      flex: 1;
      p {
        text-align: right;
      }
    }
    .right {
      flex: 8;
      p {
        margin-left: 20px;
        .el-input {
          width: 250px;
        }
        .el-select {
          width: 250px;
        }
      }
    }
  }
}
span {
  font-size: 14px;
  color: red;
}
</style>