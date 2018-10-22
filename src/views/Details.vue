<template>
  <div class="details" v-loading="loading">
    <div class="header">
      <div class="box">
        <div class="title-wrap">
          <div class="title">
            <span class="put_top" v-if="top">置顶</span>
            {{title}}
          </div>
          <div class="info">
            <span class="author">
              作者
              <img v-if="author.avatar_url" v-lazy="author.avatar_url" :alt="author.loginname">
              {{author.loginname}}
            </span>
            <span>发布于{{createAt}}</span>
            <span>{{visitcount}} 次浏览</span>
            <span>最后一次评论是{{lastReply}}</span>
            <span>来自{{filterTab}}</span>
          </div>
        </div>
        <div class="button" v-if="token">
          <el-button v-if="isAuthor" type="warning" plain @click="handleEdit()">编辑主题</el-button>
          <el-button v-if="!isCollect" type="primary" plain @click="collect()">收藏主题</el-button>
          <el-button v-if="isCollect" plain @click="delCollect()">取消收藏</el-button>
        </div>
      </div>
    </div>
    <div class="content" v-html="content" />
    <div class="replies">
      <div class="replies-count">回复{{replycount}}</div>
      <ul class="replies-content">
        <li class="item" v-for="(item, i) in replies" :key="item.id">
          <div class="replier">
            <img v-if="item.author.avatar_url"  v-lazy="item.author.avatar_url" :alt="item.author.loginname">
            {{item.author.loginname}}
            {{i+1}}楼
            <span class="time">{{ item.create_at | filterReplieTime }}</span>
          </div>
          <div class="replie-info" v-html="item.content" />
          <div class="button-wrap" v-if="token">
            <el-button size="small" v-if="item.author.loginname !== loginname" @click="handleUp(item.id)">{{item.is_uped ? '取消点赞' : '我要点赞'}}</el-button>
            <el-button size="small" @click="handleDialog(item.id, item.author.loginname)">评论</el-button>
          </div>
        </li>
      </ul>
    </div>
    <el-dialog
      title="评论主题"
      :visible.sync="dialogVisible"
      width="60%"
      center>
      <quill-editor ref="editor"
          v-model="replieContent"
          @change="onEditorChange($event)"
        >
      </quill-editor>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleReplies()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CNodeApi from '@/server/cnode/cnode-api'
import { formatMsgTime } from '@/assets/js/common'
import { mapState, mapActions } from 'vuex'
const tabs = [
  {value: 'all', label: '全部'},
  {value: 'ask', label: '分享'},
  {value: 'share', label: '问答'},
  {value: 'job', label: '招聘'},
  {value: 'good', label: '精华'}
]
export default {
  name: 'Details',
  filters: {
    filterReplieTime (time) {
      return formatMsgTime(time)
    }
  },
  data () {
    return {
      title: '',
      replies: [],
      tab: '',
      visitcount: 0,
      replycount: 0,
      author: {},
      content: '',
      createat: '',
      top: false,
      lastreply: '',
      loading: true,
      isCollect: false,
      id: '',
      isAuthor: false,
      dialogVisible: false,
      replieContent: '',
      replieParams: {}
    }
  },
  computed: {
    filterTab () {
      const tab = tabs.find(e => e.value === this.tab)
      return tab ? tab.label : 'cnode'
    },
    createAt () {
      return formatMsgTime(this.createat)
    },
    lastReply () {
      const time = new Date(this.lastreply)
      return `${time.getFullYear()}年${time.getMonth()}月${time.getDate()}日`
    },
    ...mapState({
      token: 'cnode_accessToken',
      loginname: 'cnode_loginname'
    })
  },
  mounted () {
    this.getDetails()
  },
  methods: {
    getDetails () {
      const { id } = this.$route.params
      const data = {
        mdrender: true,
        accesstoken: this.token
      }
      CNodeApi.getDetails({id, data}).then(res => {
        const { data: {
          title, replies, tab, visit_count: visitcount,
          reply_count: replycount, author, content, top, create_at: createat,
          last_reply_at: lastreply, is_collect: isCollect,
          id
        } } = res
        this.title = title
        this.replies = replies
        this.tab = tab
        this.visitcount = visitcount
        this.replycount = replycount
        this.author = author
        this.content = content
        this.top = top
        this.createat = createat
        this.lastreply = lastreply
        this.loading = false
        this.isCollect = isCollect
        this.id = id

        if (this.loginname === author.loginname && tab !== 'dev') {
          this.isAuthor = true
        }
      })
    },
    collect () {
      this.cnodeCollectAsync(this.id).then((res) => {
        this.isCollect = true
        this.$message({
          message: '收藏成功',
          type: 'success'
        })
      })
    },
    delCollect () {
      this.cnodeDelCollectAsync(this.id).then((res) => {
        this.isCollect = false
        this.$message('取消收藏')
      })
    },
    handleEdit () {
      const { id } = this.$route.params
      this.$router.push({name: 'Cnode-Add', params: { id }})
    },
    handleUp (id) {
      const data = {
        accesstoken: this.token
      }
      CNodeApi.reply({id, data}).then((res) => {
        this.getDetails()
      })
    },
    handleDialog (id, name) {
      this.replieContent = `@${name}` 
      const data = {
        accesstoken: this.token,
        reply_id: id,
        content: this.replieContent,
      }
      this.replieParams = data
      this.dialogVisible = true
    },
    handleReplies () {
      const data = {
        ...this.replieParams,
        content: this.replieContent,
      }
      CNodeApi.replies({id: this.id, data }).then((res) => {
        this.$message({
          type: 'success',
          message: '评论成功',
        })
        this.dialogVisible = false
        this.getDetails()
      })
    },
    onEditorChange ({ editor, html, text }) {
      this.replieContent = html
    },
    ...mapActions(['cnodeCollectAsync', 'cnodeDelCollectAsync'])
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/var';
.details {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: $white;
  border-radius: 5px;
  overflow-y: auto;
}

.header {
  position: relative;
  padding: 22px 35px;
  border-bottom: 1px solid $border-default;
  .box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .put_top {
    background: $put-top-bg;
    padding: 2px 4px;
    border-radius: 3px;
    color: $white;
    font-size: 12px;
  }
  .title-wrap {
    flex: 1;
  }
}
.title {
  font-size: 22px;
  font-weight: 700;
  margin: 8px 0;
  vertical-align: bottom;
}

.info {
  font-size: 12px;
  color: $color-minior;
  span {
    margin-right: 5px;
  }
  span:first-child::before {
    content: "";
  }
  span::before {
    content: "•";
  }
  img {
    width: 20px;
    height: 20px;
    border-radius: 5px;
    vertical-align: bottom;
  }
}

.content {
  padding: 12px 35px;
  border-bottom: 1px solid $border-default;
}
.replies {
  padding: 12px 35px;
}

.replies-count {
  margin-bottom: 10px;
}

.replies-content {
  .item {
    position: relative;
    list-style: none;
    padding-right: 20%;
  }
  .replier {
    font-size: 14px;
    color: $color-minior;
    img {
      width: 25px;
      height: 25px;
      border-radius: 5px;
      vertical-align: bottom;
      background: aliceblue;
    }
    .time {
      margin-left: 5px;
      font-size: 13px;
    }
    .time::before {
      content: "•";
      margin-right: 5px;
    }
  }
  .button-wrap {
    position: absolute;
    top: 30px;
    right: 0;
  }
}
.replie-info {
  font-size: 14px;
}
</style>
