import {
  TOOGLE_NAV,
  CNODE_LOGIN,
  CNODE_EXIT
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
  [CNODE_EXIT] (state) {
    state.cnode_login = false
  }
}
