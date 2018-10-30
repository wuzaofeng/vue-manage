export const TOPICS = 'topics' // 主题模块
export const TOPIC = 'topic'
export const TOPICS_ADD = `${TOPICS}` // 新建主题
export const TOPICS_UPDATE = `${TOPICS}/update` // 编辑主题

const TOPICS_COLLECT = 'topic_collect' // 主题收藏模块
export const COLLECT_INFO = `${TOPICS_COLLECT}` // 用户所收藏的主题
export const COLLECT_ADD = `${TOPICS_COLLECT}/collect` // 收藏主题
export const COLLECT_DELETE = `${TOPICS_COLLECT}/de_collect` // 取消主题

// 评论模块
export const REPLY_ADD = TOPICS_ADD // 新建评论
export const REPLY_UPS = 'reply' // 为评论点赞

// 用户模块
export const USER_INFO = 'user' // 用户详情
export const ACCESS_TOKEN = 'accesstoken' // 验证 accessToken 的正确性

// 消息通知模块
export const MESSAGE_COUNT = 'message/count' // 获取未读消息数
export const MESSAGE_INFO = 'messages' // 获取已读和未读消息
export const MESSAGE_MARK_ALL = 'message/mark_all' // 获取已读和未读消息
export const MESSAGE_MARK = 'message/mark_one' // 标记单个消息为已读
