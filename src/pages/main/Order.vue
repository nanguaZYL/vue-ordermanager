<template>
  <div class="order_box">
    <div class="msg">
      <p>
        <span>订单号</span>
        <el-input v-model="form.orderNo" placeholder="订单号"></el-input>
      </p>
      <p>
        <span>收货人</span>
        <el-input v-model="form.consignee" placeholder="收货人"></el-input>
      </p>
      <p>
        <span>手机号</span>
        <el-input v-model="form.phone" placeholder="手机号"></el-input>
      </p>
      <p>
        <span>订单状态</span>
        <el-select v-model="form.orderState" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </p>
    </div>
    <p>
      <span>选择时间</span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" @click="clickquery">查询</el-button>
    </p>

    <!-- 组件数据渲染 -->
    <el-table :data="arr" border>
      <el-table-column prop="orderNo" label="订单号"></el-table-column>
      <el-table-column prop="orderTime" label="下单日期"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="consignee" label="收货人"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间"></el-table-column>
      <el-table-column prop="remarks" label="用户备注"></el-table-column>
      <el-table-column label="订单金额">
        <template slot-scope="scope">
          <span>￥{{scope.row.orderAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderState" label="订单状态"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <a @click="open(scope.row)">查看</a>
          <a @click="open1(scope.row.id)">编辑</a>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      :current-page="currentPage4"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 查询弹框 -->
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column prop="orderNo" label="订单号"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间"></el-table-column>
        <el-table-column prop="phone" label="手机号" class="phone"></el-table-column>
        <el-table-column prop="consignee" label="收货人"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址"></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间"></el-table-column>
        <el-table-column prop="remarks" label="用户备注"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
        <el-table-column prop="orderState" label="订单状态"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { orderlist } from "@/api/apis";
import { getTime } from "@/utils/utils";

export default {
  data() {
    return {
      currentPage4: 1, //当前页码
      total: 0, //总条数
      pageSize: 8, //当前页条数
      form: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "全部",
      },
      date: null,
      value: "",
      arr: [],
      dialogTableVisible: false, //查看显示
      gridData: [], //弹框数据
      options: [
        {
          value: "全部",
          label: "全部",
        },
        {
          value: "已完成",
          label: "已完成",
        },
        {
          value: "派送中",
          label: "派送中",
        },
        {
          value: "已受理",
          label: "已受理",
        },
      ],
    };
  },
  methods: {
    // 加载页面
    loadnum(params) {
      orderlist({
        currentPage: this.currentPage4,
        pageSize: this.pageSize,
        ...params,
      }).then((res) => {
        // res.data.data.map((item) => {
        //   item.orderTime = getdaytime(item.orderTime);
        //   item.deliveryTime = getdaytime(item.deliveryTime);
        // });
        for (let obj of res.data.data) {
          obj.deliveryTime = getTime(obj.deliveryTime);
          obj.orderTime = getTime(obj.orderTime);
        }
        this.arr = res.data.data;
        this.total = res.data.total;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadnum(this.params);
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.loadnum(this.params);
    },
    // 查看
    open(item) {
      this.dialogTableVisible = true;
      this.gridData = [item];
    },
    // 编辑
    open1(id) {
      sessionStorage.id = id;
      location.hash = "/main/ordermod";
    },
    // 查询
    clickquery() {
      let params = { currentPage: this.currentPage4, pageSize: this.pageSize };
      if (this.date) {
        params.date = JSON.stringify([
          getTime(this.date[0]),
          getTime(this.date[1]),
        ]);
      }
      if (this.form.orderNo) params.orderNo = this.form.orderNo;
      if (this.form.consignee) params.consignee = this.form.consignee;
      if (this.form.phone) params.phone = this.form.phone;
      if (this.form.orderState != "全部")
        params.orderState = this.form.orderState;
      this.params = params;
      this.loadnum(params);
    },
  },
  created() {
    this.loadnum();
  },
};
</script>

<style lang="less" scoped>
.order_box {
  background: #fff;
  padding: 15px;
  .msg {
    display: flex;
    p {
      display: flex;
      font-size: 14px;
      align-items: center;
      .el-input,
      .el-select {
        width: 200px;
        margin: 0 10px;
      }
      .el-date-picker {
        width: 400px;
        margin: 0 10px;
      }
    }
  }
  > p {
    margin-top: 10px;
  }
  table {
    margin-top: 15px;
    width: 100%;
    border-collapse: collapse;
    td {
      font-size: 12px;
      color: #a4a7ac;
    }
    .adress {
      flex: 2;
    }
    thead {
      width: 100%;
      tr {
        line-height: 40px;
        border: 1px solid #ebeef5;
        border-right: 0;
        display: flex;
        td {
          flex: 1;
          text-indent: 5px;
          border-right: 1px solid #ebeef5;
        }
      }
    }
    tbody {
      width: 100%;
      tr {
        line-height: 40px;
        border: 1px solid #ebeef5;
        border-right: 0;
        border-top: 0;
        display: flex;
        td {
          flex: 1;
          text-indent: 5px;
          border-right: 1px solid #ebeef5;
          a {
            text-decoration: none;
            padding: 5px;
            color: #78baff;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.el-pagination {
  margin-top: 20px;
}
/deep/.el-dialog {
  width: 80%;
}
.el-table {
  margin-top: 20px;
}
</style>