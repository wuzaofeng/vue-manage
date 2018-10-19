<template>
  <div class="side">
    <div class="brand">
      <span v-if="!isCollapse">
        <svg class="icon">
          <use xlink:href="#icon-logo"></use>
        </svg>
        vueManage Pro
      </span>
      <svg v-else class="icon">
        <use xlink:href="#icon-logo"></use>
      </svg>
    </div>
    <el-menu
      :default-active="activeIndex"
      class="side-menu"
      @select="handleSelect"
      :collapse="isCollapse"
      >
      <el-menu-item index="home">
        <svg class="icon">
          <use xlink:href="#icon-home"></use>
        </svg>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-submenu index="cnode">
        <template slot="title">
        <svg class="icon">
          <use xlink:href="#icon-cnode"></use>
        </svg>
        <span slot="title">Cnode</span>
        </template>
        <el-menu-item-group>
          <el-menu-item class="item" index="cnode-login" v-if="!cnode_login">登录cnode</el-menu-item>
          <el-menu-item class="item" index="cnode-list">主题列表</el-menu-item>
          <el-menu-item class="item" index="cnode-add">新建主题</el-menu-item>
          <el-menu-item class="item" index="cnode-exit" v-if="cnode_login">退出登录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { CNODE_EXIT } from './../store/mutations-types'
const ROUTERS = [{
  name: 'Home',
  index: 'home'
}, {
  name: 'Cnode',
  index: 'cnode-list'
}, {
  name: 'Cnode-Add',
  index: 'cnode-add'
}]
export default {
  name: 'Side',
  data () {
    return {
      activeIndex: 'home'
    }
  },
  computed: {
    ...mapState(['isCollapse', 'cnode_login'])
  },
  mounted () {
    fetch('https://cnodejs.org/api/v1/accesstoken', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accesstoken: '7d1c022b-3b91-4c4c-9994-7d17b3efc967'
      })
    })
  },
  methods: {
    handleSelect (index, indexPath) {
      const path = indexPath[indexPath.length - 1]
      const router = ROUTERS.find(e => {
        return e.index === path
      })
      if (router) {
        const { name } = router
        this.$router.push({ name })
      }

      if (path === 'cnode-login') {
        this.loginCnode()
      }

      if (path === 'cnode-exit') {
        this[CNODE_EXIT]()
      }
    },
    loginCnode () {
      this.$prompt('请输入Access Token', '登录cnode', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '请输入Access Token',
        inputValue: '7d1c022b-3b91-4c4c-9994-7d17b3efc967'
      }).then(({ value: accesstoken }) => {
        this.cnodeLogin(accesstoken)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消cnode登录',
          showClose: true
        })
      })
    },
    cnodeLogin (accesstoken) {
      this.cnodeLoginAsync(accesstoken).then(() => {
        this.$message({
          type: 'info',
          message: '登录成功',
          showClose: true
        })
      }).catch(({data: {error_msg: err}}) => {
        this.$message({
          type: 'error',
          message: err,
          showClose: true
        })
      })
    },
    ...mapActions([
      'cnodeLoginAsync'
    ]),
    ...mapMutations([
      CNODE_EXIT
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/var';

.side {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: $white;
  border-right: 1px solid $side-border-color;
}

.brand {
  height: 60px;
  display: flex;
  align-items: center;
  justify-items: center;
  text-align: center;
  span {
    display: block;
    flex: 1;
    color: $color-primary;
    font-weight: 300;
    font-size: $font-size20;
  }
  .icon {
    width: 30px;
    height: 30px;
    margin: auto;
    color: $color-primary;
  }
}
.side-menu {
  flex: 1;
  border-right: 0;
}

.icon {
  vertical-align: middle;
  margin-right: 10px;
  width: 25px;
  height: 25px;
  text-align: center;
  font-size: $font-size18;
}
.item {
  text-indent: 15px;
}
</style>
