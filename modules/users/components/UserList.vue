<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Users</h1>
      <NuxtLink to="/users/new" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add User
      </NuxtLink>
    </div>

    <div v-if="userStore.isLoading && userStore.users.length === 0" class="text-center"> <!-- Show loading only if users list is empty -->
      <span class="loading loading-lg loading-spinner text-primary"></span>
    </div>
    <div v-else-if="userStore.error" class="alert alert-error shadow-lg">
      Error: {{ userStore.error }}
      <button class="btn btn-sm btn-ghost" @click="userStore.fetchUsers()">Retry</button>
    </div>
    <div v-else-if="userStore.users.length === 0" class="text-center text-gray-500">
      No users found.
    </div>
    <div v-else class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Joined</th>
            <th class="w-1/5">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userStore.users" :key="user.id" class="hover">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span :class="user.isActive ? 'badge badge-success' : 'badge badge-ghost'">
                {{ user.isActive ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td>{{ new Date(user.createdAt).toLocaleDateString() }}</td>
            <td>
              <NuxtLink :to="`/users/${user.id}`" class="btn btn-sm btn-ghost mr-2">
                View/Edit
              </NuxtLink>
              <button
                @click="confirmDeleteUser(user.id, user.name)"
                class="btn btn-sm btn-error btn-ghost"
                :disabled="userStore.isLoading"
              >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                   <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c1.153 0 2.24.03 3.22.077m3.22-.077L10.879 3.28a2.25 2.25 0 0 1 2.244-2.077h6.316a2.25 2.25 0 0 1 2.244 2.077L17.23 5.79m1.232 0L12.11 3.28a2.25 2.25 0 0 0-2.244-2.077H8.084a2.25 2.25 0 0 0-2.244 2.077L4.772 5.79m1.784 0h10.896M2.25 6h19.5" />
               </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="userStore.isLoading && userStore.users.length > 0" class="text-center mt-4"> <!-- Show loading spinner below table if list is not empty -->
       <span class="loading loading-sm loading-spinner text-primary"></span> Updating list...
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '~/modules/users/store';

const userStore = useUserStore();

onMounted(() => {
  // Fetch users only if the list is empty, otherwise assume it's current
  // or rely on explicit refresh actions elsewhere if needed.
  if (userStore.users.length === 0) {
    userStore.fetchUsers();
  }
});

const confirmDeleteUser = async (userId: string, userName: string) => {
  if (window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
    await userStore.deleteUser(userId);
    // Optionally, show a notification here if not relying on store errors for everything
  }
};
</script>
