<template>
  <div id="app">
<div class="container">
      <!-- <van-nav-bar :title="title" /> -->
    <van-nav-bar :title="$route.meta.title" left-arrow @click-left="clickLeft" />
    <router-view></router-view>
    <tabbar></tabbar>
     <open-player></open-player>
</div>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar.vue";
import http from "../utils/http";
import OpenPlayer from "./components/OpenPlayer.vue"
export default {
  data() {
    return {
      title: this.$route.meta.title,
      titleLists: {},
    msgItem:{}
    };
  },
  components: {
    Tabbar,
    OpenPlayer
  },
  created() {
    this.httpTitle();
    
  },
  methods: {
    async httpTitle() {
      const datas = await http("get", "/radio/channels.do", {
        params: {
          out: "json",
          miniAppId: 4,
        },
      });

      window.sessionStorage.setItem(
        "titleList",
        JSON.stringify(datas.data.channels)
      );
      this.titleList = datas.data.channels;
    },
    clickLeft() {
      this.$router.push("/home");
    },
    // mapList() {
    //   const titleList = window.sessionStorage.getItem("titleList");
    //   const msgItem = JSON.parse(titleList).find((item) => {
    //     if (item.id == this.$route.params.id) {
    //       return true;
    //     }
    //   });
    //   this.msgItem = msgItem;
    // },
  },
  watch: {
  //   "$route.path": function(newVal) {
  //     if (newVal.startsWith("/player")) {
  //       this.mapList();
  //         this.title = this.msgItem.name;
     
  //     } else {
  //       this.title = this.$route.meta.title;
  //     }
  //   },
},
};
</script>
<style lang="less" scoped>
.container{
  padding-top: 46px;
  padding-bottom: 50px;
  overflow: hidden;
  .van-nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: rgba(18, 150, 219) !important;
    /deep/ .van-nav-bar__title {
      color: #fff !important;
      font-size: 18px;
      font-weight: 600;
    }
    /deep/.van-icon-arrow-left {
      color: #fff !important;
      display: none;
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
