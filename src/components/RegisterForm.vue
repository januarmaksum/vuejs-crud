<script setup>
import API from '@/services/api'
import { ref, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const user = reactive({
  name: '',
  email: '',
  password: '',
})

const isLoading = ref(false)
const validation = ref({ errors: [] })
const successMessage = ref('')

const handleSubmit = async (e) => {
  e.preventDefault()
  isLoading.value = true

  try {
    const response = await API.post('/api/register', {
      name: user.name,
      email: user.email,
      password: user.password,
    })

    validation.value.errors = []
    successMessage.value = response.data.message

    setTimeout(() => {
      router.push('/')
    }, 3000)
  } catch (error) {
    if (error.response && error.response.status === 422) {
      validation.value.errors = error.response.data.errors
    } else {
      validation.value.errors = [
        {
          msg: 'Register failed. Please try again.',
        },
      ]
    }
  }
}

router.beforeEach((to, from, next) => {
  isLoading.value = true
  next()
})

router.afterEach(() => {
  isLoading.value = false
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <h2 class="leading-none tracking-tight text-3xl font-bold text-center">Create an account</h2>
      <p class="text-center mb-7 mt-2 text-sm text-gray-500">
        Enter your information to create your account
      </p>
      <ul
        v-if="validation.errors.length"
        class="p-4 mb-4 text-sm text-red-800 rounded-md bg-red-100 list-disc pl-7"
      >
        <li v-for="(error, index) in validation.errors" :key="index" class="font-medium">
          {{ error.msg }}
        </li>
      </ul>
      <div
        v-if="successMessage"
        class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
        role="alert"
      >
        <span class="font-medium">{{ successMessage }}</span>
      </div>

      <form @submit="handleSubmit" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            id="name"
            type="text"
            v-model="user.name"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your full name"
          />
        </div>

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
          class="w-full flex cursor-pointer justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
        >
          Create Account
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        Already have an account?
        <RouterLink to="/" class="font-medium text-indigo-600 hover:text-indigo-500">
          Sign in
        </RouterLink>
      </p>
    </div>
  </div>
</template>
