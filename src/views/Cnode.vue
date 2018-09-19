<template>
  <div class="cnode">
    <el-form :inline="true" :model="search" class="search">
      <el-form-item label="主题分类">
        <el-select
          v-model="search.tabValue"
          placeholder="请选择主题分类"
        >
          <el-option
            v-for="item in search.tab"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="显示页数">
        <el-select
          v-model="search.limitValue"
          placeholder="请选择主题分类"
        >
          <el-option
            v-for="item in search.limit"
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
    <el-table
      class="table"
      :data="tableData"
    >
      <el-table-column
        label="作者"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.author.avatar_url }}
          {{ scope.row.author.reply_count }}/{{scope.row.author.visit_count }}
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="400">
      </el-table-column>
      <el-table-column
        label="日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.create_at }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import CNodeApi from '@/server/cnode/cnode-api'
export default {
  name: 'Cnode',
  data () {
    return {
      search: {
        tab: [{
          value: 'all',
          label: '全部'
        }, {
          value: 'ask',
          label: '分享'
        }, {
          value: 'share',
          label: '问答'
        }, {
          value: 'job',
          label: '招聘'
        }, {
          value: 'good',
          label: '精华'
        }],
        tabValue: '',
        limit: [{
          value: '10',
          label: '10条/页'
        }, {
          value: '20',
          label: '20条/页'
        }, {
          value: '30',
          label: '30条/页'
        }],
        limitValue: ''
      },
      page: 1,
      tableData: []
    }
  },
  mounted () {
    this.getTopics()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    getTopics () {
      const { search: { tabValue, limitValue }, page } = this
      const params = {
        page,
        tab: tabValue,
        limit: limitValue,
        mdrender: false
      }
      CNodeApi.getTopics(params).then(res => {
        this.tableData = res.data
        console.log(res.data[0])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/var';
.cnode {
  background: $white;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
}
.search {
  padding-top: 22px;
  padding-left: 35px;
}
.table {
  margin: 0 20px;
  width: auto;
}
.pagination {
  text-align: center;
  padding: 10px;
}
</style>
