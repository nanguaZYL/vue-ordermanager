<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>店铺管理</span>
        <el-button
          @click="disTrue"
          style="float: right; padding: 10px 20px"
          :type="primary"
          size="small"
        >{{disabled?'编辑':'保存'}}</el-button>
      </div>

      <!-- 店铺名称  -->
      <el-row>
        <el-col :span="10">
          店铺名称
          <el-input v-model="name" placeholder="店铺名称" :disabled="disabled"></el-input>
        </el-col>
      </el-row>
      <!-- 店铺广告 -->
      <el-row>
        店铺公告
        <el-col :span="8">
          <el-input
            v-model="bulletin"
            type="textarea"
            :rows="6"
            placeholder="商品描述"
            :disabled="disabled"
          ></el-input>
        </el-col>
      </el-row>
      <!-- 店铺头像 -->
      <el-row>
        店铺头像
        <el-col :span="8">
          <div class="inner">
            <el-upload
              :action="shopUpImg"
              :on-success="shopUpheadSuccess"
              :show-file-list="false"
              :disabled="disabled"
            >
              <img width="100%" :src="avatar == '' ? '' : shopimg+ avatar" alt />
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <!-- 店铺图片 -->
      <el-row>
        店铺图片
        <el-col :span="8">
          <div class="inner">
            <el-upload
              :action="shopUpImg"
              list-type="picture-card"
              :on-success="shopUpimgsSuccess"
              :on-remove="removeimg"
              :file-list="files"
              :disabled="disabled"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <!-- 配送费  -->
      <el-row>
        <el-col :span="10">
          配送费
          <div class="distribution">
            <el-input v-model="deliveryPrice" placeholder="配送费" :disabled="disabled"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 配送时间  -->
      <el-row>
        <el-col :span="10">
          配送时间
          <el-input v-model="deliveryTime" placeholder="配送时间" :disabled="disabled"></el-input>
        </el-col>
      </el-row>
      <!-- 配送描述  -->
      <el-row>
        <el-col :span="10">
          配送描述
          <el-input v-model="description" placeholder="配送描述" :disabled="disabled"></el-input>
        </el-col>
      </el-row>
      <!-- 店铺评分  -->
      <el-row>
        <el-col :span="10">
          店铺评分
          <el-input v-model="score" placeholder="店铺评分" :disabled="disabled"></el-input>
        </el-col>
      </el-row>
      <!-- 销量  -->
      <el-row>
        <el-col :span="10">
          销量
          <div class="sales">
            <el-input v-model="sellCount" placeholder="销量" :disabled="disabled"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 活动 -->
      <el-row>
        活动
        <el-col :span="8">
          <div class="sales">
            <el-checkbox-group v-model="supports" :disabled="disabled">
              <el-checkbox v-for="(item,index) in state" :key="index" :label="item"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>
      </el-row>
      <!-- 营业时间 -->
      <el-row>
        <el-col :span="10">
          营业时间
          <div class="time">
            <el-time-picker
              is-range
              :disabled="disabled"
              v-model="date"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { shopinfo, shopimg, shopUpImg, shopedit } from "@/api/apis";
import { getTime } from "@/utils/utils";
export default {
  data() {
    return {
      name: "", //店铺名字
      bulletin: "", //店铺公告
      avatar: "", //店铺头像
      deliveryPrice: 0, //配送费
      deliveryTime: 0, //送达时间
      description: "", //描述
      score: 0, //评分
      sellCount: 0, //销量
      supports: [], //活动
      pics: [], //店铺图片
      date: [], //营业时间

      disabled: true,
      primary: "primary",
      files: [],
      state: [
        "在线支付满28减5",
        "VC无限橙果汁全场8折",
        "单人精彩套餐",
        "特价饮品8折抢购",
        "单人特色套餐",
      ],
    };
  },
  methods: {
    disTrue() {
      if (!this.disabled) {
        var params = {
          id: this.id,
          name:this.name,
          bulletin: this.bulletin,
          avatar: this.avatar,
          deliveryPrice: this.deliveryPrice,
          deliveryTime: this.deliveryTime,
          description: this.description,
          score: this.score,
          sellCount: this.sellCount,
          supports: JSON.stringify(this.supports),
          pics: JSON.stringify(this.pics),
          date: JSON.stringify([getTime(this.date[0]), getTime(this.date[1])]),
        };
        shopedit(params).then((res) => {
          if(res.data.code==0){
            this.$message({
               message: "恭喜你,修改店铺信息成功",
              type: "success",
            })
          }else{
            this.$message.error('很抱歉，修改失败，请稍后再试')
          }
        });
      }
      this.disabled = !this.disabled;
      this.primary = this.disabled?'primary':'success'
    },
    // 店铺头像上传成功回调
    shopUpheadSuccess(res) {
      if (res.code == 0) {
        this.avatar = res.imgUrl;
        this.$message({
          type: "success",
          message: "店铺头像上传成功",
        });
      }
    },
    // 店铺图片上传成功回调
    shopUpimgsSuccess(res) {
      if (res.code == 0) {
        this.pics.push(res.imgUrl); //把上传的图片加到pics中
      }
    },
    // 移除店铺图片
    removeimg(res) {
      this.pics.splice(this.pics.indexOf(res.name), 1);
    },
  },
  created() {
    this.shopUpImg = shopUpImg; //图片上传接口
    this.shopimg = shopimg; //图片地址
    shopinfo().then((res) => {
      for (let key in res.data.data) {
        this[key] = res.data.data[key];
      }

      //回填照片墙图片
      this.files = this.pics.map((imgstr) => {
        return {
          name: imgstr,
          url: shopimg + imgstr,
        };
      });
    });
  },
};
</script>

<style lang="less" scoped>
.el-col {
  display: flex;
  align-items: center;
  .el-input,
  .el-textarea,
  .el-select {
    flex: 1;
    margin-left: 5px;
  }
  .el-input-number,
  .inner {
    margin-left: 5px;
  }
}
.el-row {
  margin: 20px 0;
  display: flex;
  .el-upload,
  .time {
    margin-left: 5px;
  }
  .el-button {
    margin-left: 100px;
  }
  .distribution {
    margin-left: 15px;
  }
  .sales {
    margin-left: 31px;
  }
  .el-checkbox {
    margin-bottom: 15px;
  }
}

// 上传图片样式
</style>