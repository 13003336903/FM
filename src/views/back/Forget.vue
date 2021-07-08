<template>
  <div class="parent">
    <van-nav-bar title="注册" left-arrow @click-left="clickLeft" />
    <div class="son">
      <input type="text" placeholder="请设置用户名 " maxlength="3" minlength="6" v-model="username" />
      <div class="pic">
        <span>请上传头像</span>
        <van-uploader v-model="fileList" multiple :max-count="1" />
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
        maxlength="20"
        minlength="6"
        v-model="password"
      />

      <div class="click1">
        <button @click="countDown">
          <span :disabled="btnState1==false" :class="{btnBg1:btnState1}">{{content}}</span>
        </button>
      </div>
      <button class="shiyan" :disabled="btnState==false" :class="{btnBg:btnState}">
        <span @click="submit">注册</span>
      </button>
      <van-checkbox class="last" v-model="checked" shape="square" icon-size="14px">
        已阅读并同意
        <span class="span" @click="getAgreement">《用户服务协议》</span>
        <span class="span" @click="getPolicy">《隐私政策》</span>
      </van-checkbox>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      password: "", //密码
      checked: true, //协议单选框
      sms: "", //验证码
      username: "", //用户名
      content: "发送验证码",
      fileList: [], //存放头像图片
      phone: {
        val: "", //电话号
      },
    };
  },
  mounted() {
    console.log(this.fileList)
  },
    beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit("changeroute");
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("changleave");
    next();
  },
  methods: {
    getAgreement() {},
    getPolicy() {},
    getback() {
      this.$router.go(-1);
    },
    clickLeft(){
      this.$router.go(-1)
    },
    countDown() {
      //验证码 倒计时
      if (!this.canClick) return;
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
    submit() {
      if (this.username.trim() == "" && this.password.trim() == "") {
        return;
      }
      if (
        !this.username.match(
          /^(\w{1,})+@([a-zA-Z]{2,3})+((\.[a-zA-Z]{2,3}))$/
        ) &&
        !this.password.match(/^\w{6,}$/)
      ) {
        return;
      }
      let users = localStorage.users;
      if (users) {
        users = JSON.parse(users);
      } else {
        users = [];
      }
      users.push({
        username: this.username,
        password: this.password,
      });
      localStorage.users = JSON.stringify(users);

      this.$notify({
        type: "success",
        message: "恭喜您 注册成功！",
      });
      setTimeout(() => {
        this.$router.push({
          path: "/log",
        });
      }, 2000);
    },
  },
  computed: {
    btnState() {
      //按钮高亮条件
      //当用户名和密码框都不为空时btnState==true,利用这个计算属性来动态控制按钮的禁用和颜色
      return this.phone.val !== "" && this.password !== "" && this.sms !== "";
    },
    btnState1() {
      //验证码高亮条件
      //当用户名和密码框都不为空时btnState==true,利用这个计算属性来动态控制按钮的禁用和颜色
      return this.phone.val !== "";
    },
  },
};
</script>
<style lang="less">
.parent {
  .son {
    margin-top: -50px;
    .pic {
      // background: seagreen;
      height: 100px;
      margin-left: 48px;
      span {
        display: block;
        margin-bottom: 3px;
        color: #3999ae;
      }
    }
  }
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
  }
  .click1 {
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
.van-hairline--bottom {
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(18, 150, 219);
}
.van-nav-bar__title {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
}
.van-icon-arrow-left {
  color: #fff !important;
  font-size: 20px;
  font-weight: 600;
}
</style>