<template>
  <div class="p-4 max-w-2xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Add New User</h1>
      <NuxtLink to="/users" class="btn btn-ghost">&larr; Back to Users</NuxtLink>
    </div>
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <ModulesUsersComponentsUserForm
          :is-edit-mode="false"
          @submit="handleCreateUser"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModulesUsersComponentsUserForm from '~/modules/users/components/UserForm.vue';
import { useUserStore } from '~/modules/users/store';
import type { UserCreationPayload } from '~/modules/users/types';
import { useRouter } from 'nuxt/app';
import { useAuthStore } from '~/modules/auth/store';
import { onMounted } from 'vue';

const userStore = useUserStore();
const router = useRouter();
const authStore = useAuthStore();

// definePageMeta({ middleware: 'auth' });
onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
  }
  userStore.error = null; // Clear any previous errors
});

const handleCreateUser = async (payload: UserCreationPayload) => {
  await userStore.createUser(payload);
  if (!userStore.error) {
    router.push('/users');
  }
};
</script>
