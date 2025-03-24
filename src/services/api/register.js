import API from '@/services/axios'
import { ENDPOINT } from '@/services/common.api'

const identity = '[api/register]'

export async function APIS_Register(payload) {
  const endpoint = ENDPOINT.register.create
  const result = await API.post(endpoint, payload)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`${identity} Error:`, error)
      throw error
    })

  if (!result.success)
    return {
      data: null,
      success: false,
      errors: result.errors || [],
      message: result.message,
    }

  return {
    success: true,
    data: result.data,
    message: result.message,
  }
}
