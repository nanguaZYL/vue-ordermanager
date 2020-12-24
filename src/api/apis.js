import axios from 'axios'

const ip = 'http://3i1m162315.qicp.vip'
axios.defaults.baseURL = ip

// 商品图片上传接口地址
export const imgup = ip + '/goods/goods_img_upload'
//商品图片地址
export const imgadr = ip + '/upload/imgs/goods_img'
// 用户头像上传接口
export const userimg = ip + '/users/avatar_upload'
// 商铺图片地址
export const shopimg = ip + '/upload/shop/'
// 店铺图片上传接口
export const shopUpImg = ip + '/shop/upload'

// 登录接口
// account:用户名
// password:密码
export let login = (account, password) => axios.post('/users/checkLogin', {
    account,
    password
})

// 添加账号
// account:用户名 password：密码 userGroup：用户组
export let adduser = (account, password, userGroup) => axios.post('/users/add', {
    account,
    password,
    userGroup
})

// 获取账号列表
// currentPage:当前页码  pageSize:每页条数
export let userlist = (currentPage, pageSize) => axios.get('/users/list', {
    params: {
        currentPage,
        pageSize
    }
})

// 删除账号
// id
export let deluser = id => axios.get('/users/del', {
    params: {
        id
    }
})

// 获取个人账号信息
// id
export let accmsg = id => axios.get('/users/accountinfo', {
    params: {
        id
    }
})

// 修改账号
// id
// account账号
// userGroup用户组
export let edituser = (id, account, userGroup) => axios.post('/users/edit', {
    id,
    account,
    userGroup
})

// 检查旧密码是否正确
// oldPwd：旧密码
// id
export let oldpwd = (oldPwd, id) => axios.get('/users/checkoldpwd', {
    params: {
        oldPwd,
        id
    }
})

// 修改密码
// newPwd:新密码
// id
export let editpwd = (newPwd, id) => axios.post('/users/editpwd', {
    newPwd,
    id
})


// 批量删除账号
// ids:要删除数据的id组成的数组（字符串格式的数组，如: ‘[1, 2, 3]’,需要转为字符串格式）
export let batch = ids => axios.get('/users/batchdel', {
    params: {
        ids
    }
})


// 删除商品
// id
export let delGood = id => axios.get('/goods/del', {
    params: {
        id
    }
})

// 获取分类
// currentPage:当前页码  pageSize:每页条数
export let ofgood = (currentPage, pageSize) => axios.get('/goods/catelist', {
    params: {
        currentPage,
        pageSize
    }
})

// 添加分类
// cateName:分类名称  state:是否启用
export let adddata = (cateName, state) => axios.post('/goods/addcate', {
    cateName,
    state
})

// 删除分类
// id
export let delgood = id => axios.get('/goods/delcate', {
    params: {
        id
    }
})

// 修改分类
// id、cateName:分类名、state：状态
export let editcate = (id, cateName, state) => axios.post('/goods/editcate', {
    id,
    cateName,
    state
})

// 添加商品
export let addgood = (obj) => axios.post('/goods/add', obj)

// 查询所有分类
export let query = () => axios.get('/goods/categories')

// 修改商品
// name名字,category分类,price价格,imgUrl图片,goodsDesc描述,id
export let removegood = (obj) => axios.post('/goods/edit', obj)




// 获取订单列表接口(带查询功能)
// 必填currentPage页码 pageSize当前页条数
// 可不填orderNo订单号 consignee收货人 phone手机号 orderState订单状态 date日期
export let orderlist = (params) => axios.get('/order/list', {
    params
})


// 获取订单详情
// id
export let ordermod = (id) => axios.get('/order/detail', {
    params: {
        id
    }
})

// 修改订单
export let ordermodily = (obj) => axios.post('/order/edit', obj)

// 检查token接口
// token:本地存储的token
export let checktoken = token => axios.get('/users/checktoken', {
    params: {
        token
    }
})


// 获取商品列表
// currentPage:当前页码
// pageSize:每页条数
export let goodlist = (currentPage, pageSize) => axios.get('/goods/list', {
    params: {
        currentPage,
        pageSize
    }
})


// 获取店铺详情
export let shopinfo = () => axios.get('/shop/info')

// 店铺内容修改
export let shopedit = (params) => axios.post('/shop/edit', params)

// 首页报表
export let indexlist = () => axios.get('/order/totaldata')

// 订单报表接口
export let ordersta = (date) => axios.get('/order/ordertotal', {
    params: {
        date
    }
})