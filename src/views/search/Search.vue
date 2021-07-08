<template>
  <div>
    <search-bar />
    <!-- 搜索历史记录 -->
    <search-history />

    <!-- 底部tabbar -->

    <search-tab ref="childrefs" />

    <router-view></router-view>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import SearchHistory from "./SearchHistory.vue";
import searchTab from "./SearchTab.vue";
export default {
  name: "",
  data() {
    return {
      active: 0,
    };
  },

  mounted() {},
     beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit("changeroute");
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("changleave");
    next();
  },
  methods: {},
  components: {
    SearchBar,
    SearchHistory,
    searchTab,
  },
};
</script>

<style></style>
