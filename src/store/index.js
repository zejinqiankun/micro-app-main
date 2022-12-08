import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息
    userInfo: {},
  },
  getters: {
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
  },
  actions: {
    // 设置用户信息
    setUserInfo({ commit }, userInfo) {
      commit("SET_USER_INFO", userInfo);
    }
  },
  modules: {
  }
})
