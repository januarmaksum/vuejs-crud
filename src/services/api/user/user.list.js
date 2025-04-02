import { ROUTES } from '@/constants'
import { getToken } from '@/lib'
import API from '@/services/axios'
import { ENDPOINT } from '@/services/common.api'
import { useRouter } from 'vue-router'

const identity = '[api/admin.users]'

export async function APIS_UserList() {
  const router = useRouter()
  const token = getToken()
  if (!token) {
    router.push(ROUTES.UNAUTHORIZED.path)
    return
  }

  const endpoint = ENDPOINT.user.list
  const result = await API.get(endpoint)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`${identity} Error:`, error)
      throw error
    })

  if (!result.success)
    return {
      data: [],
      success: false,
      message: result.message,
    }

  return {
    success: true,
    data: result.data,
    message: result.message,
  }
}
