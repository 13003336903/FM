<template>
  <div>
    <div class="top_title">
      <router-link to="/search/music" tag="div" active-class="active">音频</router-link>
      <router-link to="/search/albumitem" tag="div" active-class="active">专辑</router-link>
      <router-link to="/search/program" tag="div" active-class="active">节目</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      active: 0,
    };
  },
  components: {},
};
</script>

<style lang="less" scoped>
.top_title {
  width: 100%;
  display: flex;
  height: 40px;
  border-bottom: 1px solid rgb(24, 143, 206,.8);
  margin-top: 20px;
  div {
    height: 100%;
    line-height: 40px;
    text-align: center;
    flex: 1;
    font-size: 20px;
    font-weight: 600;
  }

  .active {
    background-color: rgb(24, 143, 206);
    color: #fff;
  }
}
</style>
