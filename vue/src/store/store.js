import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: ''
  },
  getters: {

  },
  mutations: {
    changeUsername(state, payload) {
      state.username = payload;
    }
  },
  actions: {}
})
