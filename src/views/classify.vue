<template>
  <div class="classify-wrapper">
    <router-link class="search-button" tag="div" to="/search">
      <van-icon name="search" class="icon" />
      <div>苹果特价3元一斤，10元3斤</div>
    </router-link>
  <one-tab></one-tab>
  <template v-if="showContent">
  <side-bar></side-bar>
  <goods-list></goods-list>
  </template>
  <van-loading  size="2rem" vertical v-else />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import oneTab from '../components/oneTab.vue';
import sideBar from "../components/sideBar.vue";
import goodsList from "../components/GoodsList.vue";

export default {
  computed: {
    ...mapState({
      showContent: (state) => state.showContent,
      sideList: (state) => state.sideList,
    }),
  },
  components: {
    oneTab,
    sideBar,
    goodsList,
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
  },
  watch: {
    showContent() {
      if(this.showContent) {
        this.resetGoodsList();
        this.getGoodsList({ type: this.sideList[0], page: 1, sortType: 'all' });
      }
    },
  },
};
</script>

<style scoped>
.classify-wrapper {
  width: 375px;
}
.search-button {
  width: 355px;
  height: 33px;
  line-height: 33px;
  background-color: #eee;
  margin: 11px auto 0;
  border-radius: 10px;
  font-size: 14px;
  text-align: center;
  color: #a1a1a1;
}
.search-button div,
.search-button .icon {
  display: inline-block;
  vertical-align: center;
}
</style>