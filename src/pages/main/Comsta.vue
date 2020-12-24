<template>
  <div class="comsta">
    <p>
      <span>时间范围</span>
      <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >></el-date-picker>
      <el-button type="primary">查询</el-button>
    </p>
    <template>
      <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [new Date("2020-01-01 00:00:00"), new Date("2020-10-10 00:00:00")],
    };
  },
};
</script>

<style lang="less" scoped>
.comsta {
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