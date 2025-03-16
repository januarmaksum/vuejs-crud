<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import IconLucide from '../icons/IconLucide.vue'
import { removeAuth } from '@/lib'

const handleLogout = () => {
  removeAuth()
  window.location.reload()
}

const menuItems = computed(() => [
  { name: 'Dashboard', path: '/dashboard', icon: 'Home' },
  { name: 'Users', path: '/users', icon: 'Users' },
])
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <div class="w-64 bg-gray-800">
      <div class="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 class="text-white text-xl font-bold">Admin Panel</h1>
      </div>
      <nav class="mt-6">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center px-6 py-3 text-gray-100 hover:bg-gray-700"
          :class="{ 'bg-gray-700': $route.path === item.path }"
        >
          <IconLucide :name="item.icon" class="w-5 h-5 mr-3" />
          {{ item.name }}
        </router-link>

        <button
          @click="handleLogout"
          class="w-full flex items-center px-6 py-3 text-red-300 hover:bg-gray-700 cursor-pointer"
        >
          <IconLucide name="LogOut" class="w-5 h-5 mr-3" />
          Logout
        </button>
      </nav>
    </div>

    <div class="flex-1 overflow-auto">
      <div class="p-6">
        <RouterView />
      </div>
    </div>
  </div>
</template>
