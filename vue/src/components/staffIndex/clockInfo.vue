<template>
  <div style="flex:1">
    <h1 style="padding-left:40px;">
      我的打卡情况
    </h1>
    <el-table :data="recordData" border style="width: 99%;margin-top:20px;margin-left:10px" :default-sort="{ prop: 'date', order: 'descending' }">
      <el-table-column label="用户名">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期" sortable> </el-table-column>
      <el-table-column label="上班时间">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下班时间">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.state }}</span>
        </template>
      </el-table-column>
    </el-table>
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
      username: '',
      startTime: '',
      endTime: '',
      dialogVisible: false,
      state: '',
      date: '',
      situation: '',
      recordData: [],
    };
  },
  created () {
    this.username = sessionStorage.getItem('username');
    this.$axios.get(`http://127.0.0.1:7001/staff/getsomeclock?username=${this.username}`)
      .then(res => {
        res.data.forEach(item => {
          if (!item.endTime) {
            item.state = '下班未签到'
          }
        });
        this.recordData = res.data;

      }).catch(err => {
        console.log(err);
      })
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myInput .el-input__inner {
  height: 500px !important;
}
</style>
