import {
  TOOGLE_NAV,
  CNODE_LOGIN,
  CNODE_LOGINNAME,
  CNODE_EXIT,
  CNODE_SET_MARK
} from './mutations-types'

export default {
  [TOOGLE_NAV] (state) {
    const { isCollapse } = state
    state.isCollapse = !isCollapse
  },
  [CNODE_LOGIN] (state, accessToken) {
    state.cnode_login = true
    state.cnode_accessToken = accessToken
  },
  [CNODE_LOGINNAME] (state, loginname) {
    state.cnode_loginname = loginname
  },
  [CNODE_EXIT] (state) {
    state.cnode_login = false
  },
  [CNODE_SET_MARK] (state, mark) {
    state.cnode_mark = mark
  }
}
