<script setup>
import { isAuthenticated } from '@/lib'
import { ROUTES } from '@/constants'

const onClick = () => {
  window.location.href = isAuthenticated() ? ROUTES.DASHBOARD.path : ROUTES.HOME.path
}
</script>
<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg p-6 text-center">
      <h1 class="text-2xl font-bold text-red-600">404 Not Found</h1>
      <p class="text-gray-700 mt-2">Halaman yang Anda cari tidak ditemukan.</p>
      <button
        @click="onClick"
        class="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        Kembali ke Home
      </button>
    </div>
  </div>
</template>
