<script setup>
import { useRouter } from 'vue-router'
import { ROUTES } from '@/constants'
import { reactive, ref } from 'vue'
import { APIS_UserCreate } from '@/services/api/user/user.create'

const router = useRouter()
const isSubmitting = ref(false)
const validation = ref([])

const user = reactive({
  name: '',
  email: '',
  password: '',
})

const onSubmit = async () => {
  isSubmitting.value = true
  const payload = {
    name: user.name,
    email: user.email,
    password: user.password,
  }

  APIS_UserCreate(payload)
    .then(() => {
      validation.value = []
      router.push(ROUTES.USER.INDEX.path)
    })
    .catch((error) => {
      validation.value = error.response.data
      isSubmitting.value = false
    })
}

const onCancel = () => {
  router.push(ROUTES.USER.INDEX.path)
}
</script>
<template>
  <div class="bg-white rounded-lg p-6 w-full max-w-md">
    <h3 class="text-lg font-semibold mb-4">Add New User</h3>
    <form @submit.prevent="onSubmit">
      <ul
        v-if="validation.errors"
        class="p-4 mb-4 text-sm text-red-800 rounded-md bg-red-100 list-disc pl-7"
      >
        <li v-for="(error, index) in validation.errors" :key="index" class="font-medium">
          {{ `${error.path} : ${error.msg}` }}
        </li>
      </ul>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          v-model="user.name"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter name"
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          v-model="user.email"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter email"
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          required
          v-model="user.password"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter password"
        />
      </div>
      <div class="flex justify-end gap-2">
        <button
          type="button"
          @click="onCancel"
          class="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
          :disabled="isSubmitting"
          :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>
