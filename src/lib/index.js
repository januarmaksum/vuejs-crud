import Cookie from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export const setAuth = (token, user) => {
  Cookie.set('token', token)
  Cookie.set('user', JSON.stringify(user))
}

export const isAuthenticated = () => Cookie.get('token')

export const removeAuth = () => {
  Cookie.remove('token')
  Cookie.remove('user')
}

export const getDecodedToken = () => {
  const token = isAuthenticated()
  if (!token) return null

  try {
    return jwtDecode(token)
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}
