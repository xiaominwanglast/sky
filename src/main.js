import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import App from './App'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Vuex);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
