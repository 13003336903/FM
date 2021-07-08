<template>
  <div class="content">
    <div class="register" @click="getLog">
      <div class="part1">
        <img src="../images/icons/touxiang.png" width="64px" height="64px" />
      </div>
      <div class="part2">登录/注册</div>
    </div>
    <div class="module">
      <div class="part3" @click="getOrder">
        <img src="../images/icons/ding.png" />
        <span>订阅</span>
      </div>
      <div class="part3" @click="getCollection">
        <img src="../images/icons/shou.png" />
        <span>收藏</span>
      </div>
      <div class="part3" @click="getDownload">
        <img src="../images/icons/xiazai.png" />
        <span>下载</span>
      </div>
      <div class="part3" @click="getHistory">
        <img src="../images/icons/shili.png" />
        <span>历史</span>
      </div>
    </div>
    <div>
      <van-cell is-link title="定时关闭" @click="show = true" />
      <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        close-on-click-action
        @cancel="onCancel"
      />
      <van-cell is-link>意见反馈</van-cell>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      show: false,
      actions: [
        { name: "不开启" },
        { name: "播放完当前节目" },
        { name: "10分钟",},
        { name: "20分钟" },
        { name: "30分钟" },
        { name: "60分钟" },
        { name: "90分钟" },
      ],
    };
  },
  methods: {
    getCollection() {
     this.$router.push("/collect");
    },
    getDownload() {
      this.$router.push({ path: "Download" });
    },
    getLog() {
      this.$router.push({ path: "Log" });
    },
    getOrder() {
      this.$router.push({ path: "Order" });
    },
    
     onCancel() {
      Toast('取消');
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  overflow: auto;
  margin-top: 40px;
  .register {
    // position: relative;
    margin-top: 10px;
    width: 95%;
    height: 100px;
    margin: 5px auto;
    background-color: white;
    box-shadow: 3px 3px 3px 3px rgba(170, 170, 170, 0.1);
    border-radius: 5px;
    .part1 {
      float: left;
      margin-top: 18px;
      margin-left: 35px;
      img {
        margin-left: -20px;
      }
    }
    .part2 {
      float: left;
      height: 64px;
      line-height: 64px;
      margin-top: 18px;
      margin-left: 20px;
      transition: transform 500ms ease;
      font-size: 15px;
    }
  }
  .part3 {
    width: 20%;
    height: 80%;
    // background: salmon;
    display: inline-block;
    margin-left: 15px;
    margin-top: 8px;
    span {
      position: relative;
      bottom: 15px;
      left: 20px;
    }
  }
  .marked {
    width: 80px;
    height: 50px;
    display: block;
    font-size: 30px;
    font-weight: 100;
    margin-left: 10px;
  }
  .van-cell {
    .van-icon {
      img {
        width: 35px;
        height: 35px;
        margin-top: 5px;
      }
    }
  }
  .module {
    width: 95%;
    height: 70px;
    background-color: white;
    box-shadow: 3px 3px 3px 3px rgba(170, 170, 170, 0.1);
    border-radius: 5px;
    margin: 5px auto;
    .part3:first-child img {
      width: 60px;
      height: 53px;
      position: relative;
      top: -4px;
      left: 3px;
    }
    .part3:nth-child(2) img {
      width: 60px;
      height: 52px;
      position: relative;
      top: -6px;
    }
    .part3:nth-child(3) img {
      width: 60px;
      height: 43px;
      position: relative;
      top: -6px;
      left: 3px;
    }
    .part3:nth-child(4) img {
      height: 41px;
      position: relative;
      top: -5px;
      left: -5px;
    }
  }
}
</style>