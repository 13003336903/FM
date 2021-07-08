<template>
  <van-form class="form">
    <input
      type="text"
      class="phone input-style"
      :class="{ 'err-input': phone.err }"
      v-model="phone.val"
      placeholder="请输入用户名"
      maxlength="11"
    />
    <input
      type="password"
      v-model="phone.password"
      placeholder="请输入密码"
      minlength="6"
      maxlength="20"
    />
    <button class="shiyan">
      <span @click="login">登录</span>
    </button>
    <div class="other">
      <span class="underLeft" @click="getaccount">注册账号</span>
      <span class="underRight" @click="getpassword">忘记密码?</span>
    </div>
    <div class="foot">
      已阅读并同意
      <span class="span" @click="getAgreement">《用户服务协议》</span>
      <span class="span" @click="getPolicy">《隐私政策》</span>
    </div>
  </van-form>
</template>
<script>
import { setCookie, getCookie } from "../../assets/js/cookie.js";
import throttle from "../../plugin/throttle";
export default {
  mounted() {
    /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    if (getCookie("username")) {
      this.$router.push("/home");
    }
  },
  name: "account",
  data() {
    return {
      hintShow: false, // 提示语显示
      hint: "手机号码错误", // 提示语
      telShow: false, // 提示语显示
      tel: "手机号码错误", // 提示语
      /* val 为值,err为错误显示, test检验信息*/
      phone: {
        val: "",
        err: false,
        pass: false,
        password: "",
      },
      user: [],
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("users"));
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
    // 手机号码验证
    submit() {
      if (this.phone.val.trim() == "") {
        return;
      }
      if (!this.phone.val.match(/^[1][3,4,5,6,7,8][0-9]{9}$/)) {
        return;
      }

      if (this.phone.password.trim() == "") {
        return;
      }

      if (!this.phone.password.match(/^\w{6,}$/)) {
        return;
      }

      let userInfo = localStorage.userInfo;
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
        let rel = false;
        userInfo.map((item) => {
          if (
            this.phone.val == item.phone.val &&
            this.phone.password == item.phone.password
          ) {
            rel = true;
            return;
          }
        });

        if (rel) {
          sessionStorage.phone.val = this.phone.val;
          this.$router.push({
            path: "/message",
          });
        } else {
          this.$notify({
            message: "账户或密码输入有误 请确认后再试！",
          });
        }
      }
    },

    login() {
      const status = this.user.some((item, index) => {
        return (
          item.username == this.phone.val &&
          item.password == this.phone.password
        );
      });
      if (status) {
          
       this.$notify({ type: "success", message: "登录成功" })
       this.$router.push("/mine")
       
      } else {
       
       this.$notify({ type: "danger", message: "登录失败" })
 
      }
    },

    // computed: {
    //   btnState() {
    //     //当用户名和密码框都不为空时btnState==true,利用这个计算属性来动态控制按钮的禁用和颜色
    //     return this.phone.val !== "" && this.password !== "";
    //   },
    // },
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

.shiyan {
  width: 80%;
  height: 35px;
  border-radius: 17px;
  border: none;
  color: whitesmoke;
  background: #a2ceff;
  margin-top: 40px;
  margin-left: 38px;
  span {
    font-size: 15px;
  }
}
.other {
  color: #618bb9;
  margin-top: 50px;
}
.button {
  position: relative;
  top: 8px;
}
.btnBg {
  background: #4690df;
  box-shadow: rgba(44, 44, 44, 0.2) 10px 10px 30px 5px;
}
.foot {
  margin-top: 150px;
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
