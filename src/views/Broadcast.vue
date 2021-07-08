<!--广播-->
<template>
  <div class="broadcast_area">
    <div
      class="broadcast_item"
      v-for="item in dataList"
      :key="item.id"
      @click="skiphandle(item.id)"
    >
      <div>
        <img :src="item.logo" alt="" />
      </div>
      <div>
        {{ item.label }}
      </div>
      <div>
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../utils/http";
export default {
  name: "Broadcast",
  data() {
    return {
      dataList: [],
    };
  },
  created() {
    this.getHtttps();
  },
  methods: {
    async getHtttps() {
      const datas = await http("get", "/radio/channels.do", {
        params: {
          out: "json",
          miniAppId: 4,
        },
      });
      this.dataList = datas.data.channels;
    },

    skiphandle(id) {
      this.$router.push(`/player/${id}`);
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
.broadcast_area {
  display: flex;
  flex-wrap: wrap;//规定灵活的项目在必要的时候拆行或拆列
  width: 100%;
  margin-top: 20px;
  .broadcast_item {
    width: 44%;
    height: 220px;
    display: flex;
    flex-direction: column;//灵活的项目将垂直显示，正如一个列一样。

    margin-left: 4%;
    div {
      margin-top: 8px;
    }
    //broadcast_item下面第一个div孩子
    & > div:nth-child(1) {
      width: 100%;
      display: flex;
      //项目位于容器中央
      justify-content: center;
      //所有行，且只有在多行弹性盒子容器中才生效
      align-content: center;
      img {
        width: 100%;
        height: 150px;
        border-radius: 10px;
        box-shadow: 0 0 10px 2px #ddd;
      }
    }
    
    & > div:nth-child(2) {
      width: 100%;
      text-align: center;
      color: #ccc;
    }
    & > div:nth-child(3) {
      width: 100%;
      text-align: center;
      font-weight: 520;
      font-size: 15px;
    }
  }
}
</style>
