<template>
  <view>
    <view class="video_category">
      <navigator class="category_item"
                 v-for="item in videoCategory"
                 :key="item.name"
                 :url="`/pages/videoCategory/index?id=${item.id}`">
        <image :src="item.img"
               mode="aspectFill"></image>
        <view class="cate_name">{{item.name}}</view>
      </navigator>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    urlobj: Object
  },
  data () {
    return {
      videoCategory: [],
      hasMore: true
    }
  },
  mounted () {
    // console.log(this.urlobj);
    this.getList()
  },
  methods: {
    async getList () {
      const { res } = await this.request({
        url: this.urlobj.url,
        data: this.urlobj.params
      });
      console.log(res);
      this.videoCategory = res.category

      // if (res.videowp.length === 0) {
      //   this.hasMore = false
      //   this.showToast()
      //   return
      // }
      // this.videowp = [...this.videowp, ...res.videowp]
    }
  }
}
</script>

<style lang="scss" scoped>
.video_category {
  display: flex;
  flex-wrap: wrap;
  .category_item {
    width: 50%;
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