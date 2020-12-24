<template>
  <div class="ordersta">
    <p>
      <span>时间范围</span>
      <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >></el-date-picker>
      <el-button type="primary" @click="clickquery">查询</el-button>
    </p>
    <div>
      <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { ordersta } from "@/api/apis";
import { getTime } from "@/utils/utils";
export default {
  data() {
    return {
      value: [new Date("2020-01-01 00:00:00"), new Date("2020-10-10 00:00:00")],
    };
  },

  methods: {
    clickquery() {
      if (this.value) {
        let timestr = JSON.stringify([
          getTime(this.value[0]),
          getTime(this.value[1]),
        ]);
        this.loadnum(timestr);
      } else {
        this.$message.error("未选择时间");
      }
    },
    loadnum(str) {
      let mcharts = echarts.init(document.querySelector("#myChart"));
      ordersta(str).then((res) => {
        if(res.data.data.length == 0){
          this.$message.error('抱歉，该时间段暂无数据，请重新选择')
          this.value = []
          return
        }
        let arr = res.data.data;

        for (let obj of arr) {
          obj.orderTime = getTime(obj.orderTime);
        }
        let option = {
          xAxis: {
            type: "category",
            data: arr.map((obj) => obj.orderTime),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: arr.map((obj) => obj.orderAmount),
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(220, 220, 220, 0.8)",
              },
            },
          ],
        };
        mcharts.setOption(option);
      });
    },
  },
  mounted() {
    let time = JSON.stringify([getTime(this.value[0]), getTime(this.value[1])]);
    this.loadnum(time);
  },
};
</script>

<style lang="less" scoped>
.ordersta {
  padding-bottom: 20px;
  > p {
    margin-bottom: 10px;
    span {
      margin-right: 10px;
    }
    .el-button {
      margin-left: 10px;
    }
  }
}
#myChart {
  background: #fff;
  padding-top: 15px;
}
</style>