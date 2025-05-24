<template>
  <div class="flex justify-center items-center min-h-screen bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title justify-center">Login</h2>
        <form @submit.prevent="handleLogin">
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
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
        <div class="divider">OR</div>
        <NuxtLink to="/register" class="btn btn-link btn-sm justify-center">Register</NuxtLink>
        <NuxtLink to="/forgot-password" class="btn btn-link btn-sm justify-center">Forgot Password?</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

// State
const state = reactive({
  email: '',
  password: '',
});

// Validation rules
const rules = computed(() => ({
  email: { required, email },
  password: { required, minLength: minLength(6) },
}));

const v$ = useVuelidate(rules, state);

// Methods
const handleLogin = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    console.log('Form errors', v$.value.$errors);
    return;
  }
  console.log('Logging in with:', state.email, state.password);
  // TODO: Call auth store action / service
};
</script>
