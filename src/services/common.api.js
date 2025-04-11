export const ENDPOINT = {
  auth: {
    login: '/api/login',
  },
  register: {
    create: '/api/register',
  },
  user: {
    list: '/api/admin/users',
    create: '/api/admin/users',
    delete: (id) => `/api/admin/users/${id}`,
    update: (id) => `/api/admin/users/${id}`,
    detail: (id) => `/api/admin/users/${id}`,
  },
}
