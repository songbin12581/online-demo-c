<template>
  <div class="sideBar-wrapper" ref="side">
    <div
      v-for="(item, i) in sideList"
      :key="item"
      :class="{ active: index === i }"
      @touchend="scrollTo(i, $event)"
      @touchstart="move = false"
      @touchmove="move = true"
    >
      {{ i == 0 ? "全部" : item }}
    </div>
  </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from "vuex";
import tools from "../util/tool.js";

export default {
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(["getGoodsList"]),
    scrollTo(i, e) {
      if (this.move) {
        return
      }
      this.index = i;
      const { side } = this.$refs;
      const sonTop = e.target.getBoundingClientRect().top;
      const sonHeight = e.target.offsetHeight;
      const pTop = side.getBoundingClientRect().top;
      const pHeight = side.offsetHeight;
      tools.moveTo(side.scrollTop,sonTop + sonHeight / 2 - pTop - pHeight / 2,side,"scrollTop");
      this.resetGoodsList();
      this.getGoodsList({ type: this.sideList[i], page: 1, sortType: "all" });
    },
  },
  mounted() {
    // this.resetGoodsList();
    // this.getGoodsList({ type: this.sideList[0], page: 1, sortType: "all" });
  },
  computed: {
    ...mapState({
      sideList: (state) => state.sideList,
    }),
  },
};
</script> 

<style scoped>
.sideBar-wrapper {
  position: fixed;
  left: 0px;
  width: 79px;
  top: 135px;
  bottom: 50px;
  overflow: auto;
  background-color: #f8f8f8;
}
.sideBar-wrapper div {
  width: 79px;
  text-align: center;
  height: 40px;
  font-size: 12px;
  line-height: 40px;
  position: relative;
}
.sideBar-wrapper div.active {
  font-weight: bold;
  color: #ff1a90;
}
.sideBar-wrapper div.active::before {
  content: "";
  position: absolute;
  width: 6px;
  height: 18px;
  background-color: #ff1a90;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
}
.sideBar-wrapper::-webkit-scrollbar {
  width: 0px;
  background: none;
}
</style>