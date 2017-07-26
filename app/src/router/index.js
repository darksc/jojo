import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import Server from '@/views/server'
import Logs from '@/views/logs'
import Detail from '@/views/detail'

Vue.use(Router)

const routeObj = {
  index: {
    path: '/',
    name: 'index',
    cn: '首页',
    component: index
  },
  server: {
    path: '/server',
    name: 'server',
    cn: '服务器',
    component: Server
  },
  detail: {
    path: '/detail:id?',
    name: 'detail',
    cn: '服务器详情',
    component: Detail
  },
  logs: {
    path: '/logs',
    name: 'logs',
    cn: '日志',
    component: Logs
  }
}

let routes = []

for (let key in routeObj) {
  routes.push(routeObj[key])
}

routes.push({
  path: '*',
  redirect: '/'
})

const appRouter = new Router({
  routes: routes
})

appRouter.beforeEach((to, from, next) => {
  next()
})

export {
  appRouter,
  routeObj
}
