<template>
  <div class="addgood">
    <p>商品添加</p>
    <div>
      <!-- 左边 -->
      <div class="left">
        <p>
          <span>商品名称</span>
          <el-input v-model="input" placeholder="商品名称"></el-input>
        </p>
        <p>
          <span>商品分类</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :value="item.cateName"
            >{{item.cateName}}</el-option>
          </el-select>
        </p>
        <p>
          <span>商品价格</span>
          <el-input-number v-model="num" :min="0" label="描述文字"></el-input-number>
        </p>
        <p>
          <span>商品图片</span>
          <el-upload
            class="avatar-uploader"
            ref="upload"
            list-type="picture-card"
            :action='imgup'
            :show-file-list="false"
            :auto-upload="false"
            :on-success="success"
            :on-change="imgPreview"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </p>
        <p class="question">
          <span>商品描述</span>
          <el-input type="textarea" :rows="3" v-model="textarea"></el-input>
        </p>
        <p>
          <el-button type="primary" @click="sureadd">添加商品</el-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { query,addgood,imgup } from "@/api/apis";
export default {
  data() {
    return {
      input: "",
      num: 0,
      textarea: "",
      options: [],
      value: "",
      imageUrl: "",
      imgup:'',
    };
  },
  methods: {
    loadquery() {
      query().then((res) => {
        this.options = res.data.categories;
      });
    },
    sureadd() {
      if(this.input.length>0&&this.textarea.length>0&&this.value.length>0){
        this.$refs.upload.submit();
      }else{
        this.$message.error('还有信息未填写着，请核实后再添加');
      }
    },
    success(file){
      console.log(file);
      var obj = {
        name:this.input,
        category:this.value,
        price:this.num,
        imgUrl:file.imgUrl,
        goodsDesc:this.textarea,
      }
      addgood(obj).then(res=>{
        if(res.data.code==0){
          this.$message({
              message: "恭喜你,添加商品成功",
              type: "success",
            });
        }else{
          this.$message.error('添加商品出错，请稍后再试!');
        }
        this.input=''
        this.value=''
        this.textarea=''
        this.num=0
        this.imageUrl=''
      })
    },
    imgPreview(file){
      this.imageUrl=file.url
    }
  },
  created() {
    this.loadquery();
    this.imgup = imgup
  },
};
</script>

<style lang="less" scoped>
.addgood {
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
        font-size: 14px;
        display: flex;
        margin-left: 20px;
        margin-bottom: 10px;
        text-align: left;
        span {
          margin-right: 20px;
        }
        .el-input {
          width: 250px;
        }
        .el-select {
          width: 250px;
        }
      }
      .question {
        .el-textarea {
          width: 400px;
        }
      }
      p:first-child {
        .el-input {
          width: 380px;
        }
      }
    }
  }
}
textarea {
  padding: 0;
  margin: 0;
}
img{
  width: 100%;
  height: 100%;
}
</style>