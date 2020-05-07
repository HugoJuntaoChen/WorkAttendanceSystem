<template>
  <div style="flex:1">
    <h1 style="padding-left:40px">
      员工管理
    </h1>
    <div style="text-align:right;padding-right:50px">
      <el-button type="success" @click="addStaff">新增员工</el-button>
    </div>
    <el-table :data="tableData" border style="width: 99%;margin-top:20px;margin-left:10px">
      <el-table-column label="用户名" width="130">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="照片" width="200">
        <template slot-scope="scope">
          <!-- <span style="margin-left: 10px">{{ scope.row.photo }}</span> -->
          <img :src="scope.row.photo" style="width:100px;height:100px">
        </template>
      </el-table-column>
      <el-table-column label="手机" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" width="130">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.state }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="创建日期">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑员工信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="left" status-icon :rules="rules" ref="staffForm">
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.username" :disabled="!ifAdd"></el-input>
        </el-form-item>
        <el-form-item label="照片" label-width="80px">
          <input type="file" @change="uploadFile($event)" multiple="multiple" />
        </el-form-item>
        <el-form-item label="手机" label-width="80px" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="岗位" label-width="80px" prop="phone">
          <el-select v-model="form.state" placeholder="请选择岗位">
            <el-option v-for="item in options" :key="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建日期" label-width="80px">
          <el-input v-model="form.createDate" :disabled="true"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postStaff">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mockData from '@/assets/js/mock/staffInfoMack'
import dayjs from 'dayjs'
import { messages } from "@/assets/js/util";
export default {
  name: "staffInfo",
  data () {
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
      tableData: mockData,
      dialogFormVisible: false,
      form: {},
      ifAdd: true,
      ifUploadPhoto: false,
      options: [{
        value: '前端'
      }, {
        value: '后端'
      }, {
        value: '测试'
      }],
      rules: {
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ]
      },
    };
  },
  created () {
    this.updateView()
  },
  methods: {
    updateView () {
      this.$axios.get('http://127.0.0.1:7001/staff/getstaffinfo').then(res => {
        this.tableData = [];
        res.data.forEach(item => {
          let path = item['photo'];
          if (path) {
            let arr = path.split('/');
            arr.splice(0, 1);
            path = arr.join('/');
            item['photo'] = 'http://127.0.0.1:7001/' + path;
          }

        })
        this.tableData = res.data;
      }).catch(err => {
        console.log(err);
      })
    },
    addStaff () {
      this.form = {};
      if (this.$refs.staffForm) {
        this.$refs.staffForm.clearValidate();
      }
      this.dialogFormVisible = true;
      this.ifAdd = true;
      this.form.createDate = dayjs().format('YYYY-MM-DD');
    },
    uploadFile: function (event) {
      this.ifUploadPhoto = true;
      this.file = event.target.files[0]; //获取input的图片file值
      let param = new FormData(); // 创建form对象
      param.append('imgFile', this.file);//对应后台接收图片名
      let obj = {}
      let that = this;
      this.$axios.post('http://127.0.0.1:7001/photo/uploadimg', param)
        .then(function (res) {
          that.form.photo = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleEdit (index, row) {
      let obj = JSON.parse(JSON.stringify(row));
      this.form = obj;
      this.dialogFormVisible = true;
      this.ifAdd = false;
      if (this.$refs.staffForm) {
        this.$refs.staffForm.clearValidate();
      }
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {};
        obj.username = row.username;
        this.$axios.post('http://127.0.0.1:7001/staff/deletestaff', obj).then(res => {
          this.tableData.splice(index, 1);
          this.$axios.post('http://127.0.0.1:7001/deleteClock', obj).then(res => {
            console.log(res);
          }).catch(err => {
            console.log(err);
          });
          this.$axios.post('http://127.0.0.1:7001/deleteleave', obj).then(res => {
            console.log(res);
          }).catch(err => {
            console.log(err);
          });
        }).catch(err => {
          messages(this, 'error', '服务器出现错误')
        })

        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    postStaff () {
      let obj = JSON.parse(JSON.stringify(this.form));
      let that = this;
      this.$refs.staffForm.validate((valid) => {
        if (valid) {
          if (this.ifAdd) {
            if (!obj.photo) {
              messages(this, 'warning', '请添加照片')
              return;
            }
            this.$axios.post('http://127.0.0.1:7001/staff/addstaff', obj).then(res => {
              let path = obj.photo;
              let days = 7;
              if (path) {
                let arr = path.split('/');
                arr.splice(0, 1);
                path = arr.join('/');
                obj.photo = 'http://127.0.0.1:7001/' + path;
              }
              that.tableData.push(obj)
              this.dialogFormVisible = false;
              messages(this, 'success', '添加员工成功')
              let username = obj.username;
              for (let i = 1; i <= days; i++) {
                this.$axios.post('http://127.0.0.1:7001/staff/addstaff/clock', {
                  username: username,
                  startTime: '',
                  endTime: '',
                  date: '2020-05-0' + i,
                  state: '未入职'
                }).then(res => {
                  console.log(res);
                }).catch(err => {
                  console.log(err);
                })
              }
            }).catch(err => {
              console.log(err);
              messages(this, 'error', '服务器出现错误')
            })
          } else {
            let photo = this.form.photo;
            obj = {
              row: {
                email: this.form.email,
                phone: this.form.phone,
                state: this.form.state,
                photo: photo
              },
              username: this.form.username
            }
            console.log(obj);

            let cloneObj = JSON.parse(JSON.stringify(obj));
            console.log(cloneObj);

            if (!this.ifUploadPhoto) {
              cloneObj.row.photo = 'app' + cloneObj.row.photo.split('http://127.0.0.1:7001')[1];
            }
            this.$axios.post('http://127.0.0.1:7001/staff/changestaffinfo', cloneObj).then(res => {
              this.dialogFormVisible = false;
              messages(this, 'success', '编辑员工成功')
              this.updateView()
            }).catch(err => {
              console.log(err);
              messages(this, 'error', '服务器出现错误')
            })
          }
          this.ifUploadPhoto = false;
        } else {
          messages(this, 'warning', '所填写的信息有误，请重新修改')
        }
      });

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
