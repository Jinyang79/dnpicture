<template>
  <view>
    <view class="home_category">
      <navigator class="category_item"
                 v-for="item in category"
                 :key="item.id"
                 :url="`/pages/imgCategory/index?id=${item.id}`">
        <image :src="item.cover"
               mode="aspectFill"></image>
        <view class="cate_name">{{item.name}}</view>
      </navigator>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      category: []
    }
  },
  mounted () {
    uni.setNavigationBarTitle({ title: '分类' })
    this.getDate()
  },
  methods: {
    async getDate () {
      const { res } = await this.request({
        url: 'http://157.122.54.189:9088/image/v1/vertical/category'
      })
      this.category = res.category;
    }
  }
}
</script>

<style lang="scss" scoped>
.home_category {
  display: flex;
  flex-wrap: wrap;
  .category_item {
    width: 33.33%;
    position: relative;
    border: 5rpx solid #fff;
    image {
      height: 240rpx;
    }
    .cate_name {
      position: absolute;
      width: 100%;
      height: 40rpx;
      left: 0;
      bottom: 0;
      color: #fff;
      // c3 渐变效果
      background-image: linear-gradient(
        to right top,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      );
      display: flex;
      align-items: center;
      font-size: 40rpx;
      padding-left: 20rpx;
      padding-bottom: 10rpx;
    }
  }
}
</style>