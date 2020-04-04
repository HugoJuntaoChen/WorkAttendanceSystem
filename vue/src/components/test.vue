<template>
  <div>
    <input type="file" @change="uploadFile($event)" multiple="multiple" />
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      videoEle: null
    }
  },
  methods: {
    uploadFile: function (event) {
      this.file = event.target.files[0]; //获取input的图片file值
      console.log(event.target.files);

      let param = new FormData(); // 创建form对象
      param.append('imgFile', this.file);//对应后台接收图片名

      //   axios.post('http://www.baidu.com/upload_img', param)
      //     .then(function (res) {
      //       console.log(res);
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
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
