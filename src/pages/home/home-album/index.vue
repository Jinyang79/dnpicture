<template>
  <scroll-view class="album_scroll_view"
               scroll-y
               @scrolltolower='handleTolower'>
    <!-- 轮播图 -->
    <view class="album_swiper">
      <swiper autoplay
              indicator-dots
              circular>
        <swiper-item v-for="item in banner"
                     :key="item.id">
          <image :src="item.thumb">
        </swiper-item>
      </swiper>
    </view>
    <!-- 列表 -->
    <view class="album_list">
      <navigator class="album_item"
                 v-for="(item,index) in album"
                 :key="item.id"
                 :url='`/pages/album/index?id=${item.id}`'>
        <view class="album_image">
          <go-detail :list='album'
                     :index='index'>
            <image mode='aspectFill'
                   :src="item.cover"></image>
          </go-detail>
        </view>
        <view class="album_info">
          <view class="album_name">{{item.name}}</view>
          <view class="album_desc">{{item.desc}}</view>
          <view class="album_btn">
            <view class="album_attention">+ 关注</view>
          </view>
        </view>
      </navigator>
    </view>
  </scroll-view>
</template>

<script>
import goDetail from "@/components/goDetail";
export default {
  data () {
    return {
      params: {
        limit: 30,
        order: 'new',
        skip: 0
      },
      // 轮播图数组
      banner: [],
      // 列表数组
      album: [],
      hasMore: true
    }
  },
  mounted () {
    uni.setNavigationBarTitle({ title: '专辑' })
    this.getList()
  },
  methods: {
    async getList () {
      const { res } = await this.request({
        url: 'http://157.122.54.189:9088/image/v1/wallpaper/album',
        data: this.params
      })
      if (this.banner.length === 0) {
        this.banner = res.banner
      }
      // 如果返回的列表为空 
      if (res.album.length === 0) {
        this.hasMore = false;
        this.showToast()
        return
      }
      this.album = [...this.album, ...res.album]
    },
    handleTolower () {
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getList();
      } else {
        this.showToast()
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.album_scroll_view {
  height: calc(100vh - 36px);
}
.album_swiper {
  swiper {
    height: calc(750rpx / 2.3);
    image {
      height: 100%;
    }
  }
}
.album_list {
  padding: 10rpx;
  .album_item {
    padding: 10rpx 0;
    display: flex;
    border-bottom: 1rpx solid #ccc;
    .album_image {
      flex: 1;
      padding: 10rpx;
      image {
        width: 260rpx;
        height: 180rpx;
      }
    }

    .album_info {
      flex: 2;
      padding: 0 10rpx;
      overflow: hidden;
      .album_name {
        font-size: 30rpx;
        color: #000;
        padding: 10rpx 0;
      }

      .album_desc {
        padding: 10rpx 0;
        font-size: 24rpx;

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .album_btn {
        padding: 10rpx;
        display: flex;
        justify-content: flex-end;
        padding-top: 30rpx;
        .album_attention {
          font-size: 24rpx;
          color: $color;
          border: 1rpx solid $color;
          padding: 10rpx;
        }
      }
    }
  }
}
</style>