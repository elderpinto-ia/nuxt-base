<template>
  <div class="p-4">
    <div v-if="catalogStore.isLoading && !catalogStore.currentItem">Loading item details...</div>
    <div v-else-if="catalogStore.error && !catalogStore.currentItem">Error: {{ catalogStore.error }}</div>
    <div v-else-if="catalogStore.currentItem" class="max-w-3xl mx-auto">
      <div class="card lg:card-side bg-base-100 shadow-xl">
        <figure v-if="catalogStore.currentItem.imageUrl" class="lg:w-1/3">
          <img :src="catalogStore.currentItem.imageUrl" :alt="catalogStore.currentItem.name" class="object-cover h-full w-full"/>
        </figure>
        <div class="card-body lg:w-2/3">
          <h1 class="card-title text-3xl">{{ catalogStore.currentItem.name }}</h1>
          <p class="text-gray-600 mt-2">{{ catalogStore.currentItem.description }}</p>
          <div class="my-4">
            <p class="text-2xl font-bold text-primary">${{ catalogStore.currentItem.price.toFixed(2) }}</p>
            <p class="text-sm text-gray-500">Stock: {{ catalogStore.currentItem.stock }}</p>
            <p class="text-sm text-gray-500">Category: <span class="badge badge-outline">{{ catalogStore.currentItem.category }}</span></p>
          </div>
          <div class="card-actions justify-end">
            <!-- Placeholder for Edit button -->
            <!-- <button class="btn btn-secondary">Edit Item</button> -->
          </div>
          <p class="text-xs text-gray-400 mt-4">Item ID: {{ catalogStore.currentItem.id }}</p>
          <p class="text-xs text-gray-400">Listed on: {{ new Date(catalogStore.currentItem.createdAt).toLocaleDateString() }}</p>
        </div>
      </div>
      <div class="text-center mt-6">
        <NuxtLink to="/catalog" class="btn btn-ghost">&larr; Back to Catalog</NuxtLink>
      </div>
    </div>
    <div v-else class="text-center">
      <p class="text-xl">Item not found.</p>
      <NuxtLink to="/catalog" class="btn btn-ghost mt-4">&larr; Back to Catalog</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCatalogStore } from '~/modules/catalog/store';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useAuthStore } from '~/modules/auth/store';
import { useRouter } from 'nuxt/app';

const catalogStore = useCatalogStore();
const route = useRoute();
const authStore = useAuthStore();
const router = useRouter();
const itemId = route.params.id as string;

// definePageMeta({ middleware: 'auth' });

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }
  if (itemId) {
    if (!catalogStore.currentItem || catalogStore.currentItem.id !== itemId) {
      await catalogStore.fetchItemById(itemId);
    }
  }
});
</script>
