import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/index',
    component: () => import('@/views/Home'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/type',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'type',
        component: () => import('@/views/back/typelist'),
        meta: { title: '客房类型', icon: 'form' }
      }
    ]
  },
  {
    path: '/room',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'RoomList',
        component: () => import('@/views/back/roomlist'),
        meta: { title: '客房信息', icon: 'form' }
      }
    ]
  },
  {
    path: '/staff',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'OperatorList',
        component: () => import('@/views/back/manager'),
        meta: { title: '员工账号', icon: 'form' }
      }
    ]
  },
  {
    path: '/bookcommit',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'BookCommit',
        component: () => import('@/views/front/book'),
        meta: { title: '预定操作', icon: 'form' }
      }
    ]
  },
  {
    path: '/check',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Check',
        component: () => import('@/views/front/checkIn'),
        meta: { title: '入住登记', icon: 'form' }
      }
    ]
  },
  {
    path: '/checklist',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Check',
        component: () => import('@/views/back/checklist'),
        meta: { title: '入住列表', icon: 'form' }
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'customer',
        component: () => import('@/views/front/customer'),
        meta: { title: '客户管理', icon: 'el-icon-user-solid' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'order',
        component: () => import('@/views/front/order'),
        meta: { title: '账单管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/discount',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'discount',
        component: () => import('@/views/back/discount'),
        meta: { title: '折扣管理', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
