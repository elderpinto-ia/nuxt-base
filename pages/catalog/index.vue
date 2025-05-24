<template>
  <div class="p-4">
    <ModulesCatalogComponentsItemList />
  </div>
</template>

<script setup lang="ts">
import ModulesCatalogComponentsItemList from '~/modules/catalog/components/ItemList.vue';
import { useAuthStore } from '~/modules/auth/store';
import { useRouter } from 'nuxt/app';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const router = useRouter();
// definePageMeta({ middleware: 'auth' });
onMounted(() => { if (!authStore.isAuthenticated) router.push('/login'); });
</script>
