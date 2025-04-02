import { ROUTES } from '@/constants'

export const PATH = [
  {
    path: ROUTES.HOME.path,
    name: ROUTES.HOME.name,
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: ROUTES.REGISTER.path,
    name: ROUTES.REGISTER.name,
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: ROUTES.DASHBOARD.path,
    component: () => import('@/components/layout/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: ROUTES.DASHBOARD.name,
        component: () => import('../views/DashboardView.vue'),
      },
      {
        path: ROUTES.USER.INDEX.path,
        name: ROUTES.USER.INDEX.name,
        component: () => import('../views/admin/user/UserView.vue'),
      },
      {
        path: ROUTES.USER.CREATE.path,
        name: ROUTES.USER.CREATE.name,
        component: () => import('../views/admin/user/UserCreateView.vue'),
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: ROUTES.RESTRICTED.path,
    name: ROUTES.RESTRICTED.name,
    component: () => import('../views/RestrictedView.vue'),
  },
  {
    path: ROUTES.UNAUTHORIZED.path,
    name: ROUTES.UNAUTHORIZED.name,
    component: () => import('../views/UnauthorizedView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: ROUTES.NOT_FOUND.name,
    component: () => import('../views/NotFoundView.vue'),
  },
]
