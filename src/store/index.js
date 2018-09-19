import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  currentTab: '1', // 导航当前选中的值
  tabs: [{
    index: '1',
    title: '主页',
    path: '/'
  }] // 导航tabs
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
