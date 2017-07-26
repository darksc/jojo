/**
 * author     dark
 * date       16/11/8
 */
import Vue from 'vue'
import Vuex from 'vuex'

import nav from './modules/nav'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    nav
  }
})
