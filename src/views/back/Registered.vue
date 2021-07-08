<template>
  <div class="parent">
    <div class="back" @click="getback">
      <span class="one">&lt;</span>
      <span class="two">返回</span>
    </div>

    <input
      type="text"
      placeholder="请输入手机号"
      maxlength="11"
      v-model="phone.val"
      oninput="value=value.replace(/[^\d]/g,'')"
    />

    <input
      type="text"
      placeholder="请输入验证码"
      maxlength="6"
      v-model="sms"
      oninput="value=value.replace(/[^\d]/g,'')"
    />
    <input
      type="password"
      placeholder="请设置6-20位密码 "
      minlength="6"
      maxlength="20"
      v-model="password"
    />
    <div class="click">
      <button @click="countDown">
        <span :disabled="btnState1==false" :class="{btnBg1:btnState1}">{{content}}</span>
      </button>
    </div>

    <button class="shiyan" :disabled="btnState==false" :class="{btnBg:btnState}">
      <span>注册</span>
    </button>
    <van-checkbox class="last" v-model="checked" shape="square" icon-size="14px">
      已阅读并同意
      <span class="span" @click="getAgreement">《用户服务协议》</span>
      <span class="span" @click="getPolicy">《隐私政策》</span>
    </van-checkbox>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tel: "",
      password: "",
      checked: true,
      sms: "",
      content: "发送验证码",
      totalTime: 40,
      canClick: true, //添加canClick
      hintShow: false, // 提示语显示
      hint: "手机号码错误", // 提示语
      telShow: false, // 提示语显示
      tel: "手机号码错误", // 提示语
      /* val 为值,err为错误显示, test检验信息*/
      phone: {
        val: "",
        err: false,
        pass: false,
      },
    };
  },
  methods: {
    getAgreement() {},
    getPolicy() {},
    getback() {
      this.$router.go(-1);
    },
    countDown() {
      
      return this.phone.val !== "";
      if (!this.canClick) return;
      //改动的是这两行代码

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
  computed: {
    btnState() {
      //当用户名和密码框都不为空时btnState==true,利用这个计算属性来动态控制按钮的禁用和颜色
      return this.phone.val !== "" && this.password !== "" && this.sms !== "";
    },
    btnState1() {
      //当用户名和密码框都不为空时btnState==true,利用这个计算属性来动态控制按钮的禁用和颜色
      return this.phone.val !== "";
    },
  },
};
</script>
<style lang="less">
.parent {
  margin-top: 60px;
  .registered {
    margin-top: 50px;
  }
  .last {
    margin-top: 30px;
    margin-left: 30px;
  }
  .span {
    color: #3999ae;
  }
  .back {
    position: relative;
    top: -40px;
    font-size: 15px;
  }
  .click {
    width: 100px;
    height: 20px;
    position: relative;
    top: -92px;
    left: 250px;
    color: #d6d6d6;
    button {
      border: none;
      background: none;
    }
  }
  .btnBg {
    background: #4690df;
    box-shadow: rgba(44, 44, 44, 0.2) 10px 10px 30px 5px;
  }
  .btnBg1 {
    color: #4690df;
  }
}
</style>