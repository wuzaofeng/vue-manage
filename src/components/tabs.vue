<template>
  <div id="tabs">
    <el-tabs
    v-model="current"
    type="card"
    closable
    @tab-click="handleClick"
    @tab-remove="handleRemove"
    >
      <el-tab-pane
        v-for="(item) in tabs"
        :key="item.index"
        :label="item.title"
        :name="item.index"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { DELETE_TABS, SET_CURRENTTAB } from '@/store/mutations-types'
const navs = window.NAVS // 获取navs
export default {
  name: 'Tabs',
  data () {
    return {
      current: '1'
    }
  },
  watch: {
    currentTab: function (newValue, oldValue) {
      const currentTab = navs.filter(item => item.index === newValue)[0]
      this.current = newValue
      this.$router.push(currentTab.path)
    }
  },
  computed: {
    ...mapState([
      'tabs',
      'currentTab'
    ])
  },
  methods: {
    ...mapMutations([
      DELETE_TABS,
      SET_CURRENTTAB
    ]),
    handleClick (tab) {
      const currentTab = navs.filter(item => item.index === tab.name)[0]
      this[SET_CURRENTTAB](currentTab.index)
      this.$router.push(currentTab.path)
    },
    handleRemove (name) {
      const currentTab = navs.filter(item => item.index === name)[0]
      this[DELETE_TABS](currentTab.index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/var';
$shadow: rgba(0,0,0,.1);
#tabs {
  background: $white;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
}
</style>

<style lang="scss">
@import '../scss/var';
#tabs .el-tabs__header {
  margin-bottom: 0;

  .el-tabs__nav {
    border: 0;
  }

  .el-tabs__item {
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
}

#tabs .el-tabs__item {
  &:first-child .el-icon-close {
    display: none;
  }
  &::after {
    transition: all ease .3s;
    width: 0;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    background-color: $color-primary;
  }
}

#tabs .el-tabs__item.is-active {
  position: relative;
  &::after {
    width: 100%;
  }
}
</style>
