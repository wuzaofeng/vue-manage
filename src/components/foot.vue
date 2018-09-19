<template>
<div class="foot">
  ©2018&nbsp;Baidu&nbsp;
  <a href="http://www.baidu.com/duty/">
  使用百度前必读</a>&nbsp;
  &nbsp;京ICP证030173号&nbsp;
</div>
</template>

<script>
export default {
  name: 'Foot'
}
</script>

<style lang="scss" scoped>
@import '../scss/var';
.foot {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-seize;
  font-size: $font-size12;
  a {
    color: $color-primary;
  }
}
</style>
