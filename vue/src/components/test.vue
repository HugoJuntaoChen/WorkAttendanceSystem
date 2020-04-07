<template>
  <div>
    <input type="file" @change="uploadFile($event)" multiple="multiple" />
    <el-button @click="get">获取</el-button>
    <img :src="url" style="wdith:100px;height:100px">
    <img :src="imgUrl" style="wdith:100px;height:100px">
    <!-- <img src="../assets/1.jpg" style="wdith:100px;height:100px"> -->
    <!-- <img :src="img.address" alt=""> -->
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
      url: '../../../egg/app/public/admin/upload/1585996577896ooixgwu1iv.jpg',
      photoAddress: ''
    }
  },
  methods: {
    uploadFile: function (event) {
      this.file = event.target.files[0]; //获取input的图片file值

      let param = new FormData(); // 创建form对象
      param.append('imgFile', this.file);//对应后台接收图片名

      this.$axios.post('http://127.0.0.1:7001/api/upload/img', param)
        .then(function (res) {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    get () {
      this.$axios.get('http://127.0.0.1:7001/api/getphoto?username=cjt')
        .then(res => {
          this.photoAddress = '../../../egg/' + res.data[0].address;
          console.log(this.photoAddress);
          this.imgUrl = require('../assets/1.jpg' + '');
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
