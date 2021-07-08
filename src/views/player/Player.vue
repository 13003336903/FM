<template>
  <div class="container">
    <div class="header">
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <img class="bg" :src="list.cover" />
    <div class="top">
      <img :src="list.cover" />
      <div class="title">{{ playDetail.name }}</div>
      <van-button
        :icon="isHeart ? 'plus' : ''"
        type="primary"
        :color="isHeart ? '#4A90E2' : '#bbb'"
        @click="changeHeart(playDetail.id)"
        >{{ isHeart ? "收藏" : "已收藏" }}</van-button
      >
    </div>
    <div class="bill">
      <img :src="list.cover" />
    </div>
    <!-- 进度条 -->
    <div class="timeShow">
      <audio
        :controls="false"
        id="player"
        ref="player"
        :src="playDetail.content"
        @timeupdate="onTimeupdate"
        @ended="audioEnd"
      ></audio>

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
    </div>

    <!-- 播放以及切换歌曲 -->
    <div class="control">
      <img
        class="last"
        src="../../images/icons/backward.png"
        @click="fastBack"
      />
      <img
        class="playAndPause"
        :src="isStore ? startIcon : stopIcon"
        @click="change"
      />
      <img class="next" src="../../images/icons/forward.png" @click="forward" />
    </div>

    <!-- 播放器功能区 -->
    <div class="func">
      <img
        :src="isHeart ? heartBlack : heartRed"
        @click="changeHeart(playDetail.id)"
      />
      <img
        :src="isLike ? likeBlack : likeRed"
        @click="changeLike(playDetail.id)"
      />
      <img src="../../images/icons/songlist.png" @click="showSheetPlayList" />
      <img src="../../images/icons/comment.png" @click="showPopup" />
    </div>
    <!-- 音频介绍 -->
    <div class="info">
      <h3>{{ playDetail.name }}</h3>
      <h6>详情介绍：</h6>
      <h6>{{ list.summary }}</h6>
    </div>

    <!-- 弹出广告 -->
    <div class="popAdvert">
      <van-popup v-model="show">
        <img class="advert" src="https://ma.rbc.cn/images/tingting/app.png" />
      </van-popup>
    </div>
    <!-- ActionSheet 动作面板 -->
    <div class="ActionSheet">
      <van-action-sheet
        v-model="showPlayList"
        round
        position="bottom"
        :style="{ height: '60%' }"
        closeable
        title="播放列表"
      >
        <div class="content">
          <van-list>
            <van-cell
              v-for="(item, index) in playDetailSong"
              :key="item.id"
              @click="toPlayer(index)"
            >
              <h4 class="playTitle">{{ item.name }}</h4>
              <template #extra>
                <h5 class="clickplay">点击播放</h5>
              </template>
            </van-cell>
          </van-list>
        </div>
      </van-action-sheet>
    </div>
  </div>
</template>  
  
<script>
import commonHttp from "../../../utils/http";
import { playDetailURL } from "../../../utils/api";
import http from "../../../utils/http";
export default {
  components: {
    //别忘了引入组件
  },
  data() {
    return {
      isStore: true,
      isHeart: true,
      isLike: true,
      show: false,
      showPlayList: false,
      startIcon: require("../../images/icons/play.png"),
      stopIcon: require("../../images/icons/pause.png"),
      heartBlack: require("../../images/icons/heart-black.png"),
      heartRed: require("../../images/icons/heart-red.png"),
      likeBlack: require("../../images/icons/likeBlack.png"),
      likeRed: require("../../images/icons/likeRed.png"),
      id: this.$route.params.id,
      categoryId: this.$route.params.categoryId,
      index: this.$route.params.index,
      indexS: this.$route.params.indexS,
      playDetail: [],
      playDetailSong: [],
      list: [],
      //进度条
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
      duration: 0,
      heartandlike: [],
      dianzan: [],
      cateid:0
    };
  },
  created() {
    window.pageYOffset = 0;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // this.getPlayList();
    this.getHttp();
    this.getPlayDetail(playDetailURL, "content");
    this.touch = {};
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
  //在mounted中拿不到this.playDetail
  // mounted() {
  //   let heartandlike = localStorage.getItem("heartandlike");
  //   if (heartandlike) {
  //     this.heartandlike = JSON.parse(heartandlike);
  //     this.heartandlike.forEach((item) => {
  //       console.log(item.id, "后");
  //       console.log(this.playDetail, "吼吼");
  //       if (item.id == 452228) {
  //         console.log(item.isHeart, 666);
  //         this.isHeart = item.isHeart;
  //       }
  //     });
  //   }
  // },
  mounted(){
// this.$event.$on("CategoryId",(id)=>{
//   console.log(id,"xxxxxxxxxxxxxxxxxxxxxx")
// })


  },
  beforeUpdate(){
    console.log(this.$store.state.datasId)
  },
  updated(){
    this.id=this.$route.params.id
  },
  methods: {
    //后退
    fastBack() {
      this.currentTime = this.currentTime - 5;
      this.$refs.player.currentTime = this.currentTime;
    },
    //快进
    forward() {
      this.currentTime = this.currentTime + 5;
      this.$refs.player.currentTime = this.currentTime;
    },
    //播放时间
    onTimeupdate(e) {
      this.currentTime = parseInt(e.target.currentTime);
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
      this.percent = val / this.duration;
    },
    //播放结束 修改播放状态
    audioEnd() {
      this.playing = false;
    },

    toPlayer(index) {
      console.log(index, 666);
      this.$router.push(
        `/player/${this.id}/${index}/${this.categoryId}/${this.indexS}`
      );
      location.reload();
    },

    async getHttp() {
      // const that=this;
      const resultPlayList = await http("get", "/album/album!albums.do", {
      
       params: {
          pageNo: 1,
          categoryId:this.$store.state.datasId,
          miniAppId: 4,
        },
      });
      console.log(resultPlayList.data.albums,"详情页输出albums的数据");
      if (resultPlayList.status.status == true) {
        this.list = resultPlayList.data.albums[this.indexS];
        console.log(this.list, "输出音频列表的节目");
      }
    },
    // async getPlayList() {
    //   const result1 = await commonHttp("get", "/album/album!albums.do", {
    //     params: {
    //       pageNo: 1,
    //       categoryId: this.categoryId,
    //       miniAppId: 4,
    //     },
    //   });
    //   console.log(result1.data.albums, "输出albums");
    //   if (result1.status.status == true) {
    //     this.list = result1.data.albums[this.indexS];
    //   }
    // },
    async getPlayDetail(url, keyword) {
      const result = await commonHttp(
        "get",
        url +
          `${keyword}!${keyword}s.do?pageNo=1&albumId=` +
          this.id +
          "&miniAppId=4"
      );

      if (result.status.status == true) {
        this.playDetail = result.data.contents[this.index];
        console.log(this.playDetail, 777);
        console.log(this.index, "输出歌曲下标");
        this.duration = this.playDetail.duration;
        this.playDetailSong = result.data.contents;
        // console.log(this.playDetailSong, 111);
        // console.log(this.duration)
      }

      //怎么缓存数据？
      // 第二步：拿取缓存，并根据id，获取到收藏和喜欢的状态。将data中的heartandlike设置成缓存中的值
      let heartandlike = localStorage.getItem("heartandlike");
      if (heartandlike) {
        this.heartandlike = JSON.parse(heartandlike);
        // console.log(this.heartandlike, "缓存");
        this.heartandlike.forEach((item) => {
          // console.log(item.id, "后");
          if (item.id == this.playDetail.id) {
            // console.log(item.isHeart, 666);
            this.isHeart = item.isHeart;
          }
        });
      }
      let dianzan = localStorage.getItem("dianzan");
      if (dianzan) {
        this.dianzan = JSON.parse(dianzan);
        // console.log(this.dianzan, "缓存缓存");
        this.dianzan.forEach((item) => {
          // console.log(item.id, "后");
          if (item.id == this.playDetail.id) {
            // console.log(item.isLike, 6666);
            this.isLike = item.isLike;
          }
        });
      }
    },
    change() {
      this.isStore = !this.isStore;
      if (this.isStore == true) {
        this.$refs.player.pause();
      }
      if (this.isStore == false) {
        this.$refs.player.play();
      }
    },

    // 第一步：更改喜欢的状态，并设置缓存
    changeHeart(id) {
      this.isHeart = !this.isHeart;
      // console.log(id, "前");
      let newHeart = {
        id,
        isHeart: this.isHeart,
      };
      this.heartandlike = [...this.heartandlike, newHeart];
      console.log(this.heartandlike, "心的缓存");
      localStorage.setItem("heartandlike", JSON.stringify(this.heartandlike));
      if (this.isHeart == true) {
        this.$toast.success("取消成功");
      }
      if (this.isHeart == false) {
        this.$toast.success("收藏成功");
      }
    },
    changeLike(id) {
      let newLike = {
        id,
        isLike: this.isLike,
      };
      this.dianzan = [...this.dianzan, newLike];
      console.log(this.dianzan, "点赞缓存");
      localStorage.setItem("dianzan", JSON.stringify(this.dianzan));
      if (this.isLike == true) {
        this.$toast.success("点赞成功");
        this.isLike = !this.isLike;
      } else {
        this.$toast(
          "亲，您已经给我点过赞了哦！为其他节目或内容仍然可以点赞哦！"
        );
      }
    },
    // 广告弹出
    showPopup() {
      this.show = true;
    },
    //音频列表弹出
    showSheetPlayList() {
      this.showPlayList = true;
    },
    //点击进度条
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      this.$refs.progress.style.width = offsetWidth;
      this.$refs.progressBtn.style.left = offsetWidth;
      this.percent = offsetWidth / rect.width;
      this.$refs.player.currentTime = this.duration * this.percent;
    },
    onClickLeft() {
      console.log(this.$route.path)
      // this.$router.push(`/playDetail/${this.id}/${this.$store.state.datasId}/${this.index}`);
      this.$router.go(-1);
    },
  },
  watch: {
    //进度条变化
    percent(val) {
      let value = parseInt(val * 100) + "%";
      this.$refs.progress.style.width = value;
      // console.log(value);
      this.$refs.progressBtn.style.left = parseInt(val * 100 - 5) + "%";
    },
    currentTime(val) {
      this.handle(val);
    },
  },
  computed: {
    totalTime() {
      let s = this.duration % 60;
      let m = parseInt(this.duration / 60) % 60;
      let h = parseInt(this.duration / 60 / 60);
      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      return h + ":" + m + ":" + s;
    },
  },
};
</script>  
  
<style lang="less" scoped>
.container {
  position: relative;
  // top: -5px;
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 46px;
    z-index: 1000;
    background-color: rgba(18, 150, 219);
  }
  // height: 560px;
  .bg {
    width: 100%;
    height: 463px;
    position: relative;
    top: -50px;
    // background: url(../../images/养水物语.jpg) center no-repeat;
    // background-size: cover;
    filter: contrast(5%) blur(3px);
  }
  .top {
    height: 80px;
    width: 335px;
    margin: 20px;
    border-bottom: 1px solid #a9a9a9;
    position: absolute;
    top: 0;
    img {
      height: 60px;
      width: 60px;
      border-radius: 5px;
      float: left;
    }
    .title {
      color: white;
      float: left;
      margin-top: 22px;
      margin-left: 30px;
      height: 18px;
      width: 148px;
      display: -webkit-box;
      -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
      -webkit-line-clamp: 1; /** 显示的行数 **/
      overflow: hidden; /** 隐藏超出的内容 **/
    }
    .van-button {
      float: right;
      margin-top: 16px;
      width: 80px;
      height: 30px;
      font-size: 12px;
    }
  }
  .bill {
    position: absolute;
    top: 120px;
    // border: 1px solid red;
    width: 100%;
    height: 300px;
    img {
      width: 250px;
      height: 250px;
      border-radius: 10px;
      filter: drop-shadow(5px 5px 15px rgba(0, 0, 0, 0.5));
      margin-left: 62px;
    }
  }
  .timeShow {
    position: absolute;
    top: 410px;
    // border: 1px solid yellow;
    width: 100%;
    height: 45px;
    // audio {
    //   position: absolute;
    //   left: 50%;
    //   top: 50%;
    //   transform: translate(-50%, -50%);
    // }
    // background: #eee;
    .progress-wrapper {
      position: absolute;
      top: 21px;
      // display: flex;
      align-items: center;
      width: 100%;
      margin: 0px auto;
      padding: 10px 0;
      .progress-bar-wrapper {
        // flex: 1;
        // margin-right: 5px;
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
              background-color: rgb(74, 144, 226);
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
                background: rgb(74, 144, 226);
              }
            }
          }
        }
      }
    }
    // 时间显示
    .time_area {
      display: flex;
      width: 90%;
      margin: 0px auto;
      margin-top: 20px;
      justify-content: space-between;
      .time {
        color: #fff;
      }
      .tal_time {
        color: #fff;
      }
    }
  }
  .control {
    height: 90px;
    // border: 1px solid red;
    position: relative;
    top: -50px;
    // margin-top: 0;
    .last {
      position: absolute;
      left: 1.33rem;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 40px;
      height: 40px;
    }
    .playAndPause {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .next {
      position: absolute;
      top: 0;
      right: 1.33rem;
      bottom: 0;
      margin: auto;
      width: 40px;
      height: 40px;
    }
  }
  .func {
    width: 100%;
    height: 70px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    position: relative;
    top: -50px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .info {
    // height: 80px;
    // width: 100%;
    position: relative;
    top: -50px;
    margin-top: 15px;
    padding: 10px;
    color: gray;
    h3 {
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
  .popAdvert {
    .advert {
      height: 480px;
      width: 300px;
    }
  }
  .ActionSheet {
    .van-action-sheet__header {
      font-weight: bold;
      font-size: 15px;
    }
    .content {
      padding-left: 10px;
      padding-right: 10px;
      .playTitle {
        font-size: 12px;
        color: #928d8d;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 1; /** 显示的行数 **/
        overflow: hidden;
        width: 60%;
      }
      /deep/.van-cell {
        .clickplay {
          font-size: 12px;
          color: rgb(17, 224, 79);
        }
      }
    }
  }
}
</style>  