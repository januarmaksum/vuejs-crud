<script setup>
import API from '@/services/api'
import { ref, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import Cookies from 'js-cookie'

const router = useRouter()

const user = reactive({
  email: '',
  password: '',
})

const isLoading = ref(false)
const validation = ref({ error: '' })

const handleSubmit = async (e) => {
  e.preventDefault()
  isLoading.value = true

  try {
    const { data } = await API.post('/api/login', {
      email: user.email,
      password: user.password,
    })

    validation.value.error = ''
    Cookies.set('token', data.data.token)
    Cookies.set('user', JSON.stringify(data.data.user))
    if (Cookies.get('token')) {
      await router.push('/dashboard')
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      validation.value.error = error.response.data.message
    } else {
      validation.value.error = 'Login failed. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <h2 class="leading-none tracking-tight text-3xl font-bold text-center">Welcome back</h2>
      <p class="text-center mb-7 mt-2 text-sm text-gray-500">
        Enter your credentials to sign in to your account
      </p>

      <div v-if="validation.error" class="p-4 mb-4 text-sm text-red-800 rounded-md bg-red-100">
        <span class="font-medium">{{ validation.error }}</span>
      </div>
      <form @submit="handleSubmit" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            v-model="user.email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            v-model="user.password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
        >
          Sign in
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        Don't have an account?
        <RouterLink to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
          Register here
        </RouterLink>
      </p>
    </div>
  </div>
</template>
