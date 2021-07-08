<template>
  <div>
    <van-list>
      <van-cell v-for="item in $store.getters.setmusic" :key="item.albumId">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
         <div class="txt_arae">
        <div class="title_area">
          <div>
              {{item.name}}
          </div>
          <div>  
              {{item.createTime | dateFormat}}
          </div>
        </div>
        <div class="bt_area">
          <van-icon name="ellipsis" />
        </div>
      </div>
        </template>
      </van-cell>
      
    </van-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      list: [],
    };
  },
  computed: {},
  mounted() {
  },
  beforeUpdate() {
    this.list = this.$store.getters.setmusic;
  },
  components: {},
};
</script>

<style lang="less" scoped>
.txt_arae {
  width: 100%;
  display: flex;
  .title_area {
    // float: left;
    width: 80%;

    & > div:nth-child(1) {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 10px;
    }
     & > div:nth-child(2) {
     font-size: 12px;
     color:#aaa;
     font-weight: 600;
    }
  }
  .bt_area {
    // float: right;
    width: 20%;
    position: relative;
    /deep/.van-icon-ellipsis {
      font-size: 34px;
      color: #bbb;
      position: absolute;
      top:20px;
      left: 30px;
    }
  }
}
</style>
