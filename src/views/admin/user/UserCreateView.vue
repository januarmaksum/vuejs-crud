<script setup></script>
<template>
  <div class="bg-white rounded-lg p-6 w-full max-w-md">
    <h3 class="text-lg font-semibold mb-4">Add New User</h3>
    <form>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-md">
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div class="flex justify-end gap-2">
        <button type="button" class="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Add User
        </button>
      </div>
    </form>
  </div>
</template>
