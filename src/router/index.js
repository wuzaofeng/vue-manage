import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import News from '@/views/News'

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
      path: '/news',
      name: 'News',
      component: News
    }
  ]
})
