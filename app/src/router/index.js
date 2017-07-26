import Vue from 'vue'
import Router from 'vue-router'
import Dtfd from '@/views/Dtfd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dtfd',
      name: 'dtfd',
      component: Dtfd
    },
    {
      path: '*',
      redirect: '/dtfd'
    }
  ]
})
