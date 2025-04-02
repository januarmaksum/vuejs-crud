<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import IconLucide from '../icons/IconLucide.vue'
import { getUserFromCookie, removeAuth } from '@/lib'
import { ROUTES } from '@/constants'

const handleLogout = () => {
  removeAuth()
  window.location.reload()
}

const menuItems = computed(() => [
  { path: ROUTES.DASHBOARD.path, label: ROUTES.DASHBOARD.label, icon: 'Home' },
  { path: ROUTES.USER.INDEX.path, label: ROUTES.USER.INDEX.label, icon: 'Users' },
])
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <div class="w-64 bg-gray-800">
      <div class="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 class="text-white text-xl font-bold">Admin Panel</h1>
      </div>
      <div class="flex flex-col justify-between">
        <nav class="mt-6">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center px-6 py-3 text-gray-100 hover:bg-gray-700"
            :class="{ 'bg-gray-700': $route.path === item.path }"
          >
            <IconLucide :name="item.icon" class="w-5 h-5 mr-3" />
            {{ item.label }}
          </router-link>
        </nav>
        <button
          @click="handleLogout"
          class="w-full flex items-center px-6 py-3 text-red-300 hover:bg-gray-700 cursor-pointer"
        >
          <IconLucide name="LogOut" class="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>

    <div class="flex-1 flex flex-col overflow-hidden">
      <div class="bg-white shadow relative z-50">
        <div class="flex justify-end items-center px-6 h-16">
          <div class="flex items-center">
            <span class="text-gray-700 mr-2">Welcome,</span>
            <span class="font-semibold text-gray-900">{{
              getUserFromCookie()?.name || 'Guest'
            }}</span>
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-auto">
        <div class="p-6">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
