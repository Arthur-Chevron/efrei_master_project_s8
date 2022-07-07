import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import jwt_decode from "jwt-decode"

Vue.use(require('vue-cookies'))
Vue.config.productionTip = false


router.beforeEach((to, _from, next) => {
  // authentification demandée
  let decodeExpire = {}
  decodeExpire.exp = 0

  if (Vue.$cookies.isKey('cookieMOP')) decodeExpire = jwt_decode(Vue.$cookies.get('cookieMOP'))
  if (decodeExpire.exp <= Date.now() / 1000){
    Vue.$cookies.remove('cookieMOP', '/', process.env.VUE_APP_DOMAIN)
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    if (decodeExpire.exp <= Date.now() / 1000){
      Vue.$cookies.remove('cookieMOP', '/', process.env.VUE_APP_DOMAIN)
      return next({path: '/'})

    } else return next()

  } else if (to.matched.some(record => record.meta.noAuth)) {

    if (Vue.$cookies.isKey('cookieMOP')) return next({path: '/browser'})
    
    return next()

  }

  return next()
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
