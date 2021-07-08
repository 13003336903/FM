<template>
  <div>
    <div class="input_box">
      <span class="iconfont icon-soushuo"></span>
      <input
        type="text"
        placeholder="今天想听些什么呢？"
        name="params"
        v-model="keyword"
      />
      <button type="submit" @click="submitDatas">搜索</button>
    </div>
  </div>
</template>

<script>
import http from "../../../utils/http";
export default {
  name: "",
  data() {
    return {
      keyword: "",
      keywordList: [],
    };
  },

  mounted() {
    this.$event.$on("submitnewkey", (datas) => {
      this.keywordList = datas;
    });
  },
  methods: {
    submitDatas() {
      this.$store.dispatch("getkeyhttp", this.keyword);
      this.$store.dispatch("getalbumhttp", this.keyword);
      this.$store.dispatch("getprogramhttp", this.keyword);
      this.$event.$emit("transmit",this.keyword)
      this.transmitDatas();
    
    },

    transmitDatas() {
      if (!this.keywordList.includes(this.keyword)) {
        this.keywordList.push(this.keyword);
      }
      this.$event.$emit("submitkeyword", this.keywordList);
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
  border: none;
  span {
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    font-size: 20px;
    color: #aaa;
  }
  input {
    width: 70%;
    height: 30px;
    padding-left: 35px;
    border-radius: 20px;
    outline: none;
    background-color: rgb(228, 228, 228);
    border: none;
  }
  button {
    position: absolute;
    left: 300px;
    width: 50px;
    height: 30px;
    border-radius: 6px;
    background-color: #ddd;
    outline: none;
    border: none;
    color: #000;
  }
}
</style>
