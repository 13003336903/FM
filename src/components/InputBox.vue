<!--页面头部的input框-->
<template>
  <div class="input_box">
    <span class="iconfont icon-soushuo"></span>
    <!--@focus是元素获取焦点时所触发的事件-->
    <input
      type="text"
      placeholder="在此搜索节目，最新最热为您推荐"
      @focus="inputfocus"
    />
  </div>
</template>

<script>
export default {
  name: "InputBox",
  data() {
    return {};
  },
  methods: {
    inputfocus() {
      this.$router.push("/search");
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
@import "//at.alicdn.com/t/font_2070812_gqkr63s5ynd.css";
.input_box {
  position: relative;
  margin-top: 20px;
  margin-left: 20px;
  span {
    display: block;
    position: absolute;
    top: 50%;
    //实现元素垂直居中效果
    transform: translateY(-50%);
    left: 10px;
    font-size: 20px;
    color: #aaa;
  }
  input {
    width: 85%;
    height: 30px;
    padding-left: 35px;
    border-radius: 20px;
    outline: none;
    background-color: rgb(228, 228, 228);
    border: none;
  }
}
</style>
