<template>
  <div style="width:500px;margin:60px auto 0;border:1px solid #d1ddec">
    <h3 style="text-align:center">员工登陆</h3>
    <el-form :model="rootForm" ref="rootForm" label-width="100px" style="height:300px">
      <el-form-item label="用户名" label-width="70px" prop="username" :rules="[{ required: true, message: '用户名不能为空' }]" style="padding:10px 70px 0 40px">
        <el-input v-model="rootForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="70px" prop="password" :rules="[{ required: true, message: '密码不能为空' }]" style="padding:20px 70px 0 40px">
        <el-input v-model="rootForm.password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item style="padding-top:50px">
        <el-button type="primary" @click="submitForm('rootForm')">登陆</el-button>
        <el-button @click="resetForm('rootForm')">重置</el-button>
      </el-form-item>
      <el-button type='text' style="margin-left:80%;margin-top:-20px" @click="$router.push({path:'/login'})">管理员登陆</el-button>
    </el-form>
  </div>
</template>

<script>
import { messages } from "@/assets/js/util";
export default {
  data () {
    return {
      rootForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("http://127.0.0.1:7001/staff/login", {
              username: this.rootForm.username,
              password: this.rootForm.password
            })
            .then(res => {
              console.log(res);
              if (res.status !== 200) {
                messages(this, "warning", "用户名或密码错误");
              } else {
                sessionStorage.setItem("staffToken", res.data.token);
                this.$router.push({ path: "/staffIndex" });
                messages(this, "success", "登陆成功");
              }
            })
            .catch(e => {
              console.log(e);
              messages(this, "warning", "用户名或密码错误");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
