<template>
  <div class="person">
    <p>管理员信息</p>
    <ul>
      <li>
        管理员ID：
        <span>{{arr.id}}</span>
      </li>
      <li>
        账号:
        <span>{{arr.name}}</span>
      </li>
      <li>
        用户组:
        <span>{{arr.group}}</span>
      </li>
      <li>
        创建时间:
        <span>{{arr.time}}</span>
      </li>
      <li class="imgs">
        <span>管理员头像:</span>
        <el-upload
          class="avatar-uploader"
          ref="upload"
          :action="userimg"
          :show-file-list="false"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
          :on-change="imgPreview"
          :auto-upload="false"
          :data="uploaddata"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </li>
      <li>
        <el-button size="small" type="success" @click="submitUpload">提交头像</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
import { accmsg,userimg } from "@/api/apis";
import { getnewtime } from "@/utils/utils";
export default {
  data() {
    return {
      arr: {},
      uploaddata: {},
      action: "",
      imageUrl: "",
      userimg:'',//用户上传头像接口
    };
  },
  methods: {
    loadnum() {
      accmsg(localStorage.id).then((res) => {
        var item = res.data.accountInfo;
        this.arr = {
          id: item.id,
          name: item.account,
          group: item.userGroup,
          time: getnewtime(item.ctime),
          src: item.imgUrl,
        };
      });
    },
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.$bus.$emit("imgupload");
         this.$message({
              message: "恭喜你,修改成功",
              type: "success",
            });
      }else{
        this.$message.error('修改失败，请稍后再试')
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    // cahnge事件
    imgPreview(file) {
      this.imageUrl = file.url
    },
  },
  created() {
    this.uploaddata = { id: localStorage.id };
    this.loadnum();
    this.userimg = userimg
  },
};
</script>

<style lang="less" scoped>
.person {
  background: #fff;
  padding-bottom: 5px;
  > p {
    padding: 15px 0;
    text-indent: 15px;
    border-bottom: 1px solid #eff1f7;
    color: #5c5d5e;
  }
  ul {
    margin-left: 15px;
    li {
      font-size: 16px;
      line-height: 60px;
      border-bottom: 1px solid #dcdfe6;
      color: #5c5d5e;
    }
    .imgs {
      display: flex;
      align-items: center;
      border: 0;
      margin: 15px 0;
      span {
        margin-right: 20px;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}

</style>