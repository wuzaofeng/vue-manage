import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Cnode from '@/views/Cnode'
import CnodeDetails from '@/views/Details'
import CnodeAdd from '@/views/Add'
import CnodeInfo from '@/views/Info'
import CnodeMessage from '@/views/Message'
import Websocket from '@/views/Websocket'
import Tetris from '@/views/Tetris'
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
      path: '/cnode-details/:id',
      name: 'Cnode-Details',
      component: CnodeDetails
    },
    {
      path: '/cnode-add',
      name: 'Cnode-Add',
      component: CnodeAdd
    },
    {
      path: '/cnode-info/:username',
      name: 'Cnode-Info',
      component: CnodeInfo
    },
    {
      path: '/cnode-message',
      name: 'Cnode-Message',
      component: CnodeMessage
    },
    {
      path: '/websocket',
      name: 'Websocket',
      component: Websocket
    },
    {
      path: '/Tetris',
      name: 'Tetris',
      component: Tetris
    }
  ]
})
