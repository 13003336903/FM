<template>
  <div class="app-container">
    <swiper :options="swiperOption" v-if="broadCastList1.length > 0">
      <swiper-slide v-for="item of broadCastList1" :key="item.id" ref="swiper">
        <img
          class="slide-img"
          :src="item.logo"
          v-if="index == 0 || index == imgList.length - 1"
        />
        <img v-lazy="item.logo" v-else />
        <div class="txt">{{ item.label }}</div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import http from "../../utils/http";
// 引入vue-awesome-swiper
export default {
  // 注册组件
  data() {
    const that = this;
    return {
      // 图片列表
      num: 0,
      broadCastList1: [],
      index: 0,
      // 配置属性
      swiperOption: {
        direction: "horizontal", // 滑动的方向(水平方向)
         loop: true, // 是否循环
        autoplay: false,
        slidesPerView: "auto", // 设置可视区一共显示几张图片,设置auto,设置auto为自适应;
        centeredSlides: true, // 设置为true时,带有active-slide类名的图片会居中
        spaceBetween: 1, //  每张图片之间的间隔

        on: {
          slideChangeTransitionStart: function() {
         
        let bsId=that.broadCastList1[this.realIndex].id
            that.$event.$emit("transmitindex", bsId);
            // that.$route.meta.title=
        
            // that.imgIndex = this.realIndex + 1;
          },
        },
      },
    };
  },

  created() {
    this.$store.dispatch("getbeijin");
    this.$store.commit("transmitids", this.$route.params.id);
    this.getbroadhttp();
  },
  mouted() {},
  updated() {},
  methods: {
    async getbroadhttp() {
      const datas = await http("get", "/radio/channels.do", {
        params: {
          out: "json",
          miniAppId: 4,
        },
      });

      const num = datas.data.channels.findIndex((item) => {
        if (item.id == this.$route.params.id) {
          return true;
        }
      });
      this.num=num
      // console.log(num)
      let targetItem = datas.data.channels.splice(num);
      this.broadCastList1 = [...targetItem,...datas.data.channels];


    },
  },
};
</script>

<style lang="less" scoped>
// .app-container {
// }
.swiper-slide {
  width: 20%;
  height: 110px;
  margin-top: 20px;

  img {
    width: 100%;
    height: 70%;
    border-radius: 10px;
    border: 1px solid #ddd;
    box-shadow: 0 0 1px 1px #ccc;
  }
  .txt {
    width: 100%;
    text-align: center;
    font-size: 12px;
  }
}

.swiper-slide {
  transform: scale(0.8, 0.7);
  transform-origin: center;
}
.swiper-slide-active {
  transform: scale(1);
  transform-origin: center;
}
</style>
