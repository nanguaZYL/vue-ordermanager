<template>
  <el-container>
    <!-- 左边框 -->
    <el-aside width="200px">
      <h3>
        <i class="el-icon-cold-drink"></i>
        外卖商家中心
      </h3>

      <el-menu
        :default-active="hash"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409eff"
        :unique-opened="true"
        router
      >
        <div v-for="(item,index) in newarr" :key="index">
          <el-menu-item v-if="!item.child" :index="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>

          <el-submenu v-else :index="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item
              v-for="(items,index) in item.child"
              :key="index"
              :index="items.index"
            >{{items.name}}</el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <!-- 右边部分 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 左边 -->
        <div>
          <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in topnews" :key="item">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 右边 -->
        <div class="right">
          <p>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{user}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="person">个人中心</el-dropdown-item>
                <el-dropdown-item command="sign">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </p>
          <div class="block">
            <el-avatar :size="40">
              <img :src="imgsrc" @click="tohash" />
            </el-avatar>
          </div>
        </div>
      </el-header>

      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { checktoken, accmsg } from "@/api/apis";

export default {
  data() {
    return {
      sizeList: ["medium"],
      user: "",
      imgsrc: "",
      list: [
        {
          index: "/main/index",
          icon: "el-icon-s-home",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          index: "/main/order",
          icon: "el-icon-document",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        {
          index: "/main/list",
          icon: "el-icon-takeaway-box",
          name: "商品管理",
          child: [
            { index: "/main/list", name: "商品列表" },
            { index: "/main/addgood", name: "商品添加" },
            { index: "/main/ofgoods", name: "商品分类" },
          ],
          roles: ["super", "normal"],
        },

        {
          index: "/main/store",
          icon: "el-icon-office-building",
          name: "店铺管理",
          roles: ["super"],
        },

        {
          index: "/main/userlist",
          icon: "el-icon-takeaway-box",
          name: "账号管理",
          child: [
            { index: "/main/userlist", name: "账号列表" },
            { index: "/main/adduser", name: "添加账号" },
            { index: "/main/changepwd", name: "修改密码" },
          ],
          roles: ["super"],
        },
        {
          index: "/main/comsta",
          icon: "el-icon-pie-chart",
          name: "销售统计",
          child: [
            { index: "/main/comsta", name: "商品统计" },
            { index: "/main/ordersta", name: "订单统计" },
          ],
          roles: ["super"],
        },
      ],
      topnews: [],
      hash: "",
    };
  },
  created() {
    checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        this.user = localStorage.user;
        this.upload();
      } else {
        this.user = "请登录";
      }
    });
    this.$bus.$on("imgupload", () => {
      this.upload();
    });
    this.topnews = this.$route.meta;
    this.hash = this.$route.path;
  },
  computed: {
    // 权限的数组
    newarr() {
      return this.list.filter(item => item.roles.includes(localStorage.role));
    },
  },
  methods: {
    upload() {
      accmsg(localStorage.id).then((res) => {
        this.imgsrc = res.data.accountInfo.imgUrl;
      });
    },
    tohash() {
      location.hash = "/main/person";
    },
    handleCommand(command) {
      if (command === "person") {
        this.tohash();
      } else {
        localStorage.clear();
        location.hash = "/";
      }
    },
  },
  watch: {
    $route(to) {
      this.topnews = to.meta;
    },
  },
};
</script>

<style lang="less" scoped>
@base: #304156;
.el-container {
  height: 100%;
}
.el-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right {
    display: flex;
    align-items: center;
    p {
      font-size: 14px;
      margin-right: 5px;
    }
  }
}

.el-aside {
  background-color: @base;
  color: #333;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
  .el-menu {
    border: 0;
  }
}

.el-main {
  background-color: #f0f2f5;
}
.el-dropdown {
  margin-right: 15px;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>