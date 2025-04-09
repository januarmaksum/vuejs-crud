<script setup>
import { useRouter } from 'vue-router'
import { ROUTES } from '@/constants'

const router = useRouter()

const onSubmit = () => {
  console.log('submit')
}

const onCancel = () => {
  router.push(ROUTES.USER.INDEX.path)
}
</script>
<template>
  <div class="bg-white rounded-lg p-6 w-full max-w-md">
    <h3 class="text-lg font-semibold mb-4">Add New User</h3>
    <form @submit.prevent="onSubmit">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
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
        >
          Add User
        </button>
      </div>
    </form>
  </div>
</template>
