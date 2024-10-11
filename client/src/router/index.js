import Vue from 'vue'
import Router from 'vue-router'

import UserIndex from '@/components/User/index'
import UserEdit from '@/components/User/EditUser'
import UserCreate from '@/components/User/CreateUser'
import UserShow from '@/components/User/ShowUser'
import Login from '@/components/Login'


import AgentIndex from '@/components/Agents/index'
import AgentCreate from '@/components/Agents/CreateAgent'
import AgentShow from '@/components/Agents/ShowAgent'
import AgentEdit from '@/components/Agents/EditAgent'

import WeaponIndex from '@/components/Weapons/index'
import WeaponCreate from '@/components/Weapons/CreateWeapon'
import WeaponEdit from '@/components/Weapons/EditWeapon'
import WeaponShow from '@/components/Weapons/ShowWeapon'

import Upload from '@/components/Util/Upload'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/agents',
      name: 'agents',
      component: AgentIndex
    },
    {
      path: '/agent/create',
      name: 'agent-create',
      component: AgentCreate
    },
    {
      path: '/agent/edit/:agentId',
      name: 'agent-edit',
      component: AgentEdit
    },
    {
      path: '/agent/:agentId',
      name: 'agent',
      component: AgentShow
    },
    {
      path: '/weapons',
      name: 'weapons',
      component: WeaponIndex
    },
    {
      path: '/weapon/create',
      name: 'weapon-create',
      component: WeaponCreate
    },
    {
      path: '/weapon/edit/:weaponId',
      name: 'weapon-edit',
      component: WeaponEdit
    },
    {
      path: '/weapon/:weaponId',
      name: 'weapon',
      component: WeaponShow
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
  ]
})
