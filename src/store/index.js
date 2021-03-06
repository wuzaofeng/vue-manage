import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  isCollapse: false, // 是否折叠
  cnode_login: false, // 是否登录cnode
  cnode_accessToken: '',
  cnode_loginname: '',
  cnode_mark: 0
  // cnode_id: '',
  // cnode_avatar_url: ''// 头像地址
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
