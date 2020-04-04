<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    list: Array,
    index: Number
  },
  methods: {
    handleClick () {
      // 1.存储数据
      // 存到getApp().globalData 实现数据共享
      getApp().globalData.imgList = this.list
      getApp().globalData.imgIndex = this.index
      // console.log(getApp().globalData)

      // 2.实现页面跳转
      uni.navigateTo({
        url: '/pages/imgDetail/index'
      })

    }
  }

}
</script>

<style>
</style>