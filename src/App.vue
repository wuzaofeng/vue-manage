<template>
  <div id="app">
    <el-container>
    <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>
          <head />
          </el-header>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container> 
  </div>
  
</template>

<script>
import Head from "@/components/head/head";
export default {
  data() {
    return {};
  },
  components: {
    Head
  }
};
</script>

<style lang="sass">
  @import './scss/main'
</style>
