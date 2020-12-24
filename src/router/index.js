// 引入核心库
import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/Login.vue'
import {checktoken} from '@/api/apis'
// 全局注册路由
Vue.use(Router)

// const originalPush = Router.prototype.push

// Router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

var router = new Router({
    routes:[
        // 登录
        {
        path:'/',
        name:'/login',
        component:login
        },
        //主体框架
        {
            path:'/main',
            name:'/main',
            component:()=>import('../pages/Main'),
            children:[
                // 二级首页
                {
                    path:'/main/index',
                    name:'/main/index',
                    component:()=>import('../pages/main/Index'),
                    meta:['首页']
                },
                //订单管理
                {
                    path:'/main/order',
                    name:'/main/order',
                    component:()=>import('../pages/main/Order'),
                    meta:['首页','订单管理']
                },
                //商品列表
                {
                    path:'/main/list',
                    name:'/main/list',
                    component:()=>import('../pages/main/Goodlists'),
                    meta:['首页','商品管理','商品列表']
                },
                // 商品添加
                {
                    path:'/main/addgood',
                    name:'/main/addgood',
                    component:()=>import('../pages/main/Addgood'),
                    meta:['首页','商品管理','商品添加']
                },
                // 商品分类
                {
                    path:'/main/ofgoods',
                    name:'/main/ofgoods',
                    component:()=>import('../pages/main/Ofgoods'),
                    meta:['首页','商品管理','商品分类']
                },
                // 店铺管理
                {
                    path:'/main/store',
                    name:'/main/store',
                    component:()=>import('../pages/main/Storemange'),
                    meta:['首页','店铺管理']
                },
                // 账号列表
                {
                    path:'/main/userlist',
                    name:'/main/userlist',
                    component:()=>import('../pages/main/Userlist'),
                    meta:['首页','账号管理','账号列表']
                },
                // 添加账号
                {
                    path:'/main/adduser',
                    name:'/main/adduser',
                    component:()=>import('../pages/main/Adduser'),
                    meta:['首页','账号管理','添加账号']
                },
                // 修改密码
                {
                    path:'/main/changepwd',
                    name:'/main/changepwd',
                    component:()=>import('../pages/main/Changepwd'),
                    meta:['首页','账号管理','修改密码']
                },
                // 商品统计
                {
                    path:'/main/comsta',
                    name:'/main/comsta',
                    component:()=>import('../pages/main/Comsta'),
                    meta:['首页','销售统计','商品统计']
                },
                // 订单统计
                {
                    path:'/main/ordersta',
                    name:'/main/ordersta',
                    component:()=>import('../pages/main/Ordersta'),
                    meta:['首页','销售统计','订单统计']
                },
                // 个人中心
                {
                    path:'/main/person',
                    name:'/main/person',
                    component:()=>import('../pages/main/Percenter'),
                    meta:['首页','个人中心']
                },
                // 订单编辑
                {
                    path:'/main/ordermod',
                    name:'/main/ordermod',
                    component:()=>import('../pages/main/Ordermod'),
                    meta:['首页','订单管理','订单编辑']
                }
            ]
        }
    ]
})

// 路由拦截
router.beforeEach((to,from,next)=>{
    if(to.path != '/'){
        checktoken(localStorage.token).then(res=>{
            if(res.data.code == 0)
                next()
            else
                next('/')
        })
    }else{
        next()
    }
})

export default router