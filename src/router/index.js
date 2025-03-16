import { createRouter, createWebHistory } from 'vue-router'
import Cookie from 'js-cookie'

const isAuthenticated = () => Cookie.get('token')

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('@/components/layout/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('../views/DashboardView.vue'),
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('../views/UsersView.vue'),
      },
    ],
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = isAuthenticated()

  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    next({ name: 'home' })
  } else if ((to.name === 'home' || to.name === 'register') && token) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
