<template>
  <div style="flex:1">
    <h1 style="padding-left:40px">
      通告
    </h1>
    <el-row>
      <el-col :span="4" :offset="19">
        <span>搜索</span>
        <el-input v-model="search" size="mini" placeholder="输入内容搜索" />
      </el-col>
    </el-row>
    <el-table :data="preNoticeData.filter(
          data =>
            !search ||
            data.content.toLowerCase().includes(search.toLowerCase())
        )" border style="width: 99%;margin-top:20px;margin-left:10px">
      <el-table-column label="title" width="100px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发表日期" width="200px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
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
      preNoticeData: [],
      search: ''
    };
  },
  created () {
    this.$axios
      .get("http://127.0.0.1:7001/noticeget")
      .then(res => {
        this.preNoticeData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myInput .el-input__inner {
  height: 500px !important;
}
</style>
