<template>
  <div id="head">
    <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
    >
      <el-menu-item index="collapse">
        <svg class="icon">
          <use :xlink:href="isCollapse ? '#icon-spread' : '#icon-contracts'"></use>
        </svg>
      </el-menu-item>
      <el-menu-item index="2"><a class="link" href="https://cn.vuejs.org/" target="_blank">Vue</a></el-menu-item>
      <el-menu-item index="3"><a class="link" href="https://vuex.vuejs.org/zh/guide/" target="_blank">VueX</a></el-menu-item>
      <el-menu-item index="4"><a class="link" href="https://router.vuejs.org/zh/" target="_blank">vue-router</a></el-menu-item>
      <el-menu-item index="5"><a class="link" href="http://element-cn.eleme.io/#/zh-CN" target="_blank">element UI</a></el-menu-item>
       <el-menu-item index="8"><a class="link" href="https://cnodejs.org/api" target="_blank">Cnode</a></el-menu-item>
    </el-menu>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-submenu index="language">
        <template slot="title">{{activeLanguage.text}}</template>
        <el-menu-item
          v-for="item in language"
          :key="item.key"
          :index="item.key"
        >{{item.text}}
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="7">
        <el-color-picker v-model="defaultColor"></el-color-picker>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { TOOGLE_NAV } from './../store/mutations-types'
export default {
  name: 'Head',
  data () {
    return {
      activeIndex: '1',
      defaultColor: '#409EFF',
      activeLanguage: {
        text: '中文',
        key: '6-1'
      },
      language: [{
        text: '中文',
        key: '6-1'
      }, {
        text: 'English',
        key: '6-2'
      }]
    }
  },
  computed: {
    ...mapState(['isCollapse'])
  },
  methods: {
    handleSelect (key, keyPath) {
      // 标识6 语言
      if (keyPath[0] === '6') {
        const activeLanguage = this.language.find(e => {
          if (e.key === keyPath[1]) {
            return e.text
          }
        })
        this.activeLanguage = activeLanguage
      }

      if (keyPath[0] === 'collapse') {
        this[TOOGLE_NAV]()
      }
    },
    ...mapMutations([ TOOGLE_NAV ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/var';
#head {
  position: relative;
  background: $white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: $head-border-color;
  }
  .el-menu {
    border-bottom: 0;

    & > .el-menu-item {
      &.is-active {
        border-bottom: 0;
      }
    }
  }
}

.link {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
