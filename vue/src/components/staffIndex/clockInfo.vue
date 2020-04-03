<template>
  <div style="flex:1">打卡统计</div>
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
