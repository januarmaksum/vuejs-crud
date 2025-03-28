<script setup>
import IconLucide from '@/components/icons/IconLucide.vue'
import { formatDate } from '@/lib'
import { APIS_UserList } from '@/services/api/user/user.list'
import { onMounted, ref } from 'vue'

const users = ref([])

const showAddModal = ref(false)
const newUser = ref({
  name: '',
  email: '',
  role: 'User',
})

const addUser = () => {
  users.value.push({
    id: users.value.length + 1,
    ...newUser.value,
    status: 'Active',
  })
  showAddModal.value = false
  newUser.value = { name: '', email: '', role: 'User' }
}

const deleteUser = (userId) => {
  users.value = users.value.filter((user) => user.id !== userId)
}

const toggleStatus = (status) => {
  return status === 'Active' ? 'Inactive' : 'Active'
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
        @click="showAddModal = true"
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
                {{ toggleStatus(user.status) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap flex gap-2">
              <button
                @click="deleteUser(user.id)"
                class="text-red-600 hover:text-red-900 cursor-pointer"
              >
                <IconLucide name="Trash2" />
              </button>
              <button
                @click="deleteUser(user.id)"
                class="text-red-600 hover:text-red-900 cursor-pointer"
              >
                <IconLucide name="Pencil" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add User Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold mb-4">Add New User</h3>
        <form @submit.prevent="addUser">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              v-model="newUser.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="newUser.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              v-model="newUser.role"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="showAddModal = false"
              class="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
