<template>
  <div style="flex:1">
    <h1 style="padding-left:40px">
      打卡记录
    </h1>
    <el-row>
      <el-col :span="4" :offset="19">
        <span>搜索</span>
        <el-input v-model="search" size="mini" placeholder="输入名字搜索" />
      </el-col>
    </el-row>

    <el-table
      :data="
        recordData.filter(
          data =>
            !search ||
            data.username.toLowerCase().includes(search.toLowerCase())
        )
      "
      border
      style="width: 99%;margin-top:20px;margin-left:10px"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
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
import mockData from "@/assets/js/mock/recordMock";
export default {
  name: "staffInfo",
  data() {
    return {
      recordData: mockData,
      search: ""
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
