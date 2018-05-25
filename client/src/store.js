import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: {
      _id: null,
      admin: false
    },
    loggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUser (state, user) {
      state.user = user
    },
    setLoggedIn (state, loggedIn) {
      state.loggedIn = loggedIn
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
      window.localStorage.setItem('token', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    setLoggedIn ({ commit }, loggedIn) {
      commit('setLoggedIn', loggedIn)
    }
  },
  getters: {
    token: state => state.token,
    loggedIn: state => state.loggedIn,
    admin: state => state.user.admin,
    userId: state => state.user._id || null
  }
})
