<template>
  <div class="player">
    <div class="video_area">
      <img :src="programItem.logo" alt="" />
    </div>

    <div class="play_title">{{ programItem.name }}</div>

    <div class="operators">
      <img
        :src="require('../../images/players/快退.png')"
        @click="fastBack"
        class="i-left"
      />
      <img :src="playImage" @click="changeStatus" class="i-left" />
      <img
        :src="require('../../images/players/快进.png')"
        @click="forward"
        class="i-left"
      />
    </div>
    <!-- 进度条 -->
    <div class="progress-wrapper">
      <div class="progress-bar-wrapper">
        <div class="progress-bar" ref="progressBar" @click="progressClick">
          <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn">
              <div class="progress-btn"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 时间显示 -->
    <div class="time_area">
      <div class="time">{{ currentDuration }}</div>
      <div class="tal_time">{{ totalTime }}</div>
    </div>
    <!-- 操作按钮 -->

    <audio
      controls
      id="maudio"
      ref="maudio"
      preload="auto"
      style="display:none;"
      @timeupdate="onTimeupdate"
      @ended="audioEnd"
    >
      <source :src="url" ref="msource" type="audio/wav" />
    </audio>

    <!-- 节目列表 -->
    <div class="program_list">
      <div class="upvote">
        <div
          :class="['iconfont', sure ? 'icon-dianzan' : 'icon-dianzan1']"
          @click="upvoteClick"
        ></div>
        <div>点赞</div>
      </div>
      <div class="lists">
        <div class="iconfont icon-liebiao"></div>
        <div>节目列表</div>
      </div>
    </div>

    <div class="_blank"></div>

    <!-- 底部 -->
    <div class="footer">
      <div class="footer_title">
        {{ programItem.name }}
      </div>
      <div class="footer_content">
        <h3>详情介绍:</h3>
        <p>{{ programItem.description }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import dealTime from "../../plugin/deal-time";
let vm = new Vue();

export default {
  data() {
    return {
      duration: 1000,
      second: 0,
      currentTime: 0,
      currentDuration: "00:00:00",
      percent: 0,
      playing: true,
      sure: true,
      programItem: {},
      keywords: "",
      url: "",
      endtime: "",
      starttime: "",
    };
  },
  created() {
    this.touch = {};
    this.playing = this.$store.state.playing;
    // this.$store.commit("changePlay")
    // this.duration=this.second/this.$refs.maudio.duration
  },
  mounted() {
    //记录当前组件的id存入vuex
    this.$store.commit("recordId", this.$route.params.id);
    this.$store.getters.getTodoById(this.$route.params.id);
    this.programItem = this.$store.getters.getTodoById(this.$route.params.id);
    this.$event.$emit("targetId", this.$route.params.id);
    this.url = this.$store.getters.getTodoById(this.$route.params.id).uri;
    // this.$store.getters.dealTime(this.$route.params.id)
    this.dealTime();
    // this.$event.$on("changePlayState",()=>{
    //   this.changeStatus()
    // })
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit("changeroute");
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("changleave");
    next();
  },
  methods: {
    //播放时间
    onTimeupdate(e) {
      this.currentTime = parseInt(e.target.currentTime);
    },
    //后退
    fastBack() {
      this.currentTime--;
      this.$refs.maudio.currentTime = this.currentTime;
    },
    //改变播放状态
    changeStatus() {
      this.$refs.maudio.muted = true;
      if (this.playing) {
        this.$refs.maudio.pause();
      } else {
        this.$refs.maudio.play();
      }
      this.$store.commit("changePlay", this.playing);
      this.$event.$emit("addlistenState", this.playing);
      this.playing = !this.playing;
    },
    //快进
    forward() {
      this.currentTime++;
      this.$refs.maudio.currentTime = this.currentTime;
    },
    //处理
    handle(val) {
      let s = val % 60;
      let m = parseInt(val / 60) % 60;
      let h = parseInt(val / 60 / 60);
      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      this.currentDuration = h + ":" + m + ":" + s;
      this.percent = val / this.second;
    },
    //播放结束 修改播放状态
    audioEnd() {
      this.playing = false;
    },
    //点击进度条
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      this.$refs.progress.style.width = offsetWidth;
      this.$refs.progressBtn.style.left = offsetWidth;
      this.percent = offsetWidth / rect.width;
      this.$refs.maudio.currentTime = this.second * this.percent;
    },
    //点赞
    upvoteClick() {
      this.sure = !this.sure;
    },

    dealTime() {
      const endtime = this.programItem.endTime;
      const startTime = this.programItem.startTime;
      this.second = dealTime(endtime) - dealTime(startTime);
    },
  },
  watch: {
    //进度条变化
    percent(val) {
      let value = parseInt(val * 100) + "%";
      this.$refs.progress.style.width = value;
      console.log(value);
      this.$refs.progressBtn.style.left = parseInt(val * 100 - 5) + "%";
    },
    currentTime(val) {
      this.handle(val);
    },
  },
  computed: {
    //播放状态
    playImage() {
      return this.playing
        ? require("../../images/players/pause.png")
        : require("../../images/players/play.png");
    },

    totalTime() {
      let s = this.second % 60;
      let m = parseInt(this.second / 60) % 60;
      let h = parseInt(this.second / 60 / 60);
      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      return h + ":" + m + ":" + s;
    },
  },
};
</script>

<style lang="less" scoped>
@import "//at.alicdn.com/t/font_2083254_pqrqbdm7c0b.css";
.player {
  .video_area {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    img {
      width: 180px;
      height: 170px;
      border-radius: 10px;
    }
  }

  .play_title {
    width: 85%;
    margin: 5px auto;
    font-size: 14px;
    font-weight: 550;
    line-height: 25px;
    text-align: center;
  }
  // background: #eee;
  .progress-wrapper {
    display: flex;
    align-items: center;
    width: 95%;
    margin: 0px auto;
    padding: 10px 0;
    .progress-bar-wrapper {
      flex: 1;
      margin-right: 5px;
      .progress-bar {
        height: 30px;
        cursor: pointer;
        .bar-inner {
          position: relative;
          top: 13px;
          height: 4px;
          background: #dbdbdb;
          border-radius: 20px;
          .progress {
            position: absolute;
            height: 100%;
            background-color: #8c8b90;
            border-radius: 20px;
          }
          .progress-btn-wrapper {
            position: absolute;
            left: -8px;
            top: -13px;
            width: 30px;
            height: 30px;
            .progress-btn {
              position: relative;
              top: 7px;
              left: 7px;
              box-sizing: border-box;
              width: 16px;
              height: 16px;
              border: 3px solid #fff;
              border-radius: 50%;
              background: #8c8b90;
            }
          }
        }
      }
    }
  }
  .operators {
    cursor: pointer;
    text-align: center;
    display: flex;
    width: 75%;
    margin: 30px auto;
    justify-content: space-between;
    img {
      vertical-align: middle;
      width: 30px;
      height: 30px;
    }
  }
}

.time_area {
  display: flex;
  width: 90%;
  margin: 0px auto;
  justify-content: space-between;
  .time {
    color: #aaa;
  }
  .tal_time {
    color: #aaa;
  }
}

.program_list {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  width: 55%;
  height: 60px;
  .upvote {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 30px;
    & > div:nth-child(1) {
      font-size: 35px;
      text-align: center;
    }
    .icon-dianzan1 {
      color: red;
    }
  }
  .lists {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    & > div:nth-child(1) {
      font-size: 25px;
      text-align: center;
      padding-top: 5px;
    }
  }
}
._blank {
  width: 100%;
  height: 3px;
  background-color: rgb(228, 228, 228, 0.3);
  border: none;
}

.footer {
  width: 100%;
  padding: 10px 10px;
  .footer_title {
    line-height: 25px;
    font-size: 15px;
  }
  .footer_content {
    margin-top: 20px;
    h3 {
      margin-bottom: 10px;
    }
    p {
      line-height: 25px;
      font-size: 14px;
    }
  }
}
/deep/.players {
  display: none !important;
}
</style>
