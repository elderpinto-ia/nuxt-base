<template>
  <div>
    <ModulesAuthComponentsLogin />
  </div>
</template>

<script setup lang="ts">
// Import the component. Nuxt 3 might auto-import components from the modules directory
// if correctly structured, but explicit import is safer for clarity.
import ModulesAuthComponentsLogin from '~/modules/auth/components/Login.vue';

// Define page meta if needed (e.g., layout)
// definePageMeta({
//   layout: 'default', // Assuming you have layouts/default.vue
// });
</script>
