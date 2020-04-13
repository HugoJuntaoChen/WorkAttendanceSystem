<template>
  <div style="flex:1">
    <h1 style="padding-left:40px">
      修改个人信息
    </h1>
    <div style="width:78%;margin: 20px auto;border:1px solid #EBEEF5">
      <el-form :model="form" label-position="left" style="width:80%;margin:50px auto" status-icon :rules="rules" ref="form">
        <el-form-item label="照片" label-width="80px">
          <input type="file" @change="uploadFile($event)" multiple="multiple" />
          <img v-if="imgSrc" :src="imgSrc" style="width:100px;height:100px">
        </el-form-item>
        <el-form-item label="重设密码" label-width="80px" prop="password">
          <el-input type='password' v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确定密码" label-width="80px" prop='checkPassword'>
          <el-input type='password' v-model="form.checkPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="80px" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="margin-left:40%">
          <el-button type="info" @click="resetForm('form')">重设</el-button>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span style="font-size:16px"><b>请问是否提交</b></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="postChangeStaffInfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%">
      <span style="font-size:16px"><b>密码修改成功，请问是否立刻回到主页</b></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="backtoIndex">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { pre } from "@/assets/js/mock/noticeMock";
import { messages } from "@/assets/js/util";
export default {
  name: "notice",
  data () {
    const validatePass = (rule, value, callback) => {
      if (this.form.checkPassword !== '') {
        this.$refs.form.validateField('checkPassword');
      }
      callback();
    };
    const validatePass2 = (rule, value, callback) => {
      if (this.form.password && !this.form.checkPassword) {
        callback(new Error('请输入重设密码'))
      }
      else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号'))
      }
      callback()
    }
    const validateEmail = (rule, value, callback) => {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的邮箱"));
      }
      callback()
    }
    return {
      form: {
        phone: '',
        email: '',
        password: '',
        checkPassword: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ]
      },
      imgSrc: '',
      username: '',
      dialogVisible: false,
      dialogVisible1: false
    };
  },
  created () {
    this.username = sessionStorage.getItem('username');
    this.$axios.get(`http://127.0.0.1:7001/staff/getsomestaffinfo?username=${sessionStorage.getItem('username')}`).then(res => {
      this.form.phone = res.data[0].phone;
      this.form.email = res.data[0].email;
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    uploadFile: function (event) {
      this.file = event.target.files[0]; //获取input的图片file值
      let param = new FormData(); // 创建form对象
      param.append('imgFile', this.file);//对应后台接收图片名
      let obj = {}
      let that = this;
      this.$axios.post('http://127.0.0.1:7001/photo/uploadimg', param)
        .then(function (res) {
          obj.photo = res.data;
          obj.username = that.username
          that.$axios.post('http://127.0.0.1:7001/photo/save', obj).then(res => {
            that.$axios.get(`http://127.0.0.1:7001/photo/get?${that.username}`).then(res => {
              console.log(res);
              let path = res.data[0].photo;
              let arr = path.split('/');
              arr.splice(0, 1);
              path = arr.join('/');
              that.imgSrc = 'http://127.0.0.1:7001/' + path;
            })
          }).catch(err => {
            console.log(err);
          })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = true;
        } else {
          messages(this, 'warning', '所填写的信息有误，请重新修改')
        }
      });
    },
    postChangeStaffInfo () {
      let obj = {
        row: {
          email: this.form.email,
          phone: this.form.phone
        },
        username: this.username
      }
      if (this.form.password) {
        obj.row.password = this.form.password;
      }
      this.dialogVisible = false;
      this.$axios.post('http://127.0.0.1:7001/staff/changestaffinfo', obj).then(res => {
        messages(this, 'success', '提交成功');
        if (this.form.password) {
          this.dialogVisible1 = true;
        }
      }).catch(err => {
        console.log(err);

      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    backtoIndex () {
      this.dialogVisible1 = false;
      sessionStorage.removeItem('staffToken');
      this.$router.push({ path: '/staffLogin' })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myInput .el-input__inner {
  height: 500px !important;
}
</style>
