import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入vant组件
import "./plugin/vant"
//引入better-scroll组件

//引入jquery
import $ from "jquery";

//移动端适配
import 'lib-flexible'

//引入全局css
import "./assets/common.css"

//引入时间过滤组件
import moment from 'moment'

//引入VueAwesomeSwiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
 
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

//中央事件总线
Vue.prototype.$event = new Vue();



//定义时间过滤全局组件
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})


// 使用element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
