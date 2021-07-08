<template>
  <div>
    <div class="header">
      <div class="first" ref="title">
        <slot></slot>
      </div>
      <div @click="titleClick">查看全部</div>
    </div>
  </div>
</template>

<script>
import http from "../../utils/http";
export default {
  name: "",
  data() {
    return {
      iconList: [],
    };
  },
  components: {},
  created() {},
  beforeUpdate() {},
  mounted() {
    this.getHttpScroll();
  },
  beforeMount() {},
  updated() {},

  methods: {
    titleClick() {
      let name = this.$refs.title.innerHTML.trim();
      const item = this.iconList.find((item) => {
        if (item.name == name) {
          return true;
        }
      });
      this.$router.push(`/categroies/${item.id}`)
    },

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
    },
  },
};
</script>

<style lang="less" scoped>
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
