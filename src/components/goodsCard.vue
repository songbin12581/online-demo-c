<template>
  <div class="card-wrapper van-hairline--bottom">
    <div class="card-img">
      <img :src="images[0]" ref="img" />
    </div>
    <div class="card-content">
      <div class="title" id="overflow-hidden">{{ title }}</div>
      <div class="desc" id="overflow-hidden">{{ desc }}</div>
      <div class="tagss">
        <div v-for="i in tags" :key="i">{{ i }}</div>
      </div>
      <div class="prices">￥{{ price }}</div>
      <div class="counter">
        <div class="just" @touchend="counter(id, -1)" v-if="num">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png">
        </div>
        <div class="num" v-if="num">{{ num }}</div>
        <div class="negative" @touchend="counter(id, 1)">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Animate from "../tools/animate";
export default {
  props:['images', 'tags', 'title', 'price', 'desc', 'id', 'num', 'nofly'],
  methods: {
    ...mapMutations(['storageChange']),
    counter(id, num) {
      this.storageChange({id, value: num});
      if(num === -1) {
        return;
      }
      if(this.nofly) {
        return;
      }
      //计算图片的位置
      const { top, left } = this.$refs.img.getBoundingClientRect();
      const { offsetWidth:imgWidth, offsetHeight:imgHeight } = this.$refs.img;
      const shopCar = document.getElementById('shop-car');
      //下方两个为购物车的位置和宽高值
      const { left:carX, top: carY } = shopCar.getBoundingClientRect();
      const { offsetWidth: carWidth, offsetHeight: carHeight } = shopCar;
      //计算距离，包括起始位置和终止位置等
      const endX = carX + carWidth / 2;
      const endY = carY + carHeight / 2;
      Animate({
        startX: left,
        startY: top,
        endX,
        endY,
        src: this.$refs.img.drc,
        width: imgWidth,
        height: imgHeight,
      });
    },
  },
};
</script>

<style scoped>
.card-wrapper {
  display: flex;
  width: 100%;
  height: 100px;
}
.card-img {
  width: 90px;
  margin-right:20px;
}
.card-img img {
  height: 90px;
  width: 90px;
}
.card-content {
  flex: 1;
  position: relative;
}
.card-content div {
  width: 170px;
}
.title {
  font-size: 9px;
  color: #1a1a1a;
  font-weight: bold;
  margin-top: 5px;
}
.desc {
  color: #aaa;
  font-size: 11px;
  margin-top: 5px;
}
.tagss {
  display: flex;
  margin-top: 4px;
}
.tagss div {
  font-size:10px;
  padding: 2px;
  color: #aaa;
  border-radius: 3px;
  margin-right: 5px;
  border: 1px solid #eee;
}
.prices {
  color: #ff1a90;
  font-size: 14px;
  font-weight: 600;
  margin-top: 4px;
}
.counter {
  position: absolute;
  bottom:12px;
  right:15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.counter .just {
  width:16px;
  height:16px;
  position: absolute;
  left:115px;
}
.counter .num {
  position: absolute;
  left:130px;
}
.counter .just img {
  width:103%;
}
.counter .negative {
  width:16px;
  height:16px;
}
.counter img {
  width:100%;
}
.counter .num {
  padding:0 5px;
  height:22px;
  line-height:22px;
}
#overflow-hidden {
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>