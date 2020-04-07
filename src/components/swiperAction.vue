<template>
  <view @touchstart="handleTouchstart"
        @touchend="handleTouchend">
    <slot></slot>
  </view>
</template>

<script>
export default {
  data () {
    return {
      startTime: 0,
      endTime: 0,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      // 滑动方向
      direction: ""
    }
  },
  methods: {
    // 用户按下屏幕
    handleTouchstart (event) {
      this.startTime = Date.now();
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientY;

    },
    // 用户离开屏幕
    handleTouchend (event) {
      this.endTime = Date.now();
      this.endX = event.changedTouches[0].clientX;
      this.endY = event.changedTouches[0].clientY;

      if (this.endTime - this.startTime > 2000) {
        return;
      }
      // 判断滑动方向  abs绝对值
      if (Math.abs(this.endX - this.startX) > 10 && Math.abs(this.endY - this.startY) < 20) {
        this.direction = this.endX - this.startX > 0 ? 'right' : 'left';
      } else {
        return;
      }
      this.$emit('swiperAction', { direction: this.direction });

    }
  }
}
</script>

<style>
</style>