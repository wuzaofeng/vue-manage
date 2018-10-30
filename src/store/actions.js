import CNodeApi from '@/server/cnode/cnode-api'
import {
  CNODE_LOGIN,
  CNODE_LOGINNAME,
  CNODE_SET_MARK
} from './mutations-types'

export default {
  cnodeLoginAsync ({commit}, accesstoken) {
    return new Promise((resolve, reject) => {
      CNodeApi.accessToken({ accesstoken }).then(res => {
        const { success } = res
        if (success) {
          commit(CNODE_LOGIN, accesstoken)
          commit(CNODE_LOGINNAME, res.loginname)
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  cnodeCollectAsync ({commit, state}, id) {
    const { cnode_accessToken: token } = state
    return new Promise((resolve, reject) => {
      CNodeApi.collect({
        accesstoken: token,
        topic_id: id
      }).then(res => {
        const { success } = res
        if (success) resolve(res)
      })
    })
  },
  cnodeDelCollectAsync ({commit, state}, id) {
    const { cnode_accessToken: token } = state
    return new Promise((resolve, reject) => {
      CNodeApi.delCollect({
        accesstoken: token,
        topic_id: id
      }).then(res => {
        const { success } = res
        if (success) resolve(res)
      })
    })
  },
  cnodeGetMarkAsync ({commit, state}) {
    const { cnode_accessToken: token } = state
    return new Promise((resolve, reject) => {
      CNodeApi.getCount({
        accesstoken: token
      }).then(res => {
        const { success } = res
        if (success) commit(CNODE_SET_MARK, res.data)
      })
    })
  }
}
