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
    loggedIn: false,
    categories: [
      {name: 'School News', value: 'school-news'},
      {name: 'World', value: 'world'},
      {name: 'Media', value: 'media'},
      {name: 'Politics', value: 'politics'},
      {name: 'Science', value: 'science'},
      {name: 'School and Local News', value: 'school-and-local-news'},
      {name: 'Environmental Issues', value: 'environmental-issues'},
      {name: 'Agony Aunt', value: 'agony-aunt'},
      {name: 'Educational Interview', value: 'educational-interview'},
      {name: 'Opinion Pieces', value: 'opinion-pieces'}
    ],
    categoryMap: new Map([
      ['School News', 'school-news'],
      ['World', 'world'],
      ['Media', 'media'],
      ['Politics', 'politics'],
      ['Science', 'science'],
      ['School and Local News', 'school-and-local-news'],
      ['Environmental Issues', 'environmental-issues'],
      ['Agony Aunt', 'agony-aunt'],
      ['Educational Interview', 'educational-interview'],
      ['Opinion Pieces', 'opinion-pieces']
    ]),
    invCategoryMap: new Map([
      ['school-news', 'School News'],
      ['world', 'World'],
      ['media', 'Media'],
      ['politics', 'Politics'],
      ['science', 'Science'],
      ['school-and-local-news', 'School and Local News'],
      ['environmental-issues', 'Environmental Issues'],
      ['agony-aunt', 'Agony Aunt'],
      ['educational-interview', 'Educational Interview'],
      ['opinion-pieces', 'Opinion Pieces']
    ])
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
    categories: state => state.categories,
    categoryMap: state => state.categoryMap,
    invCategoryMap: state => state.invCategoryMap,
    userId: state => state.user._id || null
  }
})
