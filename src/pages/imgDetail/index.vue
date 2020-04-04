<template>
  <view>
    <!-- 用户信息 -->
    <view class="user_info">
      <view class="user_icon">
        <image :src="imgDetail.user.avatar"
               mode="widthFix"></image>
      </view>
      <view class="user_desc">
        <view class="user_name">{{imgDetail.user.name}}</view>
        <view class="user_time">{{imgDetail.cnTime}}</view>
      </view>
    </view>
    <!-- 大图 -->
    <view class="high_img">
      <image mode="widthFix"
             :src="imgDetail.newThumb"></image>
    </view>
    <!-- 点赞 -->
    <view class="user_rank">
      <view class="rank">
        <text class="iconfont icondianzan">{{imgDetail.rank}}</text>
      </view>
      <view class="user_collect">
        <text class="iconfont iconshoucang">收藏</text>
      </view>
    </view>
  </view>
</template>

<script>
import moment from "moment";
// 设置语言为中文
moment.locale('zh-cn');
export default {
  data () {
    return {
      imgDetail: {},
      album: [],
      hot: [],
      comment: []
    }
  },
  onLoad () {
    console.log(getApp().globalData);
    const { imgList, imgIndex } = getApp().globalData;
    console.log(imgList[imgIndex]);
    this.imgDetail = imgList[imgIndex];
    // 拼接图片路径, onLoad页面加载调用replace()方法会报错
    this.imgDetail.newThumb = this.imgDetail.thumb + this.imgDetail.rule.replace('$<Height>', 360)
    // moment 接收的是毫米
    // fromNow()实现 显示xx月前
    this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow()
    this.getComments(this.imgDetail.id)
  },
  methods: {
    async getComments (id) {
      const { res } = await this.request({
        url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
      })
      this.album = res.album;
      this.hot = res.hot;
      this.comment = res.comment;

    }
  }
}
</script>

<style lang="scss" scoped>
.user_info {
  display: flex;
  padding: 20rpx;
  .user_icon {
    padding: 0 20rpx;
    image {
      width: 88rpx;
      border-radius: 50%;
    }
  }
  .user_desc {
    .user_name {
      color: #000;
      font-weight: 600;
    }

    .user_time {
      color: #ccc;
      font-size: 24rpx;
      padding: 10px 0rpx;
    }
  }
}
.user_rank {
  display: flex;
  height: 80rpx;
  border-bottom: 5rpx solid #eee;
  .rank {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    .iconfont {
    }
  }

  .user_collect {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    .iconfont {
    }
  }
}
</style>