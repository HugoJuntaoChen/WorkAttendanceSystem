<template>
  <div style="flex:1">
    <h1 style="padding-left:40px">
      打卡记录
    </h1>
    <el-row>
      <el-col :span="4" :offset="1" style="margin-top:3px">
        <el-select v-model="value" placeholder="请选择月份" @change='changeMonth'>
          <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" :offset="14">
        <span>搜索</span>
        <el-input v-model="search" size="mini" placeholder="输入名字搜索" @input="select" />
      </el-col>
    </el-row>

    <el-table :data="
        recordData.filter(
          data =>
            !search ||
            data.username.toLowerCase().includes(search.toLowerCase())
        )
      " border style="width: 99%;margin-top:20px;margin-left:10px" :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column label="用户名" sortable>
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
          <span :style="{color:scope.row.color,'margin-left':'10px'}">{{ scope.row.state }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="copyData" border style="width: 99%;margin-top:20px;margin-left:10px" v-if="showDetail">
      <el-table-column label="用户名">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="天数">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.days }}</span>
        </template>
      </el-table-column>
      <el-table-column label="正常次数">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.normal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="非正常次数">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.unnormal }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import mockData from "@/assets/js/mock/recordMock";
import dayjs from "dayjs";
export default {
  name: "staffInfo",
  data () {
    return {
      recordData: [],
      fiveData: [],
      copyData: [
        {
          username: '',
          days: 0,
          normal: 0,
          unnormal: 0
        }
      ],
      search: "",
      user: [],
      showDetail: false,
      color: '#606266',
      options: [{
        value: '4月',
      }, {
        value: '5月',
      }],
      value: '5月'
    };
  },
  created () {
    this.$axios.get('http://127.0.0.1:7001/staff/getstaffinfo').then(res => {
      res.data.forEach(item => {
        this.user.push(item.username)
      })
    }).catch(err => {
      console.log(err);
    })
    this.$axios.get(`http://127.0.0.1:7001/staff/getallclock`)
      .then(res => {
        this.recordData = res.data;
        this.recordData.forEach(item => {
          if (item.state === '正常' || item.state === '节假日' || item.state === '未入职') {
            item.color = '#606266';
          } else {
            item.color = 'red'
          }
        })
        this.fiveData = res.data;
      }).catch(err => {
        console.log(err);
      })
  },
  methods: {
    changeMonth () {
      if (this.value === '4月') {
        this.recordData = []
      } else if (this.value === "5月") {
        this.recordData = this.fiveData
      }
    },
    select () {
      if (this.user.includes(this.search)) {
        this.copyData[0].username = this.search;
        let data = JSON.parse(JSON.stringify(this.recordData));
        data.forEach(item => {
          console.log(item);
          if (item.username === this.search) {
            this.copyData[0].days++;
            if (item.state === '正常' || item.state === '节假日' || item.state === '未入职') {
              this.copyData[0].normal++
            } else {
              this.copyData[0].unnormal++
            }
          }
        })
        this.showDetail = true
      } else {
        this.showDetail = false
        this.copyData[0] = {
          username: '',
          days: 0,
          normal: 0,
          unnormal: 0
        }
      }

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Red {
  color: red;
}
</style>
