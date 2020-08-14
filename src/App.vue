<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less'>
#app {
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
}
ul {
  list-style: none;
}
.el-form-item__content {
  margin-left: 0 !important;
  .upload-demo {
    display: flex;
  }
  ul {
    display: flex;
    li {
      width: 0;
      margin: 5px !important;
    }
  }
}
</style>
