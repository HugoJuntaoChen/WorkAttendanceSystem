<template>
  <div style="flex:1">
    <h1 style="padding-left:40px">
      请假记录
    </h1>
    <el-row>
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

    </el-table>
  </div>
</template>

<script>
import mockData from "@/assets/js/mock/recordMock";
import { messages } from '@/assets/js/util'
export default {
  name: "staffInfo",
  data () {
    return {
      recordData: mockData,
      search: "",
    };
  },
  created () {
    this.$axios.get(`http://127.0.0.1:7001/admin/getleave`)
      .then(res => {
        res.data.reverse();
        this.recordData = res.data;

      }).catch(err => {
        console.log(err);
      })
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
