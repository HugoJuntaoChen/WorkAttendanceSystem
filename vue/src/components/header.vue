<template>
  <el-row>
    <div class="grid-content bg-purple-dark">
      <el-col :span="23">
        企业考勤系统
      </el-col>
      <el-col :span="1">
        <el-button type="text" style="color:black !important" @click="exit">退出</el-button>
      </el-col>
    </div>
  </el-row>
</template>

<script>
export default {
  name: "Header",
  data () {
    return {
    };
  },
  created () {
  },
  methods: {
    exit () {
      if (
        sessionStorage.getItem("userToken") ||
        sessionStorage.getItem("staffToken")
      ) {
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("staffToken");
        sessionStorage.removeItem('username');
        this.$router.push({ path: "/login" });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-content {
  border-radius: 4px;
  height: 50px;
  line-height: 50px;
  font-size: 22px;
  padding-left: 20px;
}
.bg-purple-dark {
  background: #99a9bf;
}
</style>
