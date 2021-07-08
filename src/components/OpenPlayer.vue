<template>
  <div class="players" v-show="$store.state.flag">
    <img :src="$store.getters.getnewData.logo" alt="" class="blur_area" />
    <div class="content_area" @click="handleClick($store.getters.getnewData.channelId)">
      <audio controls id="maudio" ref="maudio" preload="auto" style="display:none">
        <source :src="$store.getters.getnewData.uri" ref="msource" type="audio/wav" />
      </audio>
      <div class="img_area"><img :src="$store.getters.getnewData.logo" alt="" /></div>
      <div class="title_area">{{  $store.getters.getnewData.name}}</div>
  
      <div class="icon_area">
        <img
          :src="
            flag
              ? require('../images/main-icons/end.png')
              : require('../images/main-icons/start.png')
          "
          @click.stop="changPlays"
          alt=""
        />
        <img src="../images/main-icons/menu.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "",
  created() {
    this.flag = this.$store.state.playing;
   
  },
  mounted() {
  this.$event.$on("addlistenState",()=>{
     this.changPlays()
  })
  },
  data() {
    return {
      id: "",
      datas: {},
      flag: true,
      url: "",

    };
  },

  methods: {
    changPlays() {
      if (this.flag) {
        this.$refs.maudio.pause();
        this.flag = false;
      } else {
        this.$refs.maudio.play();
        this.flag = true;
      }
      this.$store.commit("changePlay", this.flag);
    },
    handleClick(id){
     this.$router.push(`/programs/${id}`)
    }
    
  },
  computed: {
    changeurl(){
      return this.$store.getters.getnewData.uri
    },
    
  },
  watch: {
  
 
  },
  components: {},
};
</script>

<style scoped lang="less">
.players {
  position: fixed;
  bottom: 50px;
  height: 50px;
  width: 100%;
  overflow: hidden;
  border: 1px solid #ccc;
  .blur_area {
    width: 100%;
    height: 50px;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: blur(10px);
    position: absolute;
    z-index: 0;
  }
  .content_area {
    position: absolute;
    height: 50px;
    z-index: 100;
    display: flex;
    align-items: center;
    width: 100%;
    .img_area {
      width: 10%;
      img {
        width: 37px;
        height: 37px;
        border-radius: 50%;
        margin-left: 10px;
      }
    }
    .title_area {
      width: 60%;
      color: #fff;
      height: 50px;
      line-height: 50px;
      padding-left: 30px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .icon_area {
      width: 30%;
      display: flex;
      align-items: center;
      img {
        padding: 5px;
      }
      & > img:nth-child(1) {
        width: 30px;
        height: 30px;
        margin-left: 30px;
      }
      & > img:nth-child(2) {
        width: 18px;
        height: 18px;
        margin-left: 10px;
      }
    }
  }
}
</style>
