<template>
  <div class="side">
    <div class="brand">
      <span>vueManage Pro</span>
    </div>
    <el-menu
      :default-active="currentTab"
      class="side-menu"
      @select="handleSelect"
      :collapse="isCollapse"
      >
      <el-menu-item index="1">
        <svg class="icon">
          <use xlink:href="#icon-home"></use>
        </svg>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-location"></i>
        <span slot="title">新闻头条</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-location"></i>
        <span slot="title">天气预报</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { ADD_TABS, SET_CURRENTTAB } from '@/store/mutations-types'
const navs = window.NAVS // 获取navs
export default {
  name: 'Side',
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    ...mapState([
      'currentTab'
    ])
  },
  mounted () {
  },
  methods: {
    ...mapMutations([ADD_TABS, SET_CURRENTTAB]),
    handleSelect (key) {
      const currentTab = navs.filter(item => item.index === key)[0]
      this[ADD_TABS](currentTab)
      this[SET_CURRENTTAB](key)
      this.$router.push(currentTab.path)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/var';

.side {
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: $white;
}

.brand {
  height: 60px;
  display: flex;
  align-items: center;
  justify-items: center;
  text-align: center;
  border-right: 1px solid $side-border-color;
  span {
    display: block;
    flex: 1;
    color: $color-primary;
    font-weight: 300;
    font-size: $font-size20;
  }
}

.side-menu {
  flex: 1;
}

.icon {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: $font-size18;
}
</style>
