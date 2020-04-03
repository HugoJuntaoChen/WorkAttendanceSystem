<template>
  <div style="display:flex">
    <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" style="min-height:870px;flex:0 1 200px">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">通告</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-edit"></i>
        <span slot="title">打卡</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">我的打卡</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">打卡统计</span>
      </el-menu-item>
    </el-menu>
    <staffInfo :is="currentTab" keep-alive></staffInfo>
  </div>
</template>

<script>
import clockInfo from "./staffIndex/clockInfo";
import myClock from "./staffIndex/myClock";
import staffClockIn from "./staffIndex/staffClockIn";
import staffNotice from "./staffIndex/staffNotice";
export default {
  name: "adminIndex",
  data () {
    return {
      currentTab: "staffNotice"
    };
  },
  methods: {
    handleSelect (key) {
      if (key === "1") {
        this.currentTab = "staffNotice";
      } else if (key === "2") {
        this.currentTab = "staffClockIn";
      } else if (key === "3") {
        this.currentTab = "myClock";
      } else if (key === "4") {
        this.currentTab = "clockInfo"
      }
    }
  },
  components: { clockInfo, myClock, staffClockIn, staffNotice }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
