import { ROUTES } from '@/constants'
import { getToken } from '@/lib'
import API from '@/services/axios'
import { ENDPOINT } from '@/services/common.api'
import { useRouter } from 'vue-router'

const identity = '[api/admin.create.user]'

export async function APIS_UserCreate(payload) {
  const router = useRouter()
  const token = getToken()
  if (!token) {
    router.push(ROUTES.UNAUTHORIZED.path)
    return
  }

  const endpoint = ENDPOINT.user.create
  const result = await API.post(endpoint, payload)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`${identity} Error:`, error)
      throw error
    })

  if (!result.success)
    return {
      success: false,
      message: result.message,
      errors: result.errors,
    }

  return {
    success: true,
    message: result.message,
  }
}
