<template>
  <div>
    <video autoplay playsinline ref="video" id="video"></video>
    <canvas id="canvas" width="500" height="400" class="canvas"></canvas>
    <div @click="submit">上传照片</div>
  </div>
</template>

<script>
import '../assets/js/tracking/tracking.js'
import '@/assets/js/tracking/face.js'
export default {
  name: 'Test',
  data () {
    return {
      videoEle: null
    }
  },
  mounted () {
    this.videoEle = this.$refs.video
    this.openCamera()
  },
  methods: {
    openCamera () {
      let tracker = new window.tracking.ObjectTracker('face')
      tracker.setStepSize(2);
      // //  转头角度影响识别率
      tracker.setEdgesDensity(0.13)
      tracker.setInitialScale(5)
      this.trackerTask = window.tracking.track('#video', tracker, { camera: true })
      tracker.on('track', (event) => {
        if (event.data.length > 0) {
          console.log('有头像')
          //人脸位置矩形顶点
          console.log(event.data)
        } else {
          console.log('没有头像')
        }
      })
    },
    submit () {
      console.log('提交')
      let that = this
      let canvas = document.getElementById('canvas')
      let context = canvas.getContext('2d')
      let video = document.getElementById('video')
      context.drawImage(video, 0, 0, 500, 400)
      canvas.toBlob((blob) => {
        // window.open(URL.createObjectURL(blob))
        // blob 格式 图片url
        // that.avatarUrl = URL.createObjectURL(blob)
        // axios.post({ faceUrl: URL.createObjectURL(blob) })
        //   .then((res) => {
        //     console.log('上传成功')
        //   })
      })
    }
  },
  destroyed () {
    if (!this.mediaStreamTrack) {
      return
    }
    // 关闭摄像头和侦测
    this.mediaStreamTrack.srcObject.getTracks()[0].stop();
    this.trackerTask.stop()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#canvas {
  width: 400px;
  height: 400px;
}
</style>
