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
        <i class="el-icon-edit"></i>
        <span slot="title">我的打卡情况</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-document"></i>
        <span slot="title">请假</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-document"></i>
        <span slot="title">修改个人信息</span>
      </el-menu-item>
    </el-menu>
    <staffNotice :is="currentTab" keep-alive></staffNotice>
  </div>
</template>

<script>
import leave from "./staffIndex/leave";
import modifyInfo from "./staffIndex/modifyInfo";
import myClock from "./staffIndex/myClock";
import staffNotice from "./staffIndex/staffNotice";
import clockInfo from "./staffIndex/clockInfo";
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
        this.currentTab = "myClock";
      } else if (key === "4") {
        this.currentTab = "leave";
      } else if (key === "5") {
        this.currentTab = "modifyInfo";
      } else if (key === "3") {
        this.currentTab = "clockInfo";
      }
    },
  },
  components: { leave, myClock, staffNotice, modifyInfo, clockInfo }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
