<!-- 播放列表详情页 -->
<template>
  <div class="container">
    <!-- 头部 -->
    <div class="header">
      <!-- <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      /> -->
      <van-nav-bar
        left-arrow
        @click-left="onClickLeft"
      >
        <template #title>
          <span>{{ list.name }}</span>
        </template>
      </van-nav-bar>
    </div>
    <img class="bg" :src="list.cover" />
    <div class="title">{{ list.name }}</div>
    <div class="speaker">播讲者：{{ list.impresario }}</div>
    <div class="info">
      <img :src="list.cover" is-link @click="showPopup" />
      <div class="right">
        <div class="intro">{{ list.summary }}</div>
        <van-button
          :icon="isHeart ? 'plus' : ''"
          type="primary"
          :color="isHeart ? '#4A90E2' : '#bbb'"
          @click="changeHeart(list.id)"
          >{{ isHeart ? "收藏" : "已收藏" }}</van-button
        >
      </div>
    </div>
    <!-- 使用van-sticky有问题 -->
    <div class="scro">
      <div class="playlist">音频列表</div>
      <van-button
        icon="play-circle"
        plain
        type="info"
        hairline
        round
        @click="toPlayer(0)"
        >播放全部</van-button
      >
      <div class="num">（共计{{ paging.totalCount }}首）</div>
    </div>
    <!-- 歌曲列表 -->
    <van-list>
      <van-cell
        v-for="(item, index) in playDetail"
        :key="item.id"
        @click="toPlayer(index)"
      >
        <template #title>
          <h4 class="playTitle">{{ item.name }}</h4>
        </template>
        <template #label>
          <span class="time">{{ item.createTime | msgFormat }}</span>
          <van-icon name="ellipsis" size="20" />
        </template>
      </van-cell>
    </van-list>
    <!-- 弹出层内容 -->
    <van-popup
      position="bottom"
      v-model="show"
      :style="{ height: '100%' }"
      closeable
    >
      <img class="bg" :src="list.cover" />
      <img :src="list.cover" />
      <div class="content">
        <div class="innerTitle">{{ list.name }}</div>
        <div class="innerSpeaker">播讲者：{{ list.impresario }}</div>
        <div class="line"></div>
        <div class="innerContent">{{ list.summary }}</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import http from "../../../utils/http";
import commonHttp from "../../../utils/http";
import { playDetailURL } from "../../../utils/api";

//实现音乐播放栏随页面滚动
$(function () {
  $(document).scroll(function () {
    var stop = $(window).scrollTop();
    if (stop > $(".info").height() + $(".bg").height() - 30) {
      $(".scro").css({
        position: "fixed",
        top: "46px",
        "z-index": "300",
      });
    }
    if (stop <= $(".info").height() + $(".bg").height() - 30) {
      $(".scro").css({
        position: "relative",
        top: "4.4rem",
      });
      // console.log("666");
    }
  });
});

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {
      //通过编程式导航传过来的三个参数
      id: this.$route.params.id,
      categoryId: this.$route.params.id,
      index: this.$route.params.index,
      playDetail: [],
      paging: "",
      list: [],
      show: false,
      isHeart: true,
    };
  },

  //过滤时间多余部分
  filters: {
    msgFormat: function (msg) {
      return msg.slice(0, 10);
    },
  },

  created() {
    this.getPlayDetail(playDetailURL, "content");
    // this.getPlayList();
    this.getHttp();
    console.log(this.index, "输出下标");
    this.$store.commit("cateId", this.$route.params.categoryId);
    //  this.$event.$emit("dataId",this.$route.params.categoryId)
    //  console.log(this.$route.params.categoryId,"xxxxxxxxxxxxx");
  },
  beforeUpdate() {
    this.index = this.$route.params.index;
  },
  methods: {
    async getPlayDetail(url, keyword) {
      const result = await commonHttp(
        "get",
        url +
          `${keyword}!${keyword}s.do?pageNo=1&albumId=` +
          this.id +
          "&miniAppId=4"
      );
      console.log(this.id);
      if (result.status.status == true) {
        this.playDetail = result.data.contents;
        this.paging = result.data.paging;
        console.log(this.playDetail, 666);
        // console.log(this.paging);
      }

      let heartandlike = localStorage.getItem("heartandlike");
      if (heartandlike) {
        this.heartandlike = JSON.parse(heartandlike);
        // console.log(this.heartandlike, "缓存");
        this.heartandlike.forEach((item) => {
          // console.log(item.id, "后");
          if (item.id == this.list.id) {
            // console.log(item.isHeart, 666);
            this.isHeart = item.isHeart;
          }
        });
      }
    },

    async getHttp() {
      const resultPlayList = await http("get", "/album/recommends!albums.do", {
        params: {
          out: "json",
          miniAppId: 4,
        },
      });
      console.log(resultPlayList.data.albums, "详情页输出albums的数据");
      if (resultPlayList.status.status == true) {
        console.log(this.index, "xxxxxxxxxxxxxxxxx");
        this.list = resultPlayList.data.albums[this.index];
        console.log(this.list, "输出音频列表的节目");
      }
    },
    //编程式导航
    toPlayer(index) {
      this.$router.push(
        `/detail/${this.id}/${index}/${this.categoryId}/${this.index}`
      );
    },

    // 点击按钮实现收藏功能
    changeHeart(id) {
      this.isHeart = !this.isHeart;
      // console.log(id, "前");
      let newHeart = {
        id,
        isHeart: this.isHeart,
      };
      this.heartandlike = [...this.heartandlike, newHeart];
      localStorage.setItem("heartandlike", JSON.stringify(this.heartandlike));
      if (this.isHeart == true) {
        this.$toast.success("取消成功");
      }
      if (this.isHeart == false) {
        this.$toast.success("收藏成功");
      }
    },

    //弹出框
    showPopup() {
      this.show = true;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang='less' scoped>
.container {
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 46px;
    z-index: 1000;
    background-color: rgba(18, 150, 219);
  }
  position: relative;
  // top: -6px;
  .bg {
    width: 100%;
    height: 200px;
    position: absolute;
    top: 0;
    filter: blur(5px) contrast(20%);
  }
  .title {
    position: absolute;
    top: 30px;
    left: 15px;
    font-size: 20px;
    font-weight: bolder;
    color: #fff;
  }
  .speaker {
    position: absolute;
    top: 70px;
    left: 15px;
    font-size: 15px;
    // font-weight: bolder;
    color: #fff;
  }
  .info {
    position: relative;
    width: 100%;
    height: 90px;
    top: 150px;
    // border: 1px solid red;
    background-color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    img {
      width: 110px;
      height: 110px;
      border-radius: 5px;
      position: absolute;
      left: 15px;
      top: -30px;
    }
    .right {
      position: absolute;
      left: 140px;
      top: 10px;
      width: 220px;
      .intro {
        font-size: 12px;
        color: gray;
        word-break: break-all; /*属性规定自动换行的处理方法。normal(使用浏览器默认的换行规则。),break-all(允许在单词内换行。),keep-all(只能在半角空格或连字符处换行。)*/
        text-overflow: ellipsis;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 2; /** 显示的行数 **/
        overflow: hidden;
        // height: 30px;
      }
      .van-button {
        margin-top: 10px;
        width: 100px;
        height: 30px;
        font-size: 12px;
      }
    }
  }
  .scro {
    background-color: #fff;
    height: 60px;
    width: 100%;
    position: relative;
    top: 165px;
    //  margin-top: 160px;
    .playlist {
      margin-left: 15px;
      font-size: 18px;
      font-weight: bolder;
    }
    .van-button {
      width: 100px;
      height: 30px;
      font-size: 12px;
      margin-left: 15px;
      margin-top: 10px;
      float: left;
    }
    .num {
      float: left;
      margin-left: 10px;
      margin-top: 15px;
    }
  }
  .van-list {
    margin-top: 170px;
    .van-icon {
      float: right;
      margin-right: 10px;
      width: 10px;
      height: 10px;
    }
  }
  .van-popup {
    // position: relative;
    .bg {
      width: 100% !important;
      height: 100% !important;
      position: absolute;
      top: 0;
    }
    img {
      width: 100px;
      height: 100px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      top: 50px;
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 70px;
      color: #fff;
      position: relative;
      font-size: 15px;
      div {
        margin-bottom: 20px;
      }
      .line {
        border-top: 0.1px solid #fff;
        height: 0.1px;
        width: 280px;
      }
      .innerSpeaker,
      .innerContent {
        font-size: 12px;
      }
      .innerContent {
        padding: 0 15px;
      }
    }
  }
}
</style>