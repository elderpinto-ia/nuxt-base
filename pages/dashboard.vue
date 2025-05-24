<template>
  <div>
    <ModulesDashboardComponentsDashboardView />
  </div>
</template>

<script setup lang="ts">
import ModulesDashboardComponentsDashboardView from '~/modules/dashboard/components/DashboardView.vue';
import { useAuthStore } from '~/modules/auth/store';
import { useRouter } from 'nuxt/app';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

// definePageMeta({
//   middleware: 'auth' // Example: If you implement auth middleware
// });

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
  }
});
</script>
