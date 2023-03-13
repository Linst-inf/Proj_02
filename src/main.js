import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router'
import store from '@/store';
import '@/api/mock'
import Cookie from 'js-cookie';


Vue.use(ElementUI);

Vue.config.productionTip = false

//添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  // token存不存在
  const token = Cookie.get('token')
  //token不存在
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
    //token存在
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
