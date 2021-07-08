<template>
  <div>
    <div class="back" @click="getback">
      <span class="one">&lt;</span>
      <span class="two">我的</span>
    </div>
    <span class="marked">我的下载</span>
    <van-empty description="登陆可同步下载记录" />
  </div>
</template>
<script>
export default {
  methods: {
    getback() {
      this.$router.push({ path: "Mine" });
    },
  },
};
</script>
<style lang="less">
.marked {
  width: 100px;
  height: 50px;
  display: block;
  font-size: 20px;
  font-weight: 400;
  margin-left: 10px;
}
.back {
  width: 50px;
  height: 25px;
  margin: 5px;
  .one {
    font-size: 20px;
    height: 100%;
    position: relative;
    top: 2px;
  }
  .two {
    font-weight: 600;
    margin-left: 3px;
  }
}
</style>