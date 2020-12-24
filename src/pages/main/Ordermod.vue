<template>
  <div class="ordermod">
    <el-form :model="form">
      <el-form-item label="订单号">
        <span>{{form.orderNo}}</span>
      </el-form-item>
      <el-form-item label="下单时间">
        <el-time-picker v-model="form.orderTime" placeholder="任意时间点"></el-time-picker>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="form.consignee" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="配送地址">
        <el-input v-model="form.deliverAddress" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="送达时间">
        <el-time-picker v-model="form.deliveryTime" placeholder="任意时间点"></el-time-picker>
      </el-form-item>
      <el-form-item label="用户备注">
        <el-input v-model="form.remarks" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="订单金额">
        <el-input-number v-model="form.orderAmount" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="form.orderState" clearable placeholder="请选择">
          <el-option value="已完成">已完成</el-option>
          <el-option value="已受理">已受理</el-option>
          <el-option value="派送中">派送中</el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="esc">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { ordermod, ordermodily } from "@/api/apis";
import { getTime } from "@/utils/utils";

export default {
  data() {
    return {
      id: 0,
      form: {},
      dialogFormVisible: true,
    };
  },
  methods: {
    sure() {
      var str = JSON.stringify(this.form);
      var obj = JSON.parse(str);
      obj.deliveryTime = getTime(obj.deliveryTime);
      obj.orderTime = getTime(obj.orderTime);
      console.log(obj);
      ordermodily(obj).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你,修改成功",
            type: "success",
          });
          this.loadnum()
        }else{
          this.$message.error('修改失败，请稍后再试')
        }
      });
    },
    esc() {
      history.go(-1) ;
    },
    loadnum() {
      this.id = sessionStorage.id;
      ordermod(this.id).then((res) => {
        this.form = res.data.data;
      });
    },
  },
  created() {
    this.loadnum()
  },
};
</script>

<style lang="less" scoped>
.ordermod {
  padding-top: 20px;
  background: #fff;
}
.el-form {
  .el-form-item {
    /deep/label {
      width: 150px;
    }
    .el-input {
      width: 400px;
    }
  }
}
.dialog-footer {
  margin-left: 150px;
}
</style>