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
    <div style="margin-bottom: 20px">
      <el-card class="box-card" :body-style="{ maxHeight: '390px', overflow: 'auto' }">
        <div slot="header" class="clearfix">
          <span>最近创建的主题</span>
        </div>
        <div class="text item">
          <div class="table-wrap">
            <el-table
              class="table"
              :data="topics"
              border
            >
              <el-table-column
                label="作者"
                width="180">
                <template slot-scope="scope">
                  <div class="box">
                    <img class="img" :src="scope.row.author.avatar_url" :alt="scope.row.author.loginname">
                    <div class="info">
                      <p class="username">{{scope.row.author.loginname}}</p>
                    </div>
                  </div>
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
      </el-card>
    </div>
    <div style="margin-bottom: 20px">
      <el-card class="box-card" :body-style="{ maxHeight: '390px', overflow: 'auto' }">
        <div slot="header" class="clearfix">
          <span>最近收藏的主题</span>
        </div>
        <div class="text item">
          <div class="table-wrap">
            <el-table
              class="table"
              :data="collects"
              border
            >
              <el-table-column
                label="作者"
                width="180">
                <template slot-scope="scope">
                  <div class="box">
                    <img class="img" :src="scope.row.author.avatar_url" :alt="scope.row.author.loginname">
                    <div class="info">
                      <p class="username">{{scope.row.author.loginname}}</p>
                    </div>
                  </div>
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
      </el-card>
    </div>
    <el-card class="box-card" :body-style="{ maxHeight: '390px', overflow: 'auto' }">
      <div slot="header" class="clearfix">
        <span>最近参与的主题</span>
      </div>
      <div class="text item">
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
                <div class="box">
                  <img class="img" :src="scope.row.author.avatar_url" :alt="scope.row.author.loginname">
                  <div class="info">
                    <p class="username">{{scope.row.author.loginname}}</p>
                  </div>
                </div>
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
    </el-card>
  </div>
</template>

<script>
import CNodeApi from '@/server/cnode/cnode-api'
import { formatMsgTime } from '@/assets/js/common'
import { mapState } from 'vuex'
const tabs = [
  {value: 'ask', label: '问答'},
  {value: 'share', label: '分享'},
  {value: 'job', label: '招聘'},
  {value: 'dev', label: '测试'}
]
export default {
  name: 'Info',
  computed: {
    creatTime () {
      return formatMsgTime(this.createat)
    },
    ...mapState(['cnode_loginname'])
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
  watch: {
    $route () {
      this.getUserInfo()
    }
  },
  data () {
    return {
      loading: true,
      createat: '',
      avatarurl: '',
      githubUsername: '',
      loginname: '',
      replies: [],
      topics: [],
      score: 0,
      collects: []
    }
  },
  mounted () {
    this.getUserInfo()
    this.getCollects()
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
        this.loading = false
      })
    },
    getCollects () {
      const { username } = this.$route.params
      CNodeApi.getCollects(username).then((res) => {
        this.collects = res.data
      })
    },
    handleDetails (index, row) {
      const { id } = row
      this.$router.push({name: 'Cnode-Details', params: { id }})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/var';
.info-wrapper {
  height: 100%;
  background: $white;
  border-radius: 5px;
  overflow-y: auto;
  padding: 22px;
  box-sizing: border-box;
}
.user {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
  height: 150px;

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
.table-wrap {
  flex: 1;
}
.table {
  width: 100%;
}
.pagination {
  text-align: center;
  padding: 10px;
}

.box {
  display: flex;
  align-items: center;
}
.img {
  width: 45px;
  height: 45px;
  border-radius: 3px;
  margin-right: 10px;
}
.info {
  flex: 1;
  .username {
    color: $color-nomal;
  }
}
.title {
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #606266;
}
.counts {
  text-align: center;

  .replies {
    color: $color-primary;
    font-style: normal;
  }
  .seperator {
    margin: 0 -3px;
    font-size: 10px;
    font-style: normal;
  }
  .visits {
    font-size: 10px;
    color: $color-minior;
    font-style: normal;
  }
}

</style>
