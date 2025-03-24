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
    update: '/api/admin/users',
    delete: '/api/admin/users',
    detail: (id) => `/api/admin/users/${id}`,
  },
}
