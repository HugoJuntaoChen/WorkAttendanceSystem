<template>
  <div style="flex:1">
    <h1 style="padding-left:40px">
      请假
    </h1>
    <div style="width:98%;margin: 20px auto;border:1px solid #EBEEF5">
      <el-form label-position="right" label-width="80px" :model="leaveData" style="width:80%;margin:50px auto">
        <el-row>
          <el-col :span="12" :push="5">
            <el-form-item label="请假原因">
              <el-select v-model="leaveData.type" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :push="5">
            <el-form-item label="说明">
              <el-input v-model="leaveData.info" type='textarea' maxlength="150" show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :push="5">
            <el-form-item label="日期">
              <el-date-picker @change="changeDate" v-model="dateArray" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row style="margin-bottom:10px">
        <el-col :push="19" :span="4">
          <el-button type="primary" @click="checkPost">确定</el-button>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span style="font-size:16px"><b>请问是否提交</b></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="postLeaveIssues">确 定</el-button>
      </span>
    </el-dialog>
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
      dialogVisible: false,
      options: [{
        value: '病假'
      }, {
        value: '事假'
      }, {
        value: '外出公干'
      }],
      dateArray: [],
      leaveData: {
        type: '',
        info: '',
        startDate: '',
        endDate: ''
      }
    };
  },
  methods: {
    changeDate () {
      this.leaveData.startDate = this.dateArray[0];
      this.leaveData.endDate = this.dateArray[1];
    },
    checkPost () {
      if (this.leaveData.type && this.leaveData.info && this.leaveData.startDate && this.leaveData.endDate) {
        this.dialogVisible = true;
      } else {
        messages(this, 'warning', '请填写完整内容');
      }
    },
    postLeaveIssues () {
      let username = 'cjt';
      this.leaveData.username = username;
      this.leaveData.state = '未处理'
      this.$axios.post('http://127.0.0.1:7001/staff/addleaveissues', this.leaveData).then(res => {
        console.log(res);
        messages(this, 'success', '提交成功');
        this.dialogVisible = false;
      }).catch(err => {
        console.log(err);

        messages(this, 'warning', '提交失败，请联系管理员')
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
