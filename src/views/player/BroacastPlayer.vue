<template>
  <div>
    <!-- 头部轮播图 (slide-header滑动头部)-->
    <slide-header
      :hindex="hindex"
      @transmitindex="transmitindex"
    ></slide-header>

    <audio-player :getAudioList="getAudioList"></audio-player>
  </div>
</template>

<script>
import SlideHeader from "@/components/SlideHeader.vue";
import AudioPlayer from "./AudioPlayer.vue";
import http from "../../../utils/http";
export default {
  name: "",
  data() {
    return {
      broadCastList: [],
      itemList: {},
      getAudioList: {},
      getAudio1List: {},
      hindex: 0,
      num: 0,
      num1: 0,
    };
  },
  created() {
    this.getbroadhttp();
    this.getaudio();
    this.setSession();
  },
  mounted() {
    this.$event.$on("transmitindex", function(datas) {
      this.num = datas;
    });
  },
  beforeUpdate() {
    setTimeout(() => {
      this.getAudio();
    }, 4000);
  },
  updated() {},
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
    async getbroadhttp() {
      const datas = await http("get", "/radio/channels.do", {
        params: {
          out: "json",
          miniAppId: 4,
        },
      });
      this.broadCastList = datas.data.channels;
      this.itemList = datas.data.channels.find((item) => {
        if (item.id == this.$route.params.id) {
          return true;
        }
      });
      const index = datas.data.channels.findIndex((item) => {
        if (item.id == this.$route.params.id) {
          return true;
        }
      });
      this.hindex = index;
    },

    // getaudio() {
    //   const datas = window.sessionStorage.getItem("titleList");
    //   this.getAudioList = JSON.parse(datas).find((item) => {
    //     if (item.id == this.$route.params.id) {
    //       return true;
    //     }
    //   });
    //   this.num1 = JSON.parse(datas).findIndex((item) => {
    //     if (item.id == this.$route.params.id) {
    //       return true;
    //     }
    //   });
    // },
    // getAudio() {
    //   const datas = window.sessionStorage.getItem("titleList");
    //   this.$event.$on("transmitindex", (num) => {
    //     const targetItem = JSON.parse(datas).find((item) => {
    //       if (item.id == num) {
    //         return true;
    //       }
    //     });
    //     this.getAudioList = targetItem;
    //   });
    // },
    transmitindex(index) {
      const datas = window.sessionStorage.getItem("titleList");
      this.getAudio1List = JSON.parse(datas)[index];
    },

    setSession() {
      const datas = window.sessionStorage.getItem("titleList");
      let targetItem = JSON.parse(datas).splice(this.num1, 1);
      window.sessionStorage.setItem("titleList", datas);
      console.log(datas);
      JSON.parse(datas).unshift(targetItem[0]);
      window.sessionStorage.setItem("titleList", datas);
    },
  },
  components: {
    SlideHeader,
    AudioPlayer,
  },
};
</script>

<style></style>
