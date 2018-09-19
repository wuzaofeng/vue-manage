<template>
  <div id="app">
    <el-container class="container">
      <el-aside width="250px">
        <Side />
      </el-aside>
      <el-container>
        <el-header class="header">
          <Head />
        </el-header>
        <Tabs />
        <el-main class="main">
          <router-view />
        </el-main>
        <el-footer class="footer">
          <Foot />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Head from '@/components/head'
import Side from '@/components/side'
import Foot from '@/components/foot'
import Tabs from '@/components/tabs'
export default {
  data () {
    return {}
  },
  components: {
    Head,
    Side,
    Foot,
    Tabs
  }
}
</script>

<style lang="scss">
  @import './scss/main';
</style>
