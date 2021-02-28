import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    answer: '',
  },
  getters: {},
  mutations: {
    changeAnswer(state, payload) {
      state.answer = payload
    }
  },
  actions: {}
});