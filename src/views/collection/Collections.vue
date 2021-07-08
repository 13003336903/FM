<template>
  <div>
    <van-nav-bar title="我的收藏"  left-arrow   @click-left="onClickLeft"> </van-nav-bar>
    <van-card>
      <template #tags>
        <div class="show_area">
          <div class="show_area_item" v-for="item in newList" :key="item.categoryId">
            <div class="img_area">
              <img :src="item.cover" alt="" />
            </div>
            <div class="content_area">
              <div class="name"><span>名称:</span><span>{{item.name}}</span></div>
              <div class="time">
                <span>收藏时间：</span><span>{{time}}</span>
              </div>
            </div>
          </div>

        </div>
      </template>
    </van-card>
  </div>
</template>

<script>
import { parse } from "qs";
import initTime from "@/plugin/init-nowtime"
export default {
  name: "",
  data() {
    return {
      list: [],
      dataList: [],
      newList: [],
      time:initTime()
    };
  },
  created() {
    this.dataList = JSON.parse(sessionStorage.getItem("dataList"));
    this.list = JSON.parse(sessionStorage.getItem("list"));
    this.list.map((item) => {
      this.newList.push(this.dataList[item]);
    });
    //  let newdataList= JSON.parse(sessionStorage.getItem("dataList")).map(item=>{
    //      if(item.id==id){
    //            return Object.assign(item, { time:initTime() });
    //      }
        
    //    })
    //       sessionStorage.setItem("dataList", JSON.stringify( newdataList));
  },
  methods: {
    onClickLeft(){
      this.$router.push("/mine")
    }
  },
  beforeUpdate() {},
  updated() {},
  components: {},
};
</script>

<style lang="less" scoped>
/deep/.van-nav-bar {
  position: fixed;
  width: 100%;
  z-index: 1000;
  top: 0;
  background-color: rgba(18, 150, 219) !important;
  /deep/ .van-nav-bar__title {
    color: #fff !important;
    font-size: 18px;
    font-weight: 600;
  }

  /deep/.van-icon-arrow-left {
    color: #fff !important;
    font-size: 20px;
    font-weight: 600;
  }
}

.show_area {
  .show_area_item {
    display: flex;
  border-bottom: 1px dotted #bbb;
  margin-top: 10px;
  padding: 10px;
    .img_area {
      flex: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100px;
        height: 100px;
      }
    }
    .content_area {
      flex: 5;
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .name {
        padding: 10px;
        font-size: 15px;
      }
      .time {
        padding: 10px;
      }
    }
   
  }
 
}
</style>
