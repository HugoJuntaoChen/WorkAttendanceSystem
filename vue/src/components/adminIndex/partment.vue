<template>
  <div style="flex:1">
    <h1 style="padding-left:40px">
      部门管理
    </h1>
    <el-row>
      <el-col :offset="19">
        <el-select v-model="value" placeholder="请选择部门" @change="selectPartment">
          <el-option v-for="item in options" :key="item.value" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <template v-for='item in partment'>
      <h2 style="padding-left:40px" :key="item.title" v-if="item.show">
        {{item.title}}
      </h2>
      <el-table :data="item.data" border style="width: 99%;margin-top:20px;margin-left:10px" :key="item.key" v-if='item.show'>
        <el-table-column label="用户名" width="130">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="照片">
          <template slot-scope="scope">
            <!-- <span style="margin-left: 10px">{{ scope.row.photo }}</span> -->
            <img :src="scope.row.photo" style="width:100px;height:100px">
          </template>
        </el-table-column>
        <el-table-column label="手机">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="岗位">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.state }}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>

  </div>
</template>

<script>
import mockData from "@/assets/js/mock/recordMock";
import { messages } from '@/assets/js/util'
export default {
  name: "staffInfo",
  data () {
    return {
      partment: [{ title: '前端部门', data: [], key: 0, show: true }, { title: '后端部门', data: [], key: 1, show: true }, { title: '测试部门', data: [], key: 2, show: true }],
      value: "",
      options: [{ value: '全部部门' }, {
        value: '前端部门'
      }, {
        value: '后端部门'
      }, {
        value: '测试部门'
      }]
    }
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
        this.partment[0].data = res.data.filter(item => {
          return item.state === '前端'
        });
        this.partment[1].data = res.data.filter(item => {
          return item.state === '后端'
        });
        this.partment[2].data = res.data.filter(item => {
          return item.state === '测试'
        });
      }).catch(err => {
        console.log(err);
      })
    },
    selectPartment () {
      const value = this.value;
      if (value === '全部部门') {
        this.partment.forEach(item => {
          item.show = true
        })
        this.$forceUpdate()
        return
      }
      this.partment.forEach(item => {
        if (item.title !== value) {
          item.show = false;
        } else {
          item.show = true;
        }
      })
      this.$forceUpdate()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
