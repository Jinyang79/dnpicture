import Vue from 'vue'
import App from './App'
import request from './utils/request'

Vue.config.productionTip = false
Vue.prototype.request = request
// 到底弹框
Vue.prototype.showToast = () => {
  uni.showToast({
    title: '到底啦~~',
    icon: 'none'
  })
}

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
