<template>
  <div style="display:flex">
    <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" style="min-height:870px;flex:0 1 200px">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">员工管理</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-edit"></i>
        <span slot="title">发表通告</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">打卡记录</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">请假记录</span>
      </el-menu-item>
    </el-menu>
    <staffInfo :is="currentTab" keep-alive></staffInfo>
  </div>
</template>

<script>
import clockInRecord from "./adminIndex/clockInRecord";
import notice from "./adminIndex/notice";
import staffInfo from "./adminIndex/staffInfo";
import leaveRecord from './adminIndex/leaveRecord'
export default {
  name: "adminIndex",
  data () {
    return {
      currentTab: "staffInfo"
    };
  },
  methods: {
    handleSelect (key) {
      if (key === "1") {
        this.currentTab = "staffInfo";
      } else if (key === "2") {
        this.currentTab = "notice";
      } else if (key === "3") {
        this.currentTab = "clockInRecord";
      } else if (key === '4') {
        this.currentTab = 'leaveRecord'
      }
    }
  },
  components: { clockInRecord, notice, staffInfo, leaveRecord }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
