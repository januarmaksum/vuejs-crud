export const ROUTES = {
  HOME: {
    label: 'Home',
    name: 'home',
    path: '/',
  },
  REGISTER: {
    label: 'Register',
    name: 'register',
    path: '/register',
  },
  DASHBOARD: {
    label: 'Dashboard',
    name: 'dashboard',
    path: '/dashboard',
  },
  USER: {
    INDEX: {
      label: 'Users',
      name: 'users',
      path: '/user',
    },
    CREATE: {
      label: 'Buat User',
      name: 'create-user',
      path: '/user/create',
    },
    EDIT: {
      label: 'Edit User',
      name: 'edit-user',
      path: '/user/edit/:id',
    },
  },
  RESTRICTED: {
    label: 'Restricted',
    name: 'restricted',
    path: '/restricted',
  },
  UNAUTHORIZED: {
    label: 'Unauthorized',
    name: 'unauthorized',
    path: '/unauthorized',
  },
  NOT_FOUND: {
    label: 'Not Found',
    name: 'not-found',
    path: '/not-found',
  },
}
