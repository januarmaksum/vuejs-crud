import { createRouter, createWebHistory } from 'vue-router'
import { getDecodedToken, isAuthenticated, removeAuth } from '@/lib'
import { ROUTES } from '@/constants/routes'

const routes = [
  {
    path: ROUTES.HOME,
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: ROUTES.REGISTER,
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: ROUTES.DASHBOARD,
    component: () => import('@/components/layout/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('../views/DashboardView.vue'),
      },
      {
        path: ROUTES.USERS,
        name: 'users',
        component: () => import('../views/UsersView.vue'),
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: ROUTES.RESTRICTED,
    name: 'restricted',
    component: () => import('../views/RestrictedView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const checkTokenExpiration = () => {
  const token = isAuthenticated()
  if (!token) return

  try {
    const now = Math.floor(Date.now() / 1000)
    const decoded = getDecodedToken()
    const exp = decoded ? decoded.exp : null
    if (exp < now) {
      removeAuth()
      window.location.href = ROUTES.RESTRICTED
    }
  } catch (error) {
    console.error('Error decoding token:', error)
  }
}

setInterval(checkTokenExpiration, 30000)

router.beforeEach((to, from, next) => {
  const token = isAuthenticated()
  const decoded = getDecodedToken()
  const now = Math.floor(Date.now() / 1000)
  const isTokenExpired = decoded?.exp < now

  if (to.name === 'restricted' && token && !isTokenExpired) {
    next({ name: 'dashboard' })
  } else if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    next({ name: 'home' })
  } else if ((to.name === 'home' || to.name === 'register') && token) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
