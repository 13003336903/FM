<template>
  <div>
    <van-nav-bar left-text="搜索历史" right-text="全部清除"   @click-right="onClickRight"/>
<van-cell-group>
  <van-cell v-for="(item,index) in keyList" :key="index" :value="item" :border="false"/>
</van-cell-group>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
        keyList:[]
    };
  },
  components: {},
  mounted() {
      this.$event.$on("submitkeyword",(keyList)=>{    
        this.keyList=keyList
      })

  },
  methods: {
      onClickRight(){
     this.keyList=[]
      this.$event.$emit("submitnewkey",this.keyList)
      }
  },
};
</script>

<style lang="less" scoped>
.van-nav-bar {
    margin-top: 10px;
  /deep/.van-nav-bar__left {
    /deep/.van-nav-bar__text {
      color: #ddd;
    }
  }
  /deep/.van-nav-bar__right{
       /deep/.van-nav-bar__text {
      color: red;
    }
  }
}

</style>
