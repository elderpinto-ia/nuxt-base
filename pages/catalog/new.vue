<template>
  <div class="p-4"><h1 class="text-2xl font-bold mb-4">Add New Catalog Item</h1><p>Item creation form will be here.</p><NuxtLink to="/catalog" class="btn btn-ghost mt-4">&larr; Back to Catalog</NuxtLink></div>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/modules/auth/store';
import { useRouter } from 'nuxt/app';
import { onMounted } from 'vue';
const authStore = useAuthStore();
const router = useRouter();
// definePageMeta({ middleware: 'auth' });
onMounted(() => { if (!authStore.isAuthenticated) router.push('/login'); });
</script>
