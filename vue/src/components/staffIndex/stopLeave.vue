<template>
  <div style="flex:1">
    <h1 style="padding-left:40px">
      销假
    </h1>
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

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myInput .el-input__inner {
  height: 500px !important;
}
</style>
