<template>
  <div style="flex:1">
    <h1 style="padding-left:40px">
      修改个人信息
    </h1>
    <div style="width:98%;margin: 20px auto;border:1px solid #EBEEF5">
      <el-form :model="form" label-position="left" style="width:80%;margin:50px auto">
        <el-form-item label="照片" label-width="80px">
          <el-input v-model="form.photo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="80px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>重设</el-button>
          <el-button>提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { pre } from "@/assets/js/mock/noticeMock";
import { messages } from "@/assets/js/util";
export default {
  name: "notice",
  data () {
    return {
      form: {

      }
    };
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myInput .el-input__inner {
  height: 500px !important;
}
</style>
