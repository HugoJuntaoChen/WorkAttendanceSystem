<template>
  <div class="photo">
    <input type="file" @change="uploadFile($event)" multiple="multiple" />
    <el-button @click="get">获取</el-button>
    <img v-if="target" :src="'http://127.0.0.1:7001/'+target" style="width:200px;height:200px">
  </div>
</template>

<script>
// import func from '../../vue-temp/vue-editor-bridge';
export default {
  name: 'Test',
  data () {
    return {
      videoEle: null,
      imgUrl: '',
      target: '',
      username: 'chenjuntao'
    }
  },
  methods: {
    uploadFile: function (event) {
      this.file = event.target.files[0]; //获取input的图片file值
      let param = new FormData(); // 创建form对象
      param.append('imgFile', this.file);//对应后台接收图片名
      let obj = {}
      let that = this;
      this.$axios.post('http://127.0.0.1:7001/api/upload/img', param)
        .then(function (res) {
          obj.address = res.data;
          obj.username = that.username
          that.$axios.post('http://127.0.0.1:7001/api/saveimg', obj).then(res => {
            console.log(res);

          }).catch(err => {
            console.log(err);
          })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    get () {
      this.$axios.get(`http://127.0.0.1:7001/api/getphoto?username=${this.username}`)
        .then(res => {
          //   this.photoAddress += res.data[0].address;
          let path = res.data[0].address
          let arr = path.split('/');
          arr.splice(0, 1);
          path = arr.join('/');
          this.target = path;
        }).catch(err => {
          console.log(err);
        })
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#canvas {
  width: 400px;
  height: 400px;
}
</style>
