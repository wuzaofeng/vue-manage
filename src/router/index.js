import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Cnode from '@/views/Cnode'
import CnodeDetails from '@/views/Details'
import CnodeAdd from '@/views/Add'
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
      path: '/cnode-list',
      name: 'Cnode',
      component: Cnode
    },
    {
      path: '/cnode-details',
      name: 'Cnode-Details',
      component: CnodeDetails
    },
    {
      path: '/cnode-add',
      name: 'Cnode-Add',
      component: CnodeAdd
    }
  ]
})
