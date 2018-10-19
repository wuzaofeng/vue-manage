import CNodeApi from '@/server/cnode/cnode-api'
import {
  CNODE_LOGIN
} from './mutations-types'

export default {
  cnodeLoginAsync ({commit}, accesstoken) {
    console.log(accesstoken)
    return new Promise((resolve, reject) => {
      CNodeApi.accessToken({ accesstoken }).then(res => {
        const { success } = res
        if (success) {
          commit(CNODE_LOGIN, accesstoken)
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  }
}
