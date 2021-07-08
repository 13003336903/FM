<template>
  <van-form class="form">
    <input type="text" placeholder="请输入手机号" />
    <input type="password" placeholder="请输入验证码" />
    <div class="click">
      <button @click="countDown">{{content}}</button>
    </div>
    <button class="shiyan1">
      <span>登录</span>
    </button>
    <div class="footer">
      已阅读并同意
      <span class="span" @click="getAgreement">《用户服务协议》</span>
      <span class="span" @click="getPolicy">《隐私政策》</span>
    </div>
  </van-form>
</template>
<script>
export default {
  name: "account",
  data() {
    return {
      username: "",
      password: "",
      content: "发送验证码",
      totalTime: 40,
      canClick: true,
    };
  },
  methods: {
    getaccount() {
      this.$router.push({ path: "Forget" });
    },
    getpassword() {
      this.$router.push({ path: "Registered" });
    },
    getAgreement() {},
    getPolicy() {},
    validator(val) {
      return /^1[34578][01256]\d{8}$/.test(val);
    },
    countDown() {
      if (!this.canClick) return; //改动的是这两行代码
      this.canClick = false;
      this.content = this.totalTime + "s后重新发送";
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + "s后重新发送";
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.content = "重新发送";
          this.totalTime = 40;
          this.canClick = true; //这里重新开启
        }
      }, 1000);
    },
  },
};
</script>
<style lang="less">
input {
  width: 75%;
  height: 35px;
  border-radius: 17px;
  border: none;
  background: #f3f7f9;
  margin: 10px auto;
  margin-left: 38px;
  caret-color: #429be2;
  padding-left: 20px;
}
input::-webkit-input-placeholder {
  color: #d6d6d6;
}
.click {
  width: 100px;
  height: 20px;
  position: relative;
  top: -37px;
  left: 255px;
  color: #d6d6d6;
  button {
    border: none;
    background: none;
  }
}
.shiyan1 {
  width: 80%;
  height: 35px;
  border-radius: 17px;
  border: none;
  color: whitesmoke;
  background: #a2ceff;
  margin-top: 20px;
  margin-left: 38px;
  span {
    font-size: 15px;
  }
}
.footer {
  margin-top: 216px;
  margin-left: 75px;
  .span {
    color: #3999ae;
  }
}
.underLeft {
  position: relative;
  top: -20px;
  left: 30px;
}
.underRight {
  position: relative;
  top: -20px;
  left: 240px;
}
</style>