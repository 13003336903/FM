<!--首页-->
<template>
  <div id="home">
    <!-- 头部 -->
    <van-card>
      <template #tags>
        <input-box />
        <swiper />
        <better-scroll></better-scroll>
      </template>
    </van-card>

    <!-- 热门电台一 -->
    <van-card>
      <template #tags>
        <header-title> 热门电台 </header-title>
        <scroll-bar></scroll-bar>
      </template>
    </van-card>

    <!-- 原生节目 -->
    <van-card>
      <template #tags>
        <div class="header">
          <div class="first">原创节目</div>
          <div @click="transmithandle()">查看全部</div>
        </div>
        <!-- 主体内容 -->
        <div class="content">
          <div
            class="content_area"
            v-for="(item, index) in dataList"
            :key="item.id"
            @click="toselfplaydetail(item.id, index)"
          >
            <div>
              <img :src="item.cover" alt="" />
            </div>
            <div>
              <h3>{{ item.name }}</h3>
              <p>
                {{ item.summary }}
              </p>
            </div>
            <div>
              <button ref="show" @click.stop="showClick(item.id, index)">
                收藏
              </button>
            </div>
          </div>
        </div>
      </template>
    </van-card>
    <!-- 亲子栏目 -->
    <van-card>
      <template #tags>
        <header-title> 亲子 </header-title>
        <div class="child-area">
          <div
            class="child-item"
            v-for="(item, index) in setChildren"
            :key="item.id"
            @click="toPlayDetailQinZi(item.id, index)"
          >
            <div>
              <img :src="item.cover" alt="" />
            </div>
            <div>
              {{ item.name }}
            </div>
            <div>{{ item.summary }}</div>
          </div>
        </div>
      </template>
    </van-card>

    <!-- 广播剧 -->
    <van-card>
      <template #tags>
        <header-title> 广播剧 </header-title>
        <div class="broad-cast">
          <div
            class="broad-item"
            v-for="(item, index) in broacastlist"
            :key="item.id"
            @click="toPlayDetailGuangBoJu(item.id, index)"
          >
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

    <!-- 情感 -->
    <van-card>
      <template #tags>
        <header-title> 情感 </header-title>
        <div class="child-area">
          <div
            class="child-item"
            v-for="(item, index) in setLover"
            :key="item.id"
            @click="toPlayDetailQinGan(item.id, index)"
          >
            <div>
              <img :src="item.cover" alt="" />
            </div>
            <div>
              {{ item.name }}
            </div>
            <div>{{ item.summary }}</div>
          </div>
        </div>
      </template>
    </van-card>

    <!-- 文化 -->
    <van-card>
      <template #tags>
        <header-title> 文化 </header-title>
        <div class="broad-cast">
          <div
            class="broad-item"
            v-for="(item, index) in setCuture"
            :key="item.id"
            @click="toPlayDetailWenHua(item.id, index)"
          >
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

    <!-- 生活 -->
    <van-card>
      <template #tags>
        <header-title> 生活 </header-title>
        <div class="child-area">
          <div
            class="child-item"
            v-for="(item, index) in setLife"
      ``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````      :key="item.id"
            @click="toPlayDetailShengHuo(item.id, index)"
          >
            <div>
              <img :src="item.cover" alt="" />
            </div>
            <div>
              {{ item.name }}
            </div>
            <div>{{ item.summary }}</div>
          </div>
        </div>
      </template>
    </van-card>

    <!-- 资讯 -->
    <van-card>
      <template #tags>
        <header-title> 资讯 </header-title>
        <div class="broad-cast">
          <div
            class="broad-item"
            v-for="(item, index) in setNews"
            :key="item.id"
            @click="toPlayDetailZiXun(item.id, index)"
          >
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

    <!-- 体育 -->
    <van-card>
      <template #tags>
        <header-title> 体育 </header-title>
        <div :class="['child-area', num > 3 ? '' : 'active']">
          <div
            class="child-item"
            v-for="(item, index) in setPlay"
            :key="item.id"
            @click="toPlayDetailTiYu(item.id, index)"
          >
            <div>
              <img :src="item.cover" alt="" />
            </div>
            <div>
              {{ item.name }}
            </div>
            <div>{{ item.summary }}</div>
          </div>
        </div>
      </template>
    </van-card>

    <!-- 娱乐 -->
    <van-card>
      <template #tags>
        <header-title> 娱乐 </header-title>
        <div class="broad-cast">
          <div
            class="broad-item"
            v-for="(item, index) in setEnt"
            :key="item.id"
            @click="toPlayDetailYuLe(item.id, index)"
          >
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

    <!-- 外语 -->
    <van-card>
      <template #tags>
        <header-title> 外语 </header-title>
        <div class="child-area">
          <div
            class="child-item"
            v-for="(item, index) in setenglishList"
            :key="item.id"
            @click="toPlayDetailWaiYu(item.id, index)"
          >
            <div>
              <img :src="item.cover" alt="" />
            </div>
            <div>
              {{ item.name }}
            </div>
            <div>{{ item.summary }}</div>
          </div>
        </div>
      </template>
    </van-card>
  </div>
</template>

<script>
import swiper from "@/components/Swiper.vue";
import InputBox from "@/components/InputBox.vue";
import BetterScroll from "@/components/BetterScroll.vue";
import ScrollBar from "@/components/ScrollBar.vue";
import HeaderTitle from "@/components/HeaderTitle.vue";
import http from "../../utils/http";
import initTime from "@/plugin/init-nowtime";
import uniques from "@/plugin/unique";
import { mapState, mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      num: 0,
      lovelist: [],
      indexList: [],
      dataList: [],
      categoryId: this.$route.params.id,
    };
  },
  created() {
    this.$store.dispatch("gethttp");
    this.$store.dispatch("getchildHttp");
    this.$store.dispatch("getbrodcast");
    this.$store.dispatch("getculture");
    this.$store.dispatch("getLife");
    this.$store.dispatch("getNews");
    this.$store.dispatch("getPlay");
    this.$store.dispatch("getEnt");
    this.$store.dispatch("getEnglish");
    this.getLover();
    // this.getHttpSong();
    this.getSongId();
    listSongId: [];
  },
  mounted() {
    let list = JSON.parse(sessionStorage.getItem("list"));
    if (!list || list == "") {
      this.gethttp();
    } else {
      this.indexList = JSON.parse(sessionStorage.getItem("list"));
      let id = JSON.parse(sessionStorage.getItem("id"));
      this.dataList = JSON.parse(sessionStorage.getItem("dataList"));
      list.forEach((item) => {
        this.$nextTick(() => {
          this.$refs.show[item].style.backgroundColor = "#e5e5e5";
          this.$refs.show[item].style.color = "#666666";
          this.$refs.show[item].innerHTML = "已收藏";
        });
      });
    }
    //整合
    this.$event.$on("CategoryId", (id) => {
      console.log(id, "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    });
  },

  methods: {
    //发送请求获取情感数据
    async getLover() {
      const datas = await http("get", "/album/album!albums.do", {
        params: {
          pageNo: 1,
          categoryId: 5074,
          miniAppId: 4,
        },
      });
      this.lovelist = datas.data.albums;
    },
    //节流阀函数
    fnThrottle(method, delay, duration) {
      var that = this;
      var timer = this.timer;
      var begin = new Date().getTime();
      return function () {
        var current = new Date().getTime();
        clearTimeout(timer);
        if (current - begin >= duration) {
          method();
          begin = current;
        } else {
          that.timer = setTimeout(function () {
            method(m);
          }, delay);
        }
      };
    },
    //处理按钮状态函数
    changState(id, index) {
      let flag = this.dataList[index].flag;
      if (flag) {
        this.$refs.show[index].style.backgroundColor = "#e5e5e5";
        this.$refs.show[index].style.color = "#666666";
        this.$refs.show[index].innerHTML = "已收藏";
        this.dataList[index].flag = false;
        sessionStorage.setItem("dataList", JSON.stringify(this.dataList));

        this.indexList.push(index);
        this.fnThrottle(this.$toast.success("收藏成功"), 1000, 1000);
      } else {
        this.$refs.show[index].style.backgroundColor = "rgb(206, 225, 255)";
        this.$refs.show[index].style.color = "rgb(74, 144, 226)";
        this.$refs.show[index].innerHTML = "收藏";
        this.dataList[index].flag = true;
        sessionStorage.setItem("dataList", JSON.stringify(this.dataList));
        const num = this.indexList.findIndex((item) => {
          if (item == index) {
            return true;
          }
        });
        this.indexList.splice(num, 1);

        this.fnThrottle(this.$toast.success("取消成功"), 1000, 1000);
      }
    },

    //收藏点击事件触发
    showClick(id, index) {
      this.changState(id, index);
      sessionStorage.setItem("index", JSON.stringify(index));
      sessionStorage.setItem("id", JSON.stringify(id));
      this.indexList = uniques(this.indexList);
      sessionStorage.setItem("list", JSON.stringify(this.indexList));
    },
    transmithandle() {
      this.$router.push("/detail");
    },

    async gethttp() {
      const datas = await http("get", "/album/recommends!albums.do", {
        params: {
          out: "json",
          miniAppId: 4,
        },
      });
      this.dataList = datas.data.albums;
      //发送请求时给数组每一项中设置一个flag开关，控制当前数组对象
      this.dataList = this.dataList.map((item) => {
        return Object.assign(item, { flag: true });
      });
      window.sessionStorage.setItem("dataList", JSON.stringify(this.dataList));
      window.sessionStorage.setItem(
        " indexList",
        JSON.stringify(this.indexList)
      );
    },

    //编程式导航
    toselfplaydetail(id, index) {
      this.$router.push(`/detail/${id}/undefined/${index}`);
    },
    toPlayDetailQinZi(id, index) {
      this.$router.push(`/playDetail/${id}/${this.listSongIdQinZhi}/${index}`);
    },
    toPlayDetailGuangBoJu(id, index) {
      this.$router.push(
        `/playDetail/${id}/${this.listSongIdGuangBoJu}/${index}`
      );
    },
    toPlayDetailQinGan(id, index) {
      this.$router.push(`/playDetail/${id}/${this.listSongIdQinGan}/${index}`);
    },
    toPlayDetailWenHua(id, index) {
      this.$router.push(`/playDetail/${id}/${this.listSongIdWenHua}/${index}`);
    },
    toPlayDetailShengHuo(id, index) {
      this.$router.push(
        `/playDetail/${id}/${this.listSongIdShengHuo}/${index}`
      );
    },
    toPlayDetailZiXun(id, index) {
      this.$router.push(`/playDetail/${id}/${this.listSongIdZiXun}/${index}`);
    },
    toPlayDetailTiYu(id, index) {
      this.$router.push(`/playDetail/${id}/${this.listSongIdTiYu}/${index}`);
    },
    toPlayDetailYuLe(id, index) {
      this.$router.push(`/playDetail/${id}/${this.listSongIdYuLe}/${index}`);
    },
    toPlayDetailWaiYu(id, index) {
      this.$router.push(`/playDetail/${id}/${this.listSongIdWaiYu}/${index}`);
    },
    async getSongId() {
      const getSongIdResult = await http("get", "/album/categorys.do", {
        params: {
          out: "json",
          miniAppId: 4,
        },
      });
      this.listSongId = getSongIdResult.data.categorys;
      console.log(this.listSongId, "输出this.listSongId");
      this.listSongIdQinZhi = getSongIdResult.data.categorys[1].id;
      // console.log(this.listSongIdQinZhi, "亲子");
      this.listSongIdGuangBoJu = getSongIdResult.data.categorys[3].id;
      this.listSongIdQinGan = getSongIdResult.data.categorys[5].id;
      this.listSongIdWenHua = getSongIdResult.data.categorys[6].id;
      this.listSongIdShengHuo = getSongIdResult.data.categorys[7].id;
      this.listSongIdZiXun = getSongIdResult.data.categorys[8].id;
      this.listSongIdTiYu = getSongIdResult.data.categorys[10].id;
      this.listSongIdYuLe = getSongIdResult.data.categorys[11].id;
      this.listSongIdWaiYu = getSongIdResult.data.categorys[13].id;
    },
  },
  computed: {
    ...mapState(["broacastlist"]),
    ...mapGetters([
      "setChildren",
      "setCuture",
      "setLife",
      "setNews",
      "setPlay",
      "setEnt",
      "setenglishList",
      "changeAlbum",
    ]),
    setLover() {
      return this.lovelist.splice(0, 3);
    },
  },

  components: {
    InputBox,
    swiper,
    BetterScroll,
    ScrollBar,
    HeaderTitle,
  },
};
</script>

<style lang="less" scoped>
/deep/.van-nav-bar {
  margin-top: 10px;

  /deep/.van-nav-bar__left {
    /deep/ .van-nav-bar__text {
      color: #000;
      font-weight: 600;
      font-size: 20px;
    }
  }
}

.content {
  .content_area {
    display: flex;
    width: 100%;
    height: 100px;
    margin-top: 20px;

    & > div {
      width: 100px;
      height: 100px;
    }

    & > div:nth-child(1) {
      flex: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 90%;
        height: 100%;
        border-radius: 6px;
      }
    }

    & > div:nth-child(2) {
      flex: 3;
      padding: 5px;
      p {
        margin-top: 10px;
        line-height: 20px;
        overflow: hidden;
        width: 150px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }

    & > div:nth-child(3) {
      flex: 1;
      padding-left: 10px;
      padding-top: 30px;
      padding-right: 10px;
      button {
        width: 60px;
        height: 30px;
        background-color: rgb(206, 225, 255);
        border: none;
        border-radius: 15px;
        color: rgb(74, 144, 226);
      }
    }
  }
}

.child-area {
  display: flex;
  justify-content: space-evenly;
  .child-item {
    display: flex;
    flex-direction: column;
    & > div:nth-child(1) {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100px;
        height: 120px;
        padding: 5px;
        border-radius: 10px;
      }
    }
    & > div:nth-child(2) {
      padding: 2px;
      font-size: 14px;
      font-weight: 520;
      width: 110px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    & > div:nth-child(3) {
      padding: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 110px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #323233;
      font-size: 10px;
      text-indent: 1px;
    }
  }
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

.active {
  justify-content: flex-start !important;
}
#home {
  background-color: rgb(228, 228, 228);
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  // padding: 5px;
  & > div:nth-child(1) {
    font-size: 18px;
    font-weight: 600;
  }

  & > div:nth-child(2) {
    color: #1e90ff;
    padding-top: 6px;
  }
}
</style>
