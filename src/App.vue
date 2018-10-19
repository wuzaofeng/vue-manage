<template>
  <div id="app">
    <el-container class="container">
      <el-aside class="aside" :width="asideWidth">
        <Side />
      </el-aside>
      <el-container class="container">
        <el-header class="header">
          <Head />
        </el-header>
        <el-main class="main-wrap">
          <div class="main">
            <router-view
              keep-alive
              transition="fade"
              transition-mode='out-in'
            />
          </div>
        </el-main>
        <el-footer class="footer">
          <Foot />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Head from '@/components/head'
import Side from '@/components/side'
import Foot from '@/components/foot'

export default {
  data () {
    return {}
  },
  computed: {
    asideWidth () {
      return this.isCollapse ? '65px' : '250px'
    },
    ...mapState(['isCollapse'])
  },
  components: {
    Head,
    Side,
    Foot
  }
}
</script>

<style lang="scss">
@import './scss/main';
@import './scss/var';
.container {
  min-width: $min-width;
}
.aside {
  transition: all .3s;
}
</style>
