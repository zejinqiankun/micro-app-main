import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerMicroApps, start } from 'qiankun'
import apps from './micro-app'
import ElementUI from 'element-ui'
import { Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' })

Vue.use(Loading)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
let loadingInstance
registerMicroApps(apps, {
  beforeLoad: (app) => {
    loadingInstance = Loading.service({
      target: '#mask-container',
    })
    console.log('beforeLoad:', app.name)
    return Promise.resolve()
  },
  afterMount: (app) => {
    loadingInstance.close()
    console.log('afterMount:', app.name)
    return Promise.resolve()
  },
})
start()
