<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Catalog Items</h1>
      <NuxtLink to="/catalog/new" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
        Add Item
      </NuxtLink>
    </div>

    <div v-if="catalogStore.isLoading && catalogStore.items.length === 0" class="text-center">
      <span class="loading loading-lg loading-spinner text-primary"></span>
    </div>
    <div v-else-if="catalogStore.error" class="alert alert-error shadow-lg">
      Error: {{ catalogStore.error }}
       <button class="btn btn-sm btn-ghost" @click="catalogStore.fetchItems()">Retry</button>
    </div>
    <div v-else-if="catalogStore.items.length === 0" class="text-center text-gray-500">
      No items found in catalog.
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="item in catalogStore.items" :key="item.id" class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
        <figure v-if="item.imageUrl" class="h-48 overflow-hidden">
          <img :src="item.imageUrl" :alt="item.name" class="w-full h-full object-cover"/>
        </figure>
        <div class="card-body">
          <h2 class="card-title truncate" :title="item.name">{{ item.name }}</h2>
          <p class="text-sm text-gray-500 h-10 overflow-hidden text-ellipsis">{{ item.description }}</p>
          <div class="flex justify-between items-center mt-2">
            <span class="text-lg font-semibold">${{ item.price.toFixed(2) }}</span>
            <span class="badge badge-outline">{{ item.category }}</span>
          </div>
          <p class="text-xs text-gray-400">Stock: {{ item.stock }}</p>
          <div class="card-actions justify-end mt-2">
            <NuxtLink :to="`/catalog/${item.id}`" class="btn btn-sm btn-outline btn-primary">
              Details
            </NuxtLink>
            <!-- Edit/Delete buttons can be added later -->
          </div>
        </div>
      </div>
    </div>
    <div v-if="catalogStore.isLoading && catalogStore.items.length > 0" class="text-center mt-4">
       <span class="loading loading-sm loading-spinner text-primary"></span> Updating list...
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCatalogStore } from '~/modules/catalog/store';

const catalogStore = useCatalogStore();

onMounted(() => {
  if (catalogStore.items.length === 0) {
    catalogStore.fetchItems();
  }
});
</script>
