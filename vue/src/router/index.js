import Vue from 'vue'
import Router from 'vue-router'
import adminIndex from '@/components/adminIndex'
import Login from '@/components/login'
import Test from '@/components/test'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/adminIndex',
      name: 'adminIndex',
      component: adminIndex,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})
