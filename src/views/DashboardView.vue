<script setup>
import { APIS_UserList } from '@/services/api/user/user.list'
import { ref, computed, onMounted } from 'vue'

const users = ref([])

const totalUsers = computed(() => users.value.length)

const activeUsers = computed(() => users.value.filter((user) => user.status === true).length)

const newUsers = computed(() => {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  return users.value.filter((user) => {
    const createdAt = new Date(user.createdAt)
    return createdAt.getMonth() === currentMonth && createdAt.getFullYear() === currentYear
  }).length
})

onMounted(() => {
  APIS_UserList().then(({ data }) => {
    users.value = data
  })
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Dashboard Overview</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-blue-500 text-white rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-2">Total Users</h3>
        <p class="text-3xl font-bold">{{ totalUsers }}</p>
      </div>
      <div class="bg-green-500 text-white rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-2">Active Users</h3>
        <p class="text-3xl font-bold">{{ activeUsers }}</p>
      </div>
      <div class="bg-purple-500 text-white rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-2">New Users</h3>
        <p class="text-3xl font-bold">{{ newUsers }}</p>
      </div>
    </div>
  </div>
</template>
