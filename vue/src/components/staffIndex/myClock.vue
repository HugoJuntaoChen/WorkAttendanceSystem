<template>
  <div style="flex:1">
    <h1 style="padding-left:40px">
      我的打卡
    </h1>
    <div style="width:100%;display:flex">
      <div style="height:50px;width:50%;flex:1">
        <el-button @click="clockState('on')" style="margin-left:20px">上班打卡</el-button>：{{startTime}}
      </div>
      <div style="height:50px;width:50%;flex:1">
        <el-button @click="clockState('off')">下班打卡</el-button>：{{endTime}}
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span><b>是否进行打卡</b></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="clock">确 定</el-button>
      </span>
    </el-dialog>
    <h1 style="padding-left:40px;margin-top:60px">
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
      startTime: '',
      endTime: '',
      dialogVisible: false,
      state: '',
      date: '',
      situation: '',
      recordData: []
    };
  },
  created () {
    this.date = dayjs().format("YYYY-MM-DD")
    this.$axios.get(`http://127.0.0.1:7001/staff/getclock?username=cjt&date=${this.date}`)
      .then(res => {
        this.startTime = res.data.startTime;
        this.endTime = res.data.endTime;
        this.situation = res.data.state
      }).catch(err => {
        console.log(err);
      })
    this.$axios.get(`http://127.0.0.1:7001/staff/getsomeclock?username=cjt`)
      .then(res => {
        this.recordData = res.data;

      }).catch(err => {
        console.log(err);
      })
  },
  methods: {
    clockState (state) {
      if (state === 'on' && this.startTime) {
        messages(this, 'warning', '你今天已打卡')
        return
      } else if (state === 'off' && this.endTime) {
        messages(this, 'warning', '你今天已打卡');
        return;
      } else if (state == 'off' && !this.startTime) {
        messages(this, 'warning', '请先上班打卡')
        return;
      }
      this.dialogVisible = true;
      this.state = state;
    },
    clock () {
      if (this.state === 'on') {
        this.clockIn();
      } else {
        this.clockOff();
      }
      this.dialogVisible = false;

    },
    clockIn () {
      let startTime = dayjs().format("HH:mm");
      let situation = '';
      if (dayjs().hour() > 10) {
        situation = '迟到'
      } else {
        situation = '正常'
      }
      this.situation = situation;
      let obj = {
        username: 'cjt',
        startTime: startTime,
        date: this.date,
        state: situation
      }
      this.$axios.post('http://127.0.0.1:7001/staff/clockstart', obj).then(res => {
        console.log(res);
        this.startTime = startTime;
        this.situation = situation;
        messages(this, 'success', '打卡成功！')
      }).catch(err => {
        console.log(err);
        messages(this, 'error', '打卡失败！请联系管理员')
      })

    },
    clockOff () {
      let endTime = dayjs().format("HH:mm");
      if (dayjs().hour() < 19) {
        this.situation += '、早退'
      }
      let obj = {
        info: {
          endTime: endTime,
          state: this.situation
        },
        options: {
          where: {
            username: 'cjt',
            date: this.date,
          }

        }
      }
      this.$axios.post('http://127.0.0.1:7001/staff/clockoff', obj).then(res => {
        console.log(res);
        this.endTime = endTime;
        messages(this, 'success', '打卡成功！')
      }).catch(err => {
        console.log(err);
        messages(this, 'error', '打卡失败！请联系管理员')
      })

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
