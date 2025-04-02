import { createRouter, createWebHistory } from 'vue-router'
import { checkTokenExpiration, getDecodedToken, getToken } from '@/lib'
import { ROUTES } from '@/constants'
import { PATH } from './path'

const router = createRouter({
  history: createWebHistory(),
  routes: PATH,
})

setInterval(checkTokenExpiration, 30000)

router.beforeEach((to, from, next) => {
  const token = getToken()
  const decoded = getDecodedToken()
  const now = Math.floor(Date.now() / 1000)
  const isTokenExpired = decoded?.exp < now

  if (to.name === ROUTES.RESTRICTED.name && token && !isTokenExpired) {
    next({ name: ROUTES.DASHBOARD.name })
  } else if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    next({ name: ROUTES.HOME.name })
  } else if ((to.name === ROUTES.HOME.name || to.name === ROUTES.REGISTER.name) && token) {
    next({ name: ROUTES.DASHBOARD.name })
  } else {
    next()
  }
})

export default router
