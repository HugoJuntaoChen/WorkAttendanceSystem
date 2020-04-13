<template>
  <div style="flex:1">
    <h1 style="padding-left:40px">
      员工管理
    </h1>
    <div style="text-align:right;padding-right:50px">
      <el-button type="success">新增员工</el-button>
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
      <el-table-column label="状态" width="130">
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
      <el-form :model="form" label-position="left">
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="照片" label-width="80px">
          <el-input v-model="form.photo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="80px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-input v-model="form.date" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建日期" label-width="80px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mockData from '@/assets/js/mock/staffInfoMack'
export default {
  name: "staffInfo",
  data () {
    return {
      tableData: mockData,
      dialogFormVisible: false,
      form: {

      }
    };
  },
  created () {
    this.$axios.get('http://127.0.0.1:7001/staff/getstaffinfo').then(res => {
      console.log(res);
      res.data.forEach(item => {
        let path = item['photo'];
        let arr = path.split('/');
        arr.splice(0, 1);
        path = arr.join('/');
        item['photo'] = 'http://127.0.0.1:7001/' + path;
      })
      this.tableData = res.data;
    }).catch(err => {
      console.log(err);

    })
  },
  methods: {
    handleEdit (index, row) {
      this.form = row;
      this.dialogFormVisible = true;
    },
    handleDelete (index, row) {
      this.tableData.splice(index, 1)
    },

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
