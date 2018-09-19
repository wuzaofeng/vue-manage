import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Cnode from '@/views/Cnode'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/cnode',
      name: 'Cnode',
      component: Cnode
    }
  ]
})
