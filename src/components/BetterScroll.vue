<template>
  <div class="person-wrap" ref="personWrap">
    <ul class="person-list" ref="personTab">
      <li class="person-item" v-for="item in iconList" :key="item.id" @click="jumpClick(item.id)">
        <div class="img_area">
          <img :src="item.icon" alt />
        </div>
        <div class="txt">{{ item.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import http from "../../utils/http";
// import Vue from 'vue'
// const Bus = new Vue();
export default {
  name: "",
  data() {
    return {
      bScroll: null,
      iconList: [],
    };
  },
  components: {},

  created() {
    this.getHttpScroll();
    this.$nextTick(() => {
      this.personScroll();
    });
  },
  mounted() {
    let scroll = new BScroll(this.$refs.personWrap, {
      probeType: 3,
    });
  },
  methods: {
    async getHttpScroll() {
      const data = await http("get", "/album/categorys.do", {
        params: {
          out: "json",
          miniAppId: 4,
        },
      });
      const {
        data: { categorys: list },
      } = data;
      this.iconList = list;
      // this.$event.$emit("handledatas",list)
    },

    //跳转
    jumpClick(id){
      this.$router.push(`/categroies/${id}`)
    },
    personScroll() {
      // 默认有六个li子元素，每个子元素的宽度为80px
      let width = 28;
      this.$refs.personTab.style.width = width + "rem";
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.personWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            bounce: false,
            eventPassthrough: "vertical",
            scrollbar: {
              fade: true,
            },
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
  },
  //滑动模块
};
</script>

<style lang="less" scoped>
.person-wrap {
  .person-list {
    .person-item {
      margin-top: 10px;
      display: inline-block;
      height: 75px;
      width: 75px;
      // padding: 5px;
      .img_area {
        width: 90%;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 35px;
          height: 45px;
          border-radius: 6px;
        }
      }

      .txt {
        width: 90%;
        text-align: center;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
/deep/.bscroll-horizontal-scrollbar {
  bottom: auto !important;
  height: 3px !important;
}
</style>
