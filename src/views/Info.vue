<template>
  <div class="info-wrapper" v-loading="loading">
    <div class="user">
      <img v-lazy="avatarurl" :alt="loginname">
      <div class="text">
        <span>{{loginname}}</span>
        <span>github {{githubUsername}}</span> 
        <span>{{score}} 积分</span>
        <span>注册于 {{creatTime}}</span>
      </div>
    </div>
    <div class="table-wrap">
      <el-table
        class="table"
        :data="replies"
        border
      >
        <el-table-column
          label="作者"
          width="180">
          <template slot-scope="scope">
            <router-link class="box" :to="{ name: 'Cnode-Info', params: { username: scope.row.author.loginname }}">
              <img class="img" :src="scope.row.author.avatar_url" :alt="scope.row.author.loginname">
              <div class="info">
                <p class="username">{{scope.row.author.loginname}}</p>
                <span class="counts">
                  <i class="replies">{{ scope.row.reply_count }}</i>
                  <i class="seperator">/</i>
                  <i class="visits">{{scope.row.visit_count }}</i>
                </span>
              </div>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
          <template slot-scope="scope">
            <router-link :to="{name: 'Cnode-Details', params: { id: scope.row.id }}">
              <div :title="scope.row.title" class="title">
                <span v-if="scope.row.top" class="put_top">置顶</span>
                <span v-else class="topiclist_tab">
                  {{scope.row.tab | tab}}
                </span>
                {{scope.row.title}}
              </div>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="创建日期"
          width="200"
          >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.create_at | create_at }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="回复时间"
          width="200"
          >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.last_reply_at | last_reply }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              plain
              @click="handleDetails(scope.$index, scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import CNodeApi from '@/server/cnode/cnode-api'
import { formatMsgTime } from '@/assets/js/common'
const tabs = [
  {value: 'ask', label: '分享'},
  {value: 'share', label: '问答'},
  {value: 'job', label: '招聘'},
  {value: 'dev', label: '测试'}
]
export default {
  name: 'Info',
  computed: {
    creatTime () {
      return formatMsgTime(this.createat)
    }
  },
  filters: {
    create_at (value) {
      const time = new Date(value || '')
      return time && `${time.getFullYear()}年${time.getMonth()}月${time.getDate()}日`
    },
    last_reply (dateTime) {
      return formatMsgTime(dateTime)
    },
    tab (value) {
      const tab = tabs.find(e => e.value === value)
      return tab ? tab.label : 'cnode'
    }
  },
  data () {
    return {
      loading: false,
      createat: '',
      avatarurl: '',
      githubUsername: '',
      loginname: '',
      replies: [],
      topics: [],
      score: 0
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      const { username } = this.$route.params
      CNodeApi.userInfo(username).then((res) => {
        const { avatar_url: avatarurl, create_at: createat, githubUsername, loginname, recent_replies: replies, recent_topics: topics, score } = res.data
        this.avatarurl = avatarurl
        this.createat = createat
        this.githubUsername = githubUsername
        this.loginname = loginname
        this.replies = replies
        this.topics = topics
        this.score = score
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/var';
.info-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: $white;
  border-radius: 5px;
  overflow-y: auto;
  padding: 22px 45px 22px 22px;
  box-sizing: border-box;
  overflow-y: auto;
}
.user {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    border-radius: 50%;
    margin-bottom: 5px;
    width: 120px;
    height: 120px;
  }

  span {
    font-size: 12px;
    color: $color-minior;
  }
  span::before {
    content: "\2022";
  }
}
</style>
