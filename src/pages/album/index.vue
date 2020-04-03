<template>
  <view>
    <!-- 专辑背景 -->
    <view class="album_bg">
      <image mode="widthFix"
             :src="album.cover">
        <view class="album_info">
          <view class="album_name">{{album.name}}</view>
          <view class="album_btn">关注专辑</view>
        </view>
    </view>
    <!-- 专辑描述 -->
    <view class="album_author">
      <view class="album_author_info">
        <image mode="widthFix"
               :src="album.user.avatar">
          <view class="album_author_name">{{album.user.name}}</view>
      </view>
      <view class="album_author_desc"><text>{{album.desc}}</text></view>
    </view>
    <!-- 列表 -->
    <view class="album_list">
      <view class="album_item"
            v-for="item in wallpaper"
            :key="item.id">
        <image mode="aspectFill"
               :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      params: {
        limit: 30,
        order: 'new',
        skip: 0,
        // “1” 表示第一次请求 返回值有album对象
        // “0”表示不是第一次请求 返回值只有wallpaper对象
        first: 1
      },
      id: -1,
      album: {},
      wallpaper: [],
      hasMore: true

    }
  },
  onLoad (options) {
    this.id = options.id
    this.getList()
  },
  onReachBottom () {
    if (this.hasMore) {
      this.params.first = 0;
      this.params.skip += this.params.limit;
      this.getList();
    } else {
      this.showToast()
    }
  },
  methods: {
    async getList () {
      const { res } = await this.request({
        url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
        data: this.params
      })
      // album是对象 Object.keys()返回值是数组
      if (Object.keys(this.album).length === 0) {
        this.album = res.album;
      }
      if (res.wallpaper.length === 0) {
        this.hasMore = false;
        // 第一次不触发 加上触发
        this.showToast()
        return;
      }
      this.wallpaper = [...this.wallpaper, ...res.wallpaper];
    }
  }
}
</script>

<style lang="scss" scoped>
.album_bg {
  position: relative;
  image {
  }

  .album_info {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    height: 80rpx;
    align-items: center;
    color: #fff;
    padding: 0 15rpx;
    .album_name {
      font-size: 40rpx;
    }

    .album_btn {
      background-color: $color;
      width: 152rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10rpx;
    }
  }
}
.album_author {
  padding: 10rpx;
  .album_author_info {
    padding: 10rpx 0;
    display: flex;
    image {
      width: 50rpx;
    }

    .album_author_name {
      color: #000;
      margin-left: 15rpx;
    }
  }

  .album_author_desc {
  }
}
.album_list {
  display: flex;
  flex-wrap: wrap;
  .album_item {
    width: 33.33%;
    border: 3rpx solid #fff;
    image {
      height: 180rpx;
    }
  }
}
</style>