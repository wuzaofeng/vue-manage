<template>
  <div class="cnode" v-loading="loading">
    <el-form :inline="true" :model="search" class="search">
      <el-form-item label="主题分类">
        <el-select
          v-model="search.tabValue"
          placeholder="请选择主题分类"
        >
          <el-option
            v-for="item in search.tabs"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="显示页数">
        <el-select
          v-model="search.limitValue"
          placeholder="请选择显示页数"
        >
          <el-option
            v-for="item in search.limits"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="table-wrap">
      <el-table
        class="table"
        :data="tableData"
        border
        height="100%"
      >
        <el-table-column
          label="作者"
          width="180">
          <template slot-scope="scope">
            <div class="box">
              <img class="img" :src="scope.row.author.avatar_url" :alt="scope.row.author.loginname">
              <div class="info">
                <p class="username">{{scope.row.author.loginname}}</p>
                <span class="counts">
                  <i class="replies">{{ scope.row.reply_count }}</i>
                  <i class="seperator">/</i>
                  <i class="visits">{{scope.row.visit_count }}</i>
                </span>
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
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        @current-change="changeHandle"
        :total="50">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import CNodeApi from '@/server/cnode/cnode-api'
import { formatMsgTime } from '@/assets/js/common'
const tabs = [
  {value: 'all', label: '全部'},
  {value: 'ask', label: '分享'},
  {value: 'share', label: '问答'},
  {value: 'job', label: '招聘'},
  {value: 'good', label: '精华'}
]
const limits = [
  {value: '10', label: '10条/页'},
  {value: '20', label: '20条/页'},
  {value: '30', label: '30条/页'}
]
export default {
  name: 'Cnode',
  filters: {
    create_at (value) {
      const time = new Date(value)
      return `${time.getFullYear()}年${time.getMonth()}月${time.getDate()}日`
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
      search: {
        tabs,
        tabValue: '',
        limits,
        limitValue: ''
      },
      page: 1,
      tableData: [],
      loading: true
    }
  },
  mounted () {
    this.getTopics()
  },
  methods: {
    onSubmit () {
      this.getTopics()
    },
    changeHandle (page) {
      this.page = page
      this.getTopics()
    },
    handleDetails (index, row) {
      const { id } = row
      this.$router.push({name: 'Cnode-Details', query: { id }})
    },
    getTopics () {
      const { search: { tabValue, limitValue }, page } = this
      const params = {
        page,
        tab: tabValue,
        limit: limitValue,
        mdrender: false
      }
      this.loading = true
      CNodeApi.getTopics(params).then(res => {
        this.tableData = res.data
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/var';
.cnode {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: $white;
  border-radius: 5px;
}
.search {
  padding-top: 22px;
  padding-left: 35px;
}
.table-wrap {
  flex: 1;
  margin: 0 20px;
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

.put_top {
  background: $put-top-bg;
  padding: 2px 4px;
  border-radius: 3px;
  color: $white;
  font-size: 12px;
}
.topiclist_tab {
  background-color: $topiclist-tab-bg;
  color: $color-minior;
  padding: 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  text-align: center;
  margin-right: 4px;
}
</style>
