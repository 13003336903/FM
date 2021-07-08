<!--专辑-->
<template>
  <div id="album">
    <!-- 头部 -->
    <van-card>
      <template #tags>
        <input-box />
        <swiper />
      </template>
    </van-card>
    <!-- 热门分类 -->
    <van-card>
      <template #tags>
        <header-title> 热门分类 </header-title>
        <van-cell-group>
          <van-cell
            v-for="item in hotCategoryItem"
            :key="item.id"
            :title="item.name"
            :icon="item.icon"
            :to="`/categroies/${item.id}`"
          />
        </van-cell-group>
      </template>
    </van-card>

    <!-- 亲子 -->
    <van-card>
      <template #tags>
        <header-title> 亲子 </header-title>
        <div class="broad-cast">
          <div class="broad-item" v-for="(item, index) in setChildren"
            :key="item.id"
            @click="toPlayDetailQinZi(item.id, index)">
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

    <!-- 广播剧 -->
    <van-card>
      <template #tags>
        <header-title> 广播剧 </header-title>
        <div class="broad-cast">
          <div
            class="broad-item"
            v-for="(item, index) in setBroacastList"
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
  </div>
</template>

<script>
import swiper from "@/components/Swiper.vue";
import InputBox from "@/components/InputBox.vue";
import HeaderTitle from "@/components/HeaderTitle.vue";
import http from "../../utils/http";
import { mapGetters } from "vuex";
export default {
  name: "Album",
  data() {
    return {
      hotCategories: [],
      broacastlist:[],
      categoryId: this.$route.params.id,
    };
  },
  created() {
    this.getHttpScroll();
    this.$store.dispatch("getchildHttp");
    this.$store.dispatch("getbrodcast");
    this.getSongId();
    listSongId: [];
  },
  computed: {
    hotCategoryItem() {
      return this.hotCategories.splice(0, 4);
    },
    ...mapGetters(["setChildren"]),
    ...mapGetters(["setBroacastList"]),
  },
  methods: {
    //获取热门分类种类
    async getHttpScroll(context) {
      const data = await http("get", "/album/categorys.do", {
        params: {
          out: "json",
          miniAppId: 4,
        },
      });
      const {
        data: { categorys: list },
      } = data;
      this.hotCategories = list;
    },
    //编程式导航
    toPlayDetailQinZi(id, index) {
      this.$router.push(`/playDetail/${id}/${this.listSongIdQinZhi}/${index}`);
    },
    toPlayDetailGuangBoJu(id, index) {
      this.$router.push(
        `/playDetail/${id}/${this.listSongIdGuangBoJu}/${index}`
      );
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
      console.log(this.listSongIdGuangBoJu, "广播剧");
    },
  },
  components: {
    swiper,
    InputBox,
    HeaderTitle,
  },
};
</script>

<style lang="less" scoped>
#album {
  background-color: rgb(228, 228, 228);
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
</style>
