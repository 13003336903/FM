<template>
  <div class="whole">
    <van-nav-bar title="登录" left-arrow @click-left="clickLeft" />
    <div class="marke">
      <span
        @click.prevent="flag = true"
        :class="flag == true ? 'markeLeft' : ''"
        >账号登录</span
      >
      <span
        class="markeRight"
        @click.prevent="flag = false"
        :class="flag == false ? 'markeLeft' : ''"
        >快捷登录</span
      >
    </div>
    <div>
      <account v-if="flag"></account>
      <verification v-else></verification>
    </div>
  </div>
</template>
<script>
import verification from "@/components/componentsLog/verification.vue";
import account from "@/components/componentsLog/account.vue";

export default {
  components: {
    account,
    verification,
  },
  data() {
    return {
      flag: true,
      changeRed: 0,
    };
  },
  methods: {
    getback() {
      this.$router.push({ path: "Mine" });
    },
    clickLeft() {
      this.$router.go(-1);
    },
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
};
</script>
<style lang="less">
.form {
  margin-top: 70px;
}
.marke {
  width: 400px;
  height: 30px;
  position: relative;
  top: 40px;
  left: 60px;
  font-size: 18px;
  font-weight: 400;
  margin-left: 10px;
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
.markeLeft {
  color: #588dd1;
  font-size: 22px;
  border-bottom: 2px solid #588dd1;
  margin-left: -8px;
}
.markeRight {
  position: relative;
  left: 100px;
}
.markeLeft1 {
  position: relative;
}
.markeRight1 {
  color: #588dd1;
  font-size: 22px;
  border-bottom: 2px solid #588dd1;
  padding: 0 20px;
  margin-left: -18px;
}

.back {
  font-size: 15px;
  width: 50px;
  height: 25px;
  margin: 5px;
  margin-top: 20px;
  .one {
    font-size: 20px;
    height: 100%;
    position: relative;
    top: 2px;
  }
  .two {
    font-weight: 400;
    margin-left: 3px;
  }
  .checked-classs {
    color: red;
  }
}
</style>
