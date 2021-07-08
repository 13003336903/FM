<template>
  <div>
    <van-card>
      <template #tags>
        <!-- 主体内容 -->
        <div class="content">
          <div class="content_area" v-for="(item,index) in dataList" :key="item.id" @click="toPlayDetail(item.id,index)">
            <div>
              <img :src="item.cover" alt="" />
            </div>
            <div>
              <h3>{{ item.name }}</h3>
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
import http from "../../../utils/http";
export default {
  name: "",
  data() {
    return {
      dataList: [],
      // lovelist: [],
    };
  },
  created() {
    this.gethttp();
    // this.getLover();
  },
  methods: {
    async gethttp() {
      const datas = await http("get", "/album/recommends!albums.do", {
        params: {
          out: "json",
          miniAppId: 4,
        },
      });
      this.dataList = datas.data.albums;
    },

    // async getLover() {
    //   const datas = await http("get", "/album/album!albums.do", {
    //     params: {
    //       pageNo: 1,
    //       categoryId: 5074,
    //       miniAppId: 4,
    //     },
    //   });
    //   this.lovelist = datas.data.albums;
    // },
    //编程式导航
    toPlayDetail(id,index){
      this.$router.push(`/detail/${id}/${this.categoryId}/${index}`);
    },
  },
  // computed: {
  //   totalList() {
  //     return [...this.lovelist, ...this.dataList];
  //   },
  // },
  components: {},
};
</script>

<style lang="less" scoped>
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
  }
}
</style>
