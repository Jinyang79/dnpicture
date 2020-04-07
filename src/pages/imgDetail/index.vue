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
      <!-- 子传父 -->
      <swiper-action @swiperAction='handleSwiperAction'>
        <image mode="widthFix"
               :src="imgDetail.thumb"></image>
      </swiper-action>
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
    <!-- 专辑 -->
    <view class="album_wrap"
          v-if="album.length">
      <view class="album_title">相关</view>
      <view class="album_list">
        <view class="album_item"
              v-for="item in album"
              :key="item.id">
          <view class="album_cover">
            <image :src="item.cover"
                   mode="aspectFill"></image>
          </view>
          <view class="album_info">
            <view class="album_info_text">专辑</view>
            <view class="album_name">{{item.name}}</view>
            <view class="iconfont iconiconfontjiantou4"></view>
          </view>
        </view>
      </view>
    </view>
    <!-- 热评 -->
    <view class="comment hot"
          v-if="hot.length">
      <view class="comment_title">
        <text class="iconfont iconhot1"></text>
        <text class="comment_text">最热评论</text>
      </view>
      <view class="comment_list">
        <view class="comment_item"
              v-for="item in hot"
              :key="item.id">
          <!-- 用户信息 -->
          <view class="comment_user">
            <!-- 用户头像 -->
            <view class="user_icon">
              <image mode="widthFix"
                     :src="item.user.avatar"></image>
            </view>
            <!-- 用户名称 -->
            <view class="user_name">
              <view class="user_nickname">{{item.user.name}}</view>
              <view class="user_time">{{item.cnTime}}</view>
            </view>
            <!-- 用户徽章 -->
            <view class="user_badge">
              <image v-for="item2 in item.user.title"
                     :key="item2.icon"
                     :src="item2.icon"></image>
            </view>
          </view>
          <!-- 评论数据 -->
          <view class="comment_desc">
            <view class="comment_content">{{item.content}}</view>
            <view class="comment_like">
              <text class="iconfont icondianzan">{{item.size}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 新评论 -->
    <view class="comment new"
          v-if="comment.length">
      <view class="comment_title">
        <text class="iconfont iconpinglun"></text>
        <text class="comment_text">最新评论</text>
      </view>
      <view class="comment_list">
        <view class="comment_item"
              v-for="item in comment"
              :key="item.id">
          <!-- 用户信息 -->
          <view class="comment_user">
            <!-- 用户头像 -->
            <view class="user_icon">
              <image mode="widthFix"
                     :src="item.user.avatar"></image>
            </view>
            <!-- 用户名称 -->
            <view class="user_name">
              <view class="user_nickname">{{item.user.name}}</view>
              <view class="user_time">{{item.cnTime}}</view>
            </view>
            <!-- 用户徽章 -->
            <view class="user_badge">
              <image v-for="item2 in item.user.title"
                     :key="item2.icon"
                     :src="item2.icon"></image>
            </view>
          </view>
          <!-- 评论数据 -->
          <view class="comment_desc">
            <view class="comment_content">{{item.content}}</view>
            <view class="comment_like">
              <text class="iconfont icondianzan">{{item.size}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 下载按钮 -->
    <view class="download">
      <view class="download-btn"
            @click="handleDownload">下载图片</view>
    </view>
  </view>
</template>

<script>
import moment from "moment";
import swiperAction from "@/components/swiperAction";
// 设置语言为中文
moment.locale('zh-cn');
export default {
  components: {
    swiperAction
  },
  data () {
    return {
      // 图片信息对象
      imgDetail: {},
      album: [],
      hot: [],
      comment: [],
      // 图片索引
      imgIndex: 0
    }
  },
  onLoad () {
    const { imgIndex } = getApp().globalData;
    this.imgIndex = imgIndex;
    this.getDate();
  },
  methods: {
    getDate () {
      // console.log(getApp().globalData);
      const { imgList } = getApp().globalData;
      // console.log(imgList[imgIndex]);
      this.imgDetail = imgList[this.imgIndex];
      // 拼接图片路径, onLoad页面加载调用replace()方法会报错
      // this.imgDetail.newThumb = this.imgDetail.thumb + this.imgDetail.rule.replace("$<Height>", 360);
      // moment 接收的是毫米
      // fromNow()实现 显示xx月前
      this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow()
      this.getComments(this.imgDetail.id)
    },
    async getComments (id) {
      const { res } = await this.request({
        url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
      })
      console.log(res);
      this.album = res.album;
      // hot对象添加时间属性
      res.hot.forEach(e => e.cnTime = moment(e.atime * 1000).fromNow());
      res.comment.forEach(e => e.cnTime = moment(e.atime * 1000).fromNow());
      this.hot = res.hot;
      this.comment = res.comment;

    },
    // 滑动事件
    handleSwiperAction (e) {
      // 左滑 imgIndex++
      // 右滑 imgIndex--
      // 判断是否超过数组长度
      const { imgList } = getApp().globalData;
      if (e.direction === 'left' && this.imgIndex < imgList.length - 1) {
        this.imgIndex++;
        this.getDate();
      } else if (e.direction === 'right' && this.imgIndex > 0) {
        this.imgIndex--;
        this.getDate();
      } else {
        this.showToast()
      }
    },
    async handleDownload () {
      // 1.下载远程文件到小程序的内存中 tempFilePath 
      await uni.showLoading({
        title: '下载中'
      })

      const res1 = await uni.downloadFile({ url: this.imgDetail.img })
      // console.log(res);
      const { tempFilePath } = res1[1]

      // 2.将图片从内存中下载到本地
      const res2 = await uni.saveImageToPhotosAlbum({ filePath: tempFilePath })
      // console.log(res2);

      uni.hideLoading();
      await uni.showToast({
        title: '下载成功'
      })

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
.high_img {
  border-bottom: 1rpx solid #eee;
}
.album_wrap {
  padding: 20rpx;
  .album_title {
    padding: 10rpx 0;
  }

  .album_list {
    .album_item {
      display: flex;
      padding: 10rpx 0;
      border-bottom: 10rpx solid #eee;
      .album_cover {
        flex: 1;
        image {
          width: 180rpx;
          height: 180rpx;
        }
      }

      .album_info {
        flex: 3;
        padding-left: 20rpx;
        position: relative;
        .album_info_text {
          width: 100rpx;
          height: 50rpx;
          background-color: $color;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .album_name {
          padding: 10rpx 0;
          color: #888;
        }
        .iconfont {
          font-size: 40rpx;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 10%;
          color: #888;
        }
      }
    }
  }
}
.comment {
  .comment_title {
    padding: 15rpx;
    .iconfont {
      color: red;
      font-size: 40rpx;
    }

    .comment_text {
      font-weight: 600;
      font-size: 28rpx;
      color: #666;
      margin-left: 10rpx;
    }
  }

  .comment_list {
  }
}
.comment_list {
  .comment_item {
    border-bottom: 15rpx solid #eee;
    .comment_user {
      display: flex;
      padding: 20rpx 0;
      .user_icon {
        width: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
        image {
          width: 90%;
        }
      }

      .user_name {
        flex: 1;
        .user_nickname {
          color: #777;
        }

        .user_time {
          color: #ccc;
          font-size: 24rpx;
          padding: 5rpx;
        }
      }

      .user_badge {
        image {
          display: inline-block;
          margin-right: 10rpx;
          width: 40rpx;
          height: 40rpx;
        }
      }
    }

    .comment_desc {
      display: flex;
      padding: 30rpx 0;
      .comment_content {
        flex: 1;
        padding-left: 15%;
        color: #000;
      }

      .comment_like {
        position: relative;
        .iconfont {
          position: absolute;
          right: 20rpx;
          font-size: 38rpx;
        }
      }
    }
  }
}
.new {
  .iconpinglun {
    color: aqua !important;
  }
}
.download {
  height: 120rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .download-btn {
    width: 90%;
    height: 75%;
    background-color: $color;
    color: #fff;
    font-size: 50rpx;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>