<template>
  <div>
    <!-- Global Header/Navbar placeholder -->
    <header class="bg-gray-100 p-4">
      <nav class="container mx-auto">
        <NuxtLink to="/" class="mr-4">Home</NuxtLink>
        <NuxtLink to="/login" class="mr-4">Login</NuxtLink> <!-- Example link -->
        <NuxtLink to="/dashboard" class="mr-4">Dashboard</NuxtLink> <!-- Example link -->
      </nav>
    </header>

    <!-- Page content -->
    <main class="container mx-auto p-4">
      <NuxtPage /> <!-- This is where Nuxt renders the current page -->
    </main>

    <!-- Global Footer placeholder -->
    <footer class="bg-gray-800 text-white p-4 text-center">
      <p>&copy; {{ new Date().getFullYear() }} My Nuxt App</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Optional: Add any global setup logic here
</script>

<style>
/* Minimal global styles if needed, Tailwind will handle most */
body {
  font-family: sans-serif;
}
</style>
