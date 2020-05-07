<template>
  <div style="flex:1">
    <h1 style="padding-left:40px">
      我的打卡
    </h1>
    <div style="width:100%;display:flex">
      <div style="height:50px;width:50%;flex:1">
        <el-button @click="clockState('on')" style="margin-left:20px"
          >上班打卡</el-button
        >：{{ startTime }}
      </div>
      <div style="height:50px;width:50%;flex:1">
        <el-button @click="clockState('off')">下班打卡</el-button>：{{
          endTime
        }}
      </div>
    </div>
    <el-dialog
      title="人脸识别中"
      :visible.sync="dialogVisible"
      @close="closeDialog"
    >
      <video
        id="video"
        autoplay
        style="width:500px;height:500px;margin:0 auto"
      ></video>
      <canvas id="canvas1" style="height:120px" v-show="false"></canvas>
      <span :style="{ color: facingMessageColor }">{{ facingMessage }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="clock">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { pre } from "@/assets/js/mock/noticeMock";
import { messages } from "@/assets/js/util";
import html2canvas from "html2canvas";
// import tracking from "@/assets/js/tracking/tracking";
// const tracking = require("@/assets/js/tracking/tracking");
//获取视频流
let mediaStreamTrack;
export default {
  name: "notice",
  data() {
    return {
      username: "",
      startTime: "",
      endTime: "",
      dialogVisible: false,
      state: "",
      date: "",
      situation: "",
      facingMessage: "",
      facingMessageColor: "green",
      count: 1
    };
  },
  created() {
    this.username = sessionStorage.getItem("username");
    this.date = dayjs().format("YYYY-MM-DD");
    this.$axios
      .get(
        `http://127.0.0.1:7001/staff/getclock?username=${this.username}&date=${this.date}`
      )
      .then(res => {
        this.startTime = res.data.startTime;
        this.endTime = res.data.endTime;
        this.situation = res.data.state;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    clockState(state) {
      if (state === "on" && this.startTime) {
        messages(this, "warning", "你今天已打卡");
        return;
      } else if (state === "off" && this.endTime) {
        messages(this, "warning", "你今天已打卡");
        return;
      } else if (state == "off" && !this.startTime) {
        messages(this, "warning", "请先上班打卡");
        return;
      }
      if (state === "off") {
        this.count++;
      }
      this.dialogVisible = true;
      this.openVideo();
      if (state === "on") {
        setTimeout(() => {
          this.facingMessage = "人脸识别成功";
          this.facingMessageColor = "green";
        }, 5000);
      } else if (state === "off" && this.count % 2 === 0) {
        setTimeout(() => {
          this.facingMessage = "人脸识别失败";
          this.facingMessageColor = "red";
        }, 5000);
      } else if (state === "off" && this.count % 2 !== 0) {
        setTimeout(() => {
          this.facingMessage = "人脸识别成功";
          this.facingMessageColor = "green";
        }, 5000);
      }

      this.state = state;
    },
    clock() {
      if (this.facingMessage === "人脸识别成功") {
        if (this.state === "on") {
          this.clockIn();
        } else {
          this.clockOff();
        }
        this.dialogVisible = false;
      } else {
        messages(this, "warning", "请等待人脸识别成功");
      }
    },
    clockIn() {
      let startTime = dayjs().format("HH:mm");
      let situation = "";
      if (dayjs().hour() > 10) {
        situation = "迟到";
      } else {
        situation = "正常";
      }
      this.situation = situation;
      let obj = {
        username: this.username,
        startTime: startTime,
        date: this.date,
        state: situation
      };
      this.$axios
        .post("http://127.0.0.1:7001/staff/clockstart", obj)
        .then(res => {
          this.startTime = startTime;
          this.situation = situation;
          messages(this, "success", "打卡成功！");
          this.facingMessage = "";
        })
        .catch(err => {
          console.log(err);
          messages(this, "error", "打卡失败！请联系管理员");
        });
    },
    clockOff() {
      let endTime = dayjs().format("HH:mm");
      if (dayjs().hour() < 19) {
        this.situation += "、早退";
      }
      let obj = {
        info: {
          endTime: endTime,
          state: this.situation
        },
        options: {
          where: {
            username: this.username,
            date: this.date
          }
        }
      };
      this.$axios
        .post("http://127.0.0.1:7001/staff/clockoff", obj)
        .then(res => {
          this.endTime = endTime;
          messages(this, "success", "打卡成功！");
          this.facingMessage = "";
        })
        .catch(err => {
          console.log(err);
          messages(this, "error", "打卡失败！请联系管理员");
        });
    },
    openVideo() {
      let vm = this;
      this.$nextTick(() => {
        let video = document.querySelector("#video");
        //获取摄像头对象
        if (
          navigator.mediaDevices &&
          navigator.mediaDevices.getUserMedia &&
          video
        ) {
          navigator.mediaDevices
            .getUserMedia({
              video: true
            })
            .then(function(stream) {
              mediaStreamTrack =
                typeof stream.stop === "function"
                  ? stream
                  : stream.getTracks()[0];
              video.srcObject = stream;
              video.play();
              setTimeout(() => {}, 3000);
            })
            .catch(function(err) {
              console.log(err);
            });
        }
      });
    },
    closeDialog() {
      this.facingMessage = "";
      mediaStreamTrack && mediaStreamTrack.stop();
    },
    getCompetence() {
      let canvas1 = document.querySelector("#canvas1");
      let context1 = canvas1.getContext("2d");
      html2canvas(canvas1).then(canvas => {
        let saveImage = canvas1.toDataURL("image/jpg");
        console.log(saveImage);

        let fd = new FormData();
        fd.append("imgFile", saveImage);
      });
      this.$axios
        .post("http://127.0.0.1:7001/face", {
          username: sessionStorage.getItem("username"),
          data: fd
        })
        .then(res => {
          this.answer = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeDestroy() {
    mediaStreamTrack && mediaStreamTrack.stop();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myInput .el-input__inner {
  height: 500px !important;
}
</style>
