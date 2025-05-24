<template>
  <div class="p-4 max-w-2xl mx-auto">
    <div v-if="userStore.isLoading && !userStore.currentUser">Loading user details...</div>
    <div v-else-if="userStore.error && !userStore.currentUser">Error: {{ userStore.error }}</div>
    <div v-else-if="userStore.currentUser">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Edit User: {{ userStore.currentUser.name }}</h1>
        <NuxtLink to="/users" class="btn btn-ghost">&larr; Back to Users</NuxtLink>
      </div>
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <ModulesUsersComponentsUserForm
            :is-edit-mode="true"
            :user="userStore.currentUser"
            @submit="handleUpdateUser"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center text-xl">User not found.</p>
      <div class="text-center mt-4">
       <NuxtLink to="/users" class="btn btn-ghost">&larr; Back to Users</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModulesUsersComponentsUserForm from '~/modules/users/components/UserForm.vue';
import { useUserStore } from '~/modules/users/store';
import type { UserUpdatePayload } from '~/modules/users/types';
import { useRoute, useRouter } from 'vue-router'; // useRouter from vue-router for Nuxt 3
import { onMounted } from 'vue';
import { useAuthStore } from '~/modules/auth/store';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter(); // Use vue-router's useRouter
const authStore = useAuthStore();
const userId = route.params.id as string;

// definePageMeta({ middleware: 'auth' });

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }
  userStore.error = null; // Clear previous errors
  if (userId) {
    // Only fetch if currentUser is not already set or is different
    if (!userStore.currentUser || userStore.currentUser.id !== userId) {
      await userStore.fetchUserById(userId);
    }
  }
});

const handleUpdateUser = async (payload: UserUpdatePayload, id?: string) => {
  if (!id) {
    userStore.error = "User ID is missing for update.";
    return;
  }
  await userStore.updateUser(id, payload);
  if (!userStore.error) {
    router.push('/users');
  }
};
</script>
