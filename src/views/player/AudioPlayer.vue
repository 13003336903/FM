<template>
  <div class="videos">
    <div class="video_area">
      <!--poster属性:这是用来引用video的封面图片的！！！！！-->
      <video
        id="my_video"
        :poster="getAudioList.logo"
        class="video video-js vjs-default-skin vjs-big-play-centered"
        width="100%"
        preload="auto"
        ref="play"
      ></video>
    </div>
    <div class="txt_area">
      <div>{{ getAudioList.name }}</div>
      <div>
        直播中：<span>{{ getAudioList.name }}</span>
      </div>
    </div>
    <div class="bar_area">
      <div class="next_music">下一曲目：暂无</div>
      <i
        @click="player"
        :class="['iconfont', flag ? 'icon-zanting' : 'icon-bofang']"
      ></i>
    </div>
    <!--播放进度条-->
    <div class="player_bar">
      <div class="bar"  ref="barRef"></div>
      <div
        class="dot"
        ref="dotRef"
        :style=" { left: progress } "
      ></div>
      <div
        class="cover"
        ref="coverRefs"
        :style="{ width: progress } "
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    getAudioList: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      url: "",
      flag: false,
      progress: "0%",
     
    };
  },
  mounted() {
    this.playVideo(""); 
 
  },
    //  Update() {
    //       console.log(this.$parent)
    //  },
  methods: {
    playVideo(e) {
      this.$nextTick(() => {
        console.log(Hls.isSupported());
        var myPlayer = document.getElementById("my_video");
        if (Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(e);
          hls.attachMedia(myPlayer);
          hls.on(Hls.Events.MANIFEST_PARSED, function() {});
        }
      });
    },
    player() {
      if (!this.flag) {
        this.$refs.play.play();
        // this.changeProgress();
        this.flag = !this.flag;
      } else {
        this.$refs.play.pause();
        this.flag = !this.flag;
      }
    },
    // changeProgress() {
    //   const musicMp3 = this.$refs.play;
    //   const timer = setInterval(() => {
    //     const numbers = musicMp3.currentTime / musicMp3.duration;
    //     let perNumber = (numbers * 100).toFixed(2) ;
    //     console.log(numbers)
    //     if (perNumber >= 100) {
    //       this.isStore = true;
    //       this.progress = 0;
    //       clearInterval(timer);
    //     }
    //     perNumber += "%";
    //     this.progress = perNumber;
    //   }, 30);
     
    // },
  },
  watch: {
    getAudioList: function(newVal) {
      this.$nextTick(() => {
        this.url = newVal.live.uri;
        this.playVideo(this.url);
      });
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
@import "//at.alicdn.com/t/font_2079656_wauo2ws8xh.css";
.video-js {
  width: 250px !important;
  height: 250px !important;
  background-color: #fff !important;
  background-position: 50% 80% !important ;
}
.videos {
  position: relative;
}
.video_area {
  width: 100%;
  position: relative;
  height: 250px;
}
video {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.txt_area {
  height: 80px;
  position: relative;
  div {
    width: 200px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }
  & > div:nth-child(1) {
    top: 0px;
    font-weight: 600;
  }
  & > div:nth-child(2) {
    top: 30px;
  }
}
.bar_area {
  width: 100%;
  position: relative;
  height: 50px;
  i {
    font-size: 40px;
    display: block;
    position: absolute;
    top: 0px;
    right: 20px;
  }
  .next_music {
    position: absolute;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
  }
}
.player_bar {
  width: 90%;
  height: 20px;
  position: relative;
  margin: 0 auto;
  .bar {
    width: 100%;
    background-color: #ddd;
    height: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1px;
  }
  .cover {
    width: 1%;
    background-color: #bbb;
    height: 3px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2px;
  }
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #bbb;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 200;
    left: -6px;
  }
}
</style>
