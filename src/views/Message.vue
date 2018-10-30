<template>
  <div class="message-wrapper" v-loading="loading">
    <div style="margin-bottom: 20px">
      <el-card class="box-card" :body-style="{ maxHeight: '390px', overflow: 'auto' }">
        <div slot="header" class="clearfix">
          <span>最近未读消息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="allUps()">全部标记已读</el-button>
        </div>
        <div class="text item">
          <div class="table-wrap">
            <el-table
              class="table"
              :data="hasnotread"
              border
            >
              <el-table-column
                label="回复者"
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
                  <router-link :to="{name: 'Cnode-Details', params: { id: scope.row.topic.id }}">
                    <div :title="scope.row.title" class="title">
                      {{scope.row.topic.title}}
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
                  <span>{{ scope.row.topic.last_reply_at | last_reply }}</span>
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
                  <el-button
                    size="mini"
                    plain
                    v-if="!scope.row.has_read"
                    @click="handleRead(scope.row.id)">设置已读</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>
    </div>
    <el-card class="box-card" :body-style="{ maxHeight: '390px', overflow: 'auto' }">
      <div slot="header" class="clearfix">
        <span>最近已读消息</span>
      </div>
      <div class="text item">
        <div class="table-wrap">
          <el-table
            class="table"
            :data="hasread"
            border
          >
            <el-table-column
              label="回复者"
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
                <router-link :to="{name: 'Cnode-Details', params: { id: scope.row.topic.id }}">
                  <div :title="scope.row.title" class="title">
                    {{scope.row.topic.title}}
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
                <span>{{ scope.row.topic.last_reply_at | last_reply }}</span>
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
import { mapState, mapActions } from 'vuex'
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
    ...mapState({ token: 'cnode_accessToken' })
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
      loading: true,
      hasread: [],
      hasnotread: []
    }
  },
  mounted () {
    this.getMessage()
  },
  methods: {
    getMessage () {
      const params = {
        accesstoken: this.token,
        mdrender: false
      }
      CNodeApi.message(params).then((res) => {
        const { has_read_messages: hasread, hasnot_read_messages: hasnotread } = res.data
        this.hasread = hasread
        this.hasnotread = hasnotread
        this.loading = false
      })
    },
    handleDetails (index, row) {
      const { id } = row.topic
      this.$router.push({name: 'Cnode-Details', params: { id }})
    },
    allUps () {
      const data = {
        accesstoken: this.token
      }
      CNodeApi.markAll(data).then((res) => {
        this.$message('标记全部已读')
        this.getMessage()
        this.cnodeGetMarkAsync()
      })
    },
    handleRead (id) {
      const data = {
        accesstoken: this.token
      }
      CNodeApi.markOne({id, data}).then((res) => {
        this.$message('标记已读')
        this.getMessage()
        this.cnodeGetMarkAsync()
      })
    },
    ...mapActions([
      'cnodeGetMarkAsync'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/var';
.message-wrapper {
  height: 100%;
  background: $white;
  border-radius: 5px;
  overflow-y: auto;
  padding: 22px;
  box-sizing: border-box;
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
