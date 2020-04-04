import Vue from 'vue'
import Router from 'vue-router'
import adminIndex from '@/components/adminIndex'
import Login from '@/components/login'
import staffLogin from '@/components/staffLogin'
import staffIndex from '@/components/staffIndex'
import test from '@/components/test'
Vue.use(Router)
const router = new Router({
  routes: [{
      path: '/adminIndex',
      name: 'adminIndex',
      component: adminIndex,
      beforeEnter: (to, from, next) => {
        if (sessionStorage.getItem('userToken')) {
          next()
        } else {
          next('/login')
        }
      },
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (sessionStorage.getItem('userToken')) {
          next('/adminIndex')
        } else if (sessionStorage.getItem('staffToken')) {
          next('/staffIndex')
        } else {
          next()
        }
      },
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/staffLogin',
      name: 'staffLogin',
      component: staffLogin,
      //   beforeEnter: (to, from, next) => {
      //     if (sessionStorage.getItem('userToken')) {
      //       next('/adminIndex')
      //     } else if (sessionStorage.getItem('staffToken')) {
      //       next('/staffIndex')
      //     } else {
      //       next()
      //     }
      //   },
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/staffIndex',
      name: 'staffIndex',
      component: staffIndex
    },
    {
      path: '/',
      redirect: '/adminIndex'
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
  ]
})




export default router
