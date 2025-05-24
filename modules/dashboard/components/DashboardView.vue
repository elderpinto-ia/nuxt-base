<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

    <div v-if="dashboardStore.isLoading" class="flex justify-center items-center">
      <span class="loading loading-lg loading-spinner text-primary"></span>
    </div>

    <div v-else-if="dashboardStore.error" class="alert alert-error shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error: {{ dashboardStore.error }}</span>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Placeholder Stats Cards -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Total Users</h2>
          <p class="text-4xl font-bold">{{ dashboardStore.summaryData?.totalUsers || 0 }}</p>
          <div class="card-actions justify-end">
            <NuxtLink to="/users" class="btn btn-sm btn-ghost">View Users</NuxtLink>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Total Products</h2>
          <p class="text-4xl font-bold">{{ dashboardStore.summaryData?.totalProducts || 0 }}</p>
           <div class="card-actions justify-end">
            <NuxtLink to="/catalog" class="btn btn-sm btn-ghost">View Catalog</NuxtLink>
           </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Open Orders (Example)</h2>
          <p class="text-4xl font-bold">{{ dashboardStore.summaryData?.openOrders || 0 }}</p>
           <div class="card-actions justify-end">
            <button class="btn btn-sm btn-ghost">View Orders</button>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useDashboardStore } from '~/modules/dashboard/store';

const dashboardStore = useDashboardStore();

onMounted(() => {
  dashboardStore.fetchSummaryData();
});
</script>
