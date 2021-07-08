<template>
  <div>
    <div class="header">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <van-list finished-text="没有更多了" >
      <van-card>
        <template #tags>
          <div class="broad-cast">
            <div class="broad-item" v-for="(item,index) in list" :key="item.id" @click="toPlayDetail(item.id,index)">
              <div>
                <img :src="item.cover" alt="" />
              </div>
              <div>
                <h3>
                  {{ item.name }}
                </h3>
                <p>
                  {{ item.summary }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </van-card>
    </van-list>

    <!-- <div id="loading" ref="load">
      <van-loading size="24px" type="spinner">加载中,请稍后。。。</van-loading>
    </div> -->
  </div>
</template>

<script>
import http from "../../../utils/http";
export default {
  name: "",
  data() {
    return {
      list: [],
      title: "",
      categoryId:this.$route.params.id,
    };
  },
  created() {
    this.changeTitle();
    this.getHttp();
  },
  mounted() {
    this.$event.$emit("CategoryId",this.$route.params.id)
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
    async getHttp() {
      const datas = await http("get", "/album/album!albums.do", {
        params: {
          pageNo: 1,
          categoryId: this.$route.params.id,
          miniAppId: 4,
        },
      });
      this.list = datas.data.albums;
      console.log(datas.data.albums,"输出albums中的数据");
      console.log(this.categoryId,"输出this.categoryId")
      // this.$refs.load.style.display = "none";
      // console.log(this.$route.params.id,"5555")
    },
    onClickLeft() {
      this.$router.go(-1);
    },

    //编程式导航
    toPlayDetail(id,index){
      this.$router.push(`/playDetail/${id}/${this.categoryId}/${index}`);
    },

    changeTitle() {
      let id = this.$route.params.id;
      if (id == 5069) {
        this.title = "广播剧";
      } else if (id == 5065) {
        this.title = "亲子";
      } else if (id == 5066) {
        this.title = "曲艺";
      } else if (id == 5075) {
        this.title = "生活";
      } else if (id == 5077) {
        this.title = "外语";
      } else if (id == 5073) {
        this.title = "文学";
      } else if (id == 5074) {
        this.title = "情感";
      } else if (id == 5057) {
        this.title = "小说";
      } else if (id == 5071) {
        this.title = "资讯";
      } else if (id == 5072) {
        this.title = "文化";
      } else if (id == 5078) {
        this.title = "知识";
      } else if (id == 5076) {
        this.title = "娱乐";
      } else if (id == 5070) {
        this.title = "戏曲";
      }
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 46px;
  z-index: 1000;
  background-color: rgba(18, 150, 219);
}

.container[data-v-7ba5bd90] {
  padding: 0px !important;
}
.broad-cast {
  .broad-item {
    display: flex;
    & > div:nth-child(1) {
      flex: 1;
      img {
        width: 100px;
        height: 100px;
        padding: 10px;
        border-radius: 15px;
      }
    }

    & > div:nth-child(2) {
      flex: 2;
      display: flex;
      flex-direction: column;
      h3 {
        padding: 20px 0 10px 10px;
      }
      p {
        width: 200px;
        padding-left: 10px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}

/deep/.van-loading {
  margin-top: 150px;
  margin-left: 100px;
  background-color: #575757;
  height: 70px;
  width: 180px;
  line-height: 70px;
  text-align: center;
  border-radius: 12px !important;
}
/deep/ .van-loading__text {
  color: #fff;
}
/deep/ .van-nav-bar {
  background-color: rgba(18, 150, 219);
}
/deep/ .van-nav-bar__text {
  color: white !important;
}
/deep/ .van-icon-arrow-left {
  color: white !important;
}
/deep/ .van-ellipsis {
  color: white !important;
}
</style>
