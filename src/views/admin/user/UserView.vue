<script setup>
import IconLucide from '@/components/icons/IconLucide.vue'
import { ROUTES } from '@/constants'
import { formatDate } from '@/lib'
import { APIS_UserList } from '@/services/api/user/user.list'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const users = ref([])

const setStatus = (status) => {
  return status ? 'Active' : 'Inactive'
}

const onDeleteUser = (userId) => {
  console.log(userId)
}

const onEditUser = (userId) => {
  router.push(ROUTES.USER.EDIT.path.replace(':id', userId))
}

const onAddUser = () => {
  router.push(ROUTES.USER.CREATE.path)
}

onMounted(() => {
  APIS_UserList().then(({ data }) => {
    users.value = data
  })
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Users</h2>
      <button
        @click="onAddUser"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
        Add User
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              No.
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Created At
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Updated At
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="users.length === 0">
            <td colspan="4" class="px-6 py-4 whitespace-nowrap text-center">No users found.</td>
          </tr>
          <tr v-else v-for="(user, index) in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ formatDate(user.createdAt, 'fullDate') }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ formatDate(user.updatedAt, 'fullDate') }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
              >
                {{ setStatus(user.status) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap flex gap-2">
              <button
                @click="onDeleteUser(user.id)"
                class="text-red-600 hover:text-red-900 cursor-pointer"
              >
                <IconLucide name="Trash2" />
              </button>
              <button
                @click="onEditUser(user.id)"
                class="text-red-600 hover:text-red-900 cursor-pointer"
              >
                <IconLucide name="Pencil" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
