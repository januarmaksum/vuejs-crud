import Cookie from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
dayjs.locale('id')

export const setAuth = (token, user) => {
  Cookie.set('token', token)
  Cookie.set('user', JSON.stringify(user))
}

export const removeAuth = () => {
  Cookie.remove('token')
  Cookie.remove('user')
}

export const getToken = () => Cookie.get('token')

export const isAuthenticated = () => {
  const token = getToken()
  if (!token) return false

  try {
    const decoded = jwtDecode(token)
    const now = Math.floor(Date.now() / 1000)
    if (decoded.exp && decoded.exp < now) {
      removeAuth()
      return false
    }
    return true
  } catch (error) {
    console.error('Error decoding token:', error)
    return false
  }
}

export const getDecodedToken = () => {
  const token = getToken()
  if (!token) return null

  try {
    return jwtDecode(token)
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

export const getUserFromCookie = () => {
  const user = Cookie.get('user')
  if (!user) return null

  try {
    return JSON.parse(user)
  } catch (error) {
    console.error('Error parsing user JSON:', error)
    return null
  }
}

export const formatDate = (dateString, type) => {
  if (!dayjs(dateString).isValid()) {
    return 'Invalid date'
  }

  switch (type) {
    case 'fullDate':
      return dayjs(dateString).format('D MMMM YYYY HH.mm') + ' WIB'
    case 'date':
      return dayjs(dateString).format('D MMMM YYYY')
    case 'time':
      return dayjs(dateString).format('HH.mm') + ' WIB'
    default:
      return '-'
  }
}
