<template>
  <div>
    <van-cell v-for="item in $store.getters.setAlbum" :key="item.id">
      <template #title>
        <div class="album_area">
          <div class="img_area">
            <img :src="item.cover" alt="" />
          </div>
          <div class="txt_area">
            <div class="title_top">
              {{ item.name }}
            </div>
            <div class="title_bottom">
              {{ item.impresario }}
            </div>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
};
</script>

<style lang="less" scoped>
.album_area {
  display: flex;
  height: 120px;
  .img_area {
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 90px;
      height: 100px;
      border-radius: 10px;
    }
  }
  .txt_area {
    flex: 9;
    padding-left: 20px;
    .title_top {
      color: black;
      font-size: 14px;
      margin-top: 25px;
    }
    .title_bottom {
      margin-top: 30px;
      color: #aaa;
      font-size: 13px;
    }
  }
}
</style>
