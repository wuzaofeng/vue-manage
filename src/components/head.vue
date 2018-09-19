<template>
  <div id="head">
    <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
    >
      <el-menu-item index="1">
        <svg class="icon">
          <use xlink:href="#icon-contracts"></use>
        </svg>
      </el-menu-item>
      <el-menu-item index="2" disabled>消息中心</el-menu-item>
      <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="4">消息中心</el-menu-item>
      <el-menu-item index="5"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Head',
  data () {
    return {
      activeIndex: '1',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
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

</style>
