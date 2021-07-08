<template>
  <div>
    <div class="person-wrap" ref="personWrap">
      <ul class="person-list" ref="personTab">
        <li class="person-item" v-for="item in dataList" :key="item.id">
          <div class="img_area" @click="submitId(item.id)">
            <img :src="item.logo" alt />
          </div>
          <div class="txt">{{ item.name }}</div>
          <div class="txt1">{{ item.label }}</div>
        </li>
      </ul>
    </div>
    <!-- {{$route.params.id}} -->
  </div>
</template>

<script>
import BScroll from "better-scroll";
import http from "../../utils/http";

export default {
  name: "",
  data() {
    return {
      params: {
        out: "json",
        miniAppId: 4,
      },
      dataList: [],
    };
  },
  created() {
    this.$nextTick(() => {
      this.personScroll();
    });
    this.getHtttps();
  },
  mounted() {
 
  },
  methods: {
    personScroll() {
      let width = 70.94;
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
              // interactive: false // 1.8.0 新增
            },
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    async getHtttps() {
      const datas = await http("get", "/radio/channels.do", {
        params: {
          out: "json",
          miniAppId: 4,
        },
      });
      this.dataList = datas.data.channels;
    },
    submitId(id) {
      this.$router.push({
        name: "player",
        params: {
          id: id,
        },
      });
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
.person-wrap {
  .person-list {
    .person-item {
      display: inline-block;
      height: 150px;
      width: 120px;
      margin-right: 20px;
      background-color: rgb(247, 247, 247);
      // padding: 5px;
      .img_area {
        width: 100%;
        height: 110px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          height: 100%;
          border-radius: 6px;
        }
      }

      .txt {
        width: 90%;
        text-align: center;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 2px;
      }
      .txt1 {
        width: 90%;
        height: 20px;
        line-height: 20px;
        padding: 3px;
        color: #ccc;
      }
    }
  }
}
/deep/.bscroll-horizontal-scrollbar {
  bottom: auto !important;
  height: 5px !important;
}
</style>
