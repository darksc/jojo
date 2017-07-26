import { NAV_CHANGE } from '../mutation-types'

// initial state
const state = {
  activeIndex: 'server'
}

// getters
const getters = {
}

// actions
const actions = {
  setNav ({commit, state}, params) {
    commit(NAV_CHANGE, params)
  }
}

// mutations
const mutations = {
  [NAV_CHANGE] (state, params) {
    state.activeIndex = params
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
