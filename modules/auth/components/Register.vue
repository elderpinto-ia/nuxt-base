<template>
  <div class="flex justify-center items-center min-h-screen bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title justify-center">Register</h2>
        <form @submit.prevent="handleRegister">
          <div class="form-control">
            <label class="label" for="name">
              <span class="label-text">Name</span>
            </label>
            <input
              type="text"
              id="name"
              v.model="state.name"
              class="input input-bordered"
              :class="{ 'input-error': v$.name.$error }"
            />
            <label class="label" v-if="v$.name.$error">
              <span class="label-text-alt text-error">{{ v$.name.$errors[0]?.$message }}</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label" for="email">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              v.model="state.email"
              class="input input-bordered"
              :class="{ 'input-error': v$.email.$error }"
            />
            <label class="label" v-if="v$.email.$error">
              <span class="label-text-alt text-error">{{ v$.email.$errors[0]?.$message }}</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label" for="password">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              v.model="state.password"
              class="input input-bordered"
              :class="{ 'input-error': v$.password.$error }"
            />
            <label class="label" v-if="v$.password.$error">
              <span class="label-text-alt text-error">{{ v$.password.$errors[0]?.$message }}</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label" for="confirmPassword">
              <span class="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              v.model="state.confirmPassword"
              class="input input-bordered"
              :class="{ 'input-error': v$.confirmPassword.$error }"
            />
            <label class="label" v-if="v$.confirmPassword.$error">
              <span class="label-text-alt text-error">{{ v$.confirmPassword.$errors[0]?.$message }}</span>
            </label>
          </div>

          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary" :disabled="authStore.isLoading">
              <span v-if="authStore.isLoading" class="loading loading-spinner"></span>
              Register
            </button>
          </div>
          <div v-if="authStore.error" class="mt-4 text-center text-error">
            {{ authStore.error }}
          </div>
        </form>
        <div class="divider">OR</div>
        <NuxtLink to="/login" class="btn btn-link btn-sm justify-center">Already have an account? Login</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import { useAuthStore } from '~/modules/auth/store'; // Adjusted path
import { useRouter } from 'nuxt/app';

const authStore = useAuthStore();
const router = useRouter();

// State
const state = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

// Validation rules
const rules = computed(() => ({
  name: { required },
  email: { required, email },
  password: { required, minLength: minLength(6) },
  confirmPassword: { required, sameAs: sameAs(state.password) },
}));

const v$ = useVuelidate(rules, state);

// Methods
const handleRegister = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    console.log('Form errors', v$.value.$errors);
    return;
  }
  console.log('Registering with:', state.name, state.email);
  // In a real app, you'd call an action in your authStore
  // which would then call your authService.
  // For now, directly using store action which has simulated service call
  await authStore.register({ // Assuming register action exists and handles success/failure
    name: state.name,
    email: state.email,
    password: state.password,
  });

  if (!authStore.error) {
    console.log('Registration successful, redirecting to login...');
    router.push('/login'); // Or to a dashboard if auto-login
  }
};
</script>
