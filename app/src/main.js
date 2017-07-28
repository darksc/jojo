// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import { appRouter } from './router'
import filters from './filters/filters'

Vue.config.productionTip = false

Vue.use(ElementUI)

for (let key in filters) {
  Vue.filter(key, filters[key])
}

/* eslint-disable no-new */
window.vmApp = new Vue({
  el: '#app',
  router: appRouter,
  template: '<App/>',
  components: { App }
})
