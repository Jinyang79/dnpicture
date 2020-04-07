<template>
  <view class="home_tab">
    <view class="home_tab_title">
      <view class="title_inner">
        <uni-segmented-control :current="current"
                               :values="items.map(v=>v.title)"
                               @clickItem="onClickItem"
                               style-type="text"
                               active-color="#1A73E8">
        </uni-segmented-control>
      </view>
      <!-- <view class="iconfont iconsearch"></view> -->
    </view>
    <view class="home_tab_content">
      <view v-if="current === 0">
        <homeRecommend></homeRecommend>
      </view>
      <view v-if="current === 1">
        <homeCategoty></homeCategoty>
      </view>
      <view v-if="current === 2">
        <homeAlbum></homeAlbum>
      </view>
    </view>
  </view>
</template>

<script>
import homeAlbum from './home-album'
import homeCategoty from './home-categoty'
import homeRecommend from './home-recommend'
import { uniSegmentedControl } from '@dcloudio/uni-ui'

export default {
  components: {
    homeAlbum,
    homeCategoty,
    homeRecommend,
    uniSegmentedControl
  },
  data () {
    return {
      items: [
        { title: '推荐' },
        { title: '分类' },
        { title: '专辑' }],
      current: 0
    }
  },
  methods: {
    onClickItem (e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home_tab {
  .home_tab_title {
    position: relative;
    .title_inner {
      width: 60%;
      margin: 0 auto;
    }
    .iconsearch {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 5%;
    }
  }
}
</style>