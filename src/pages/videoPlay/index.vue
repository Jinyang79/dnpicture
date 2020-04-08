<template>
  <view class="vide_play">
    <image :src="videoObj.img"></image>
    <!-- 工具栏 -->
    <view class="video_tool">
      <view @click="handleMuted"
            :class="['iconfont',muted?'iconjingyin':'iconshengyin']"></view>
      <view class="iconfont iconzhuanfa">
        <button open-type="share"></button>
      </view>
    </view>
    <!-- 视频 -->
    <view class="video_wrap">
      <video :src="videoObj.video"
             objectFit='fill'
             :muted="muted"></video>
    </view>
    <!-- 下载视频 -->
    <view class="download">
      <view class="download_btn"
            @click="handleDownload">
        下载视频
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      videoObj: {},
      // 是否静音
      muted: false
    }
  },
  onLoad () {
    console.log(getApp().globalData);
    this.videoObj = getApp().globalData.video
  },
  methods: {
    // 开关声音
    handleMuted () {
      this.muted = !this.muted;
    },
    // 下载视频
    async handleDownload () {
      await uni.showLoading({ title: "下载中" });
      // 1 将远程文件 下载到小程序内存中
      const { tempFilePath } = (await uni.downloadFile({ url: this.videoObj.video }))[1];
      // 2 将内存中的文件 下载到本地上
      await uni.saveVideoToPhotosAlbum({
        filePath: tempFilePath
      });
      uni.hideLoading();
      await uni.showToast({ title: "下载成功" })
    }
  }
}
</script>
<style lang="scss" scoped>
.vide_play {
  position: relative;
  image {
    position: absolute;
    width: 100vm;
    height: 100vh;
    z-index: -1;
    // 设置模糊
    filter: blur(5px);
  }

  .video_tool {
    height: 80rpx;
    display: flex;
    justify-content: flex-end;

    .iconfont {
      width: 80rpx;
      color: #fff;
      font-size: 50rpx;
      border-radius: 80rpx;
      background-color: rgba(0, 0, 0, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20rpx;
    }
    .iconzhuanfa {
      position: relative;
      button {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }

  .video_wrap {
    display: flex;
    justify-content: center;
    video {
      width: 336rpx;
      height: 600rpx;
    }
  }

  .download {
    display: flex;
    justify-content: center;
    margin-top: 30rpx;
    .download_btn {
      width: 360rpx;
      height: 80rpx;
      border-radius: 40rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      border: 2rpx solid #fff;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>