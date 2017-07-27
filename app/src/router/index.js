import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import Server from '@/views/server'
import Logs from '@/views/logs'
import Detail from '@/views/detail'

Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/server',
    name: 'server',
    component: Server
  },
  {
    path: '/detail:id?',
    name: 'detail',
    component: Detail
  },
  {
    path: '/logs',
    name: 'logs',
    component: Logs
  }
]

routes.push({
  path: '*',
  redirect: '/'
})

const appRouter = new Router({
  routes: routes
})

export {
  appRouter
}
