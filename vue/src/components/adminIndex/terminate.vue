<template>
  <div style="flex:1">
    <h1 style="padding-left:40px">
      销假记录
    </h1>
    <el-row>
      <h3 style="color:red;margin-left:50px">待处理</h3>
      <el-col :span="4" :offset="19">
        <span>搜索</span>
        <el-input v-model="search" size="mini" placeholder="输入名字搜索" />
      </el-col>
    </el-row>

    <el-table :data="
        recordData.filter(
          data =>
            !search ||
            data.username.toLowerCase().includes(search.toLowerCase())
        )
      " border style="width: 99%;margin-top:20px;margin-left:10px" :default-sort="{ prop: 'date', order: 'descending' }">
      <el-table-column label="用户名">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请假类型">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始日期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.startDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束日期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.endDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="说明">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.info }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理状态">
        <template slot-scope="scope">
          <!-- <span style="margin-left: 10px">{{  }}</span> -->
          <el-select v-model="scope.row.state" placeholder="请选择" @change="changeState(scope)">
            <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <h3 style="color:green;margin-left:50px;margin-top:100px">已处理</h3>
      <el-col :span="4" :offset="19">
        <span>搜索</span>
        <el-input v-model="search" size="mini" placeholder="输入名字搜索" />
      </el-col>
    </el-row>

    <el-table :data="
        afterData.filter(
          data =>
            !search ||
            data.username.toLowerCase().includes(search.toLowerCase())
        )
      " border style="width: 99%;margin-top:20px;margin-left:10px" :default-sort="{ prop: 'date', order: 'descending' }">
      <el-table-column label="用户名">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请假类型">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始日期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.startDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束日期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.endDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="说明">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.info }}</span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { messages } from '@/assets/js/util'
export default {
  name: "staffInfo",
  data () {
    return {
      recordData: [],
      search: "",
      options: [
        { value: '未处理' },
        { value: '已处理' },
      ],
      afterData: []
    };
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get(`http://127.0.0.1:7001/admin/getleave`)
        .then(res => {
          this.recordData = res.data.filter(item => {
            return item.state === '未处理'
          });
          this.afterData = res.data.filter(item => {
            return item.state === '已处理'
          });
        }).catch(err => {
          console.log(err);
        })
    },
    changeState (scope) {
      let index = scope.$index;
      let rowData = scope.row;
      let obj = {
        row: {
          state: rowData.state
        },
        options: {
          username: rowData.username,
          startDate: rowData.startDate,
          endDate: rowData.endDate,
        }
      }

      this.$axios.post('http://127.0.0.1:7001/admin/changeleavestate', obj)
        .then(res => {
          this.recordData.splice(index, 1);
          this.afterData.push(rowData)
          messages(this, 'success', '修改状态成功')
        }).catch(err => {
          console.log(err);
          messages(this, 'error', '服务器出现错误')
        })

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
