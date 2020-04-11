<template>
  <div style="flex:1">
    <h1 style="padding-left:40px">
      通告
    </h1>
    <el-table :data="preNoticeData" border style="width: 99%;margin-top:20px;margin-left:10px">
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
    <div style="width:98%;margin: 20px auto;border:1px solid #EBEEF5">
      <h2>发表通告</h2>
      <el-form label-position="right" label-width="80px" :model="nowNoticeData" style="width:80%;margin:0 auto">
        <el-row>
          <el-col :span="16" :push="3">
            <el-form-item label="title">
              <el-input v-model="nowNoticeData.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :push="3">
            <el-form-item label="内容">
              <el-input v-model="nowNoticeData.content" type='textarea' maxlength="150" show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :push="11" style="margin-bottom:20px">
          <el-button type="info" @click="reset">重置</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span style="font-size:16px"><b>请问是否发布</b></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="postNotice">确 定</el-button>
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
      preNoticeData: [],
      nowNoticeData: {
        title: "",
        content: ""
      },
      dialogVisible: false
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
  methods: {
    confirm () {
      if (this.nowNoticeData.title && this.nowNoticeData.content) {
        this.dialogVisible = true;
      } else {
        messages(this, "warning", "请输入内容");
      }
    },
    postNotice () {
      let obj = {
        title: this.nowNoticeData.title,
        content: this.nowNoticeData.content
      };
      obj.date = dayjs().format("YYYY-MM-DD HH:mm");
      this.$axios
        .post("http://127.0.0.1:7001/noticepost", obj)
        .then(res => {
          console.log(res);
          this.preNoticeData.push(obj);
        })
        .catch(e => {
          console.log(e);
        });
      this.$nextTick(() => {
        this.dialogVisible = false;
        this.nowNoticeData.title = "";
        this.nowNoticeData.content = "";
      });
    },
    reset () {
      this.$nextTick(() => {
        this.nowNoticeData.title = "";
        this.nowNoticeData.content = "";
      });
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
