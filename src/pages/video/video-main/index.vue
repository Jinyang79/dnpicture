<template>
  <scroll-view class="video_main"
               enable-flex
               scroll-y
               @scrolltolower="handleTolower">
    <view class="video_item"
          v-for="item in videowp"
          :key="item.id">
      <image :src="item.img"
             mode="widthFix" />
    </view>
  </scroll-view>
</template>

<script>
export default {
  props: {
    urlobj: Object
  },
  data () {
    return {
      videowp: []
    }
  },
  watch: {
    urlobj () {
      this.getList()
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
      this.videowp = res.videowp
    }
  }
}
</script>

<style lang="scss" scoped>
.video_main {
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 36px);
  .video_item {
    width: 33.33%;
    border: 5rpx solid #fff;
  }
}
</style>