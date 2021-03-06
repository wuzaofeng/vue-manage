import Axios from '../axios'
import * as TYPES from './cnode-types'
export default class CNodeApi {
  static BASE_URL = 'https://cnodejs.org/api/v1'
  static TOKEN = '7d1c022b3b914c4c99947d17b3efc967'
  static TOKEN_SCAN = 'data:image/png;base64,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'
  static METHOD = {
    POST: 'post'
  }
  // 主题列表
  static getTopics (data) {
    return Axios.fetch({
      url: `${CNodeApi.BASE_URL}/${TYPES.TOPICS}`,
      data
    })
  }

  // 主题详情
  static getDetails ({id, data = {}}) {
    return Axios.fetch({
      url: `${CNodeApi.BASE_URL}/${TYPES.TOPIC}/${id}`,
      params: data
    })
  }

  // 新建主题
  static addTopics (data) {
    return Axios.fetch({
      url: `${CNodeApi.BASE_URL}/${TYPES.TOPICS}`,
      data,
      method: CNodeApi.METHOD.POST
    })
  }

  // 编辑主题
  static updateTopics (data) {
    return Axios.fetch({
      url: `${CNodeApi.BASE_URL}/${TYPES.TOPICS}/update`,
      data,
      method: CNodeApi.METHOD.POST
    })
  }

  // 验证 accessToken 的正确性
  static accessToken (data) {
    return Axios.fetch({
      url: `${CNodeApi.BASE_URL}/${TYPES.ACCESS_TOKEN}`,
      data,
      method: CNodeApi.METHOD.POST
    })
  }

  // 收藏主题
  static collect (data) {
    return Axios.fetch({
      url: `${CNodeApi.BASE_URL}/${TYPES.COLLECT_ADD}`,
      data,
      method: CNodeApi.METHOD.POST
    })
  }

  // 取消主题
  static delCollect (data) {
    return Axios.fetch({
      url: `${CNodeApi.BASE_URL}/${TYPES.COLLECT_DELETE}`,
      data,
      method: CNodeApi.METHOD.POST
    })
  }

  // 用户信息
  static userInfo (loginname) {
    return Axios.fetch({
      url: `${CNodeApi.BASE_URL}/${TYPES.USER_INFO}/${loginname}`
    })
  }

  // 用户收藏主题列表
  static getCollects (loginname) {
    return Axios.fetch({
      url: `${CNodeApi.BASE_URL}/${TYPES.COLLECT_INFO}/${loginname}`
    })
  }

  // 获取未读消息数
  static getCount (params) {
    return Axios.fetch({
      url: `${CNodeApi.BASE_URL}/${TYPES.MESSAGE_COUNT}`,
      params
    })
  }

  // 获取已读和未读消息
  static message (params) {
    return Axios.fetch({
      url: `${CNodeApi.BASE_URL}/${TYPES.MESSAGE_INFO}`,
      params
    })
  }

  // 为评论点赞
  static reply ({ id, data }) {
    return Axios.fetch({
      url: `${CNodeApi.BASE_URL}/${TYPES.REPLY_UPS}/${id}/ups`,
      data,
      method: CNodeApi.METHOD.POST
    })
  }

  // 标记全部已读
  static markAll (data) {
    return Axios.fetch({
      url: `${CNodeApi.BASE_URL}/${TYPES.MESSAGE_MARK_ALL}`,
      data,
      method: CNodeApi.METHOD.POST
    })
  }

  // 标记单个已读
  static markOne ({ id, data }) {
    return Axios.fetch({
      url: `${CNodeApi.BASE_URL}/${TYPES.MESSAGE_MARK}/${id}`,
      data,
      method: CNodeApi.METHOD.POST
    })
  }

  // 新建评论
  static replies ({ id, data }) {
    return Axios.fetch({
      url: `${CNodeApi.BASE_URL}/${TYPES.TOPIC}/${id}/replies`,
      data,
      method: CNodeApi.METHOD.POST
    })
  }
}
