<template>
  <el-row>
    <el-col :span="24"
      ><div class="grid-content bg-purple-dark">企业考勤系统</div></el-col
    >
  </el-row>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  mounted() {},
  method: {}
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
