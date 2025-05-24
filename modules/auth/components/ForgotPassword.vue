<template>
  <div class="flex justify-center items-center min-h-screen bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title justify-center">Forgot Password</h2>
        <form @submit.prevent="handleForgotPassword">
          <div class="form-control">
            <label class="label" for="email">
              <span class="label-text">Enter your email address</span>
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

          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary" :disabled="authStore.isLoading">
              <span v-if="authStore.isLoading" class="loading loading-spinner"></span>
              Send Reset Link
            </button>
          </div>

          <div v-if="message" class="mt-4 text-center text-success">
            {{ message }}
          </div>
          <div v-if="authStore.error" class="mt-4 text-center text-error">
            {{ authStore.error }}
          </div>
        </form>
        <div class="divider">OR</div>
        <NuxtLink to="/login" class="btn btn-link btn-sm justify-center">Back to Login</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useAuthStore } from '~/modules/auth/store';

const authStore = useAuthStore();
const message = ref<string | null>(null);

// State
const state = reactive({
  email: '',
});

// Validation rules
const rules = computed(() => ({
  email: { required, email },
}));

const v$ = useVuelidate(rules, state);

// Methods
const handleForgotPassword = async () => {
  message.value = null;
  authStore.error = null; // Clear previous errors
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    console.log('Form errors', v$.value.$errors);
    return;
  }
  console.log('Sending password reset link for email:', state.email);
  await authStore.forgotPassword(state.email); // Assuming this action exists

  if (!authStore.error) {
    message.value = `If an account with ${state.email} exists, a password reset link has been sent.`;
    state.email = ''; // Clear the input field
    v$.value.$reset(); // Reset validation state
  }
};
</script>
