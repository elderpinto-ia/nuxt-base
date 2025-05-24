<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-4">
      <div class="form-control">
        <label class="label" for="name">
          <span class="label-text">Name</span>
        </label>
        <input
          type="text"
          id="name"
          v.model="formState.name"
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
          v.model="formState.email"
          class="input input-bordered"
          :class="{ 'input-error': v$.email.$error }"
        />
        <label class="label" v-if="v$.email.$error">
          <span class="label-text-alt text-error">{{ v$.email.$errors[0]?.$message }}</span>
        </label>
      </div>

      <div v-if="!isEditMode" class="form-control"> <!-- Only show password for create mode -->
        <label class="label" for="password">
          <span class="label-text">Password</span>
        </label>
        <input
          type="password"
          id="password"
          v.model="formState.password"
          class="input input-bordered"
          :class="{ 'input-error': v$.password?.$error }"
        />
        <label class="label" v-if="v$.password?.$error">
          <span class="label-text-alt text-error">{{ v$.password?.$errors[0]?.$message }}</span>
        </label>
      </div>

       <div class="form-control" v-if="isEditMode">
         <label class="label cursor-pointer">
           <span class="label-text">Is Active?</span>
           <input type="checkbox" v-model="formState.isActive" class="toggle toggle-primary" />
         </label>
       </div>

      <div class="form-control mt-6">
        <button type="submit" class="btn btn-primary" :disabled="userStore.isLoading">
          <span v-if="userStore.isLoading" class="loading loading-spinner"></span>
          {{ isEditMode ? 'Save Changes' : 'Create User' }}
        </button>
      </div>
      <div v-if="userStore.error" class="alert alert-error mt-4">
        {{ userStore.error }}
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed, watch, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import type { User, UserCreationPayload, UserUpdatePayload } from '~/modules/users/types';
import { useUserStore } from '~/modules/users/store';

const props = defineProps<{
  user?: User | null; // For edit mode
  isEditMode: boolean;
}>();

const emit = defineEmits(['submit']);
const userStore = useUserStore();

const formState = reactive({
  name: '',
  email: '',
  password: '',
  isActive: true,
});

// Validation rules
const rules = computed(() => ({
  name: { required },
  email: { required, email },
  password: props.isEditMode ? {} : { required, minLength: minLength(6) },
  isActive: {},
}));

const v$ = useVuelidate(rules, formState);

// Watch for prop changes to populate form in edit mode
watch(() => props.user, (currentUser) => {
  if (currentUser && props.isEditMode) {
    formState.name = currentUser.name;
    formState.email = currentUser.email;
    formState.isActive = currentUser.isActive;
    formState.password = ''; // Clear password field in edit mode
  } else if (!props.isEditMode) { // Ensure form is reset for create mode
    formState.name = '';
    formState.email = '';
    formState.password = '';
    formState.isActive = true;
  }
}, { immediate: true, deep: true });

onMounted(() => {
   if (props.isEditMode && props.user) {
       formState.name = props.user.name;
       formState.email = props.user.email;
       formState.isActive = props.user.isActive;
   } else if (!props.isEditMode) {
       formState.name = '';
       formState.email = '';
       formState.password = '';
       formState.isActive = true;
   }
});

const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    console.log('Form errors', v$.value.$errors);
    return;
  }

  let payload: UserCreationPayload | UserUpdatePayload;
  if (props.isEditMode) {
    payload = {
      name: formState.name,
      email: formState.email,
      isActive: formState.isActive,
    } as UserUpdatePayload;
  } else {
    payload = {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    } as UserCreationPayload;
  }
  emit('submit', payload, props.user?.id);
};
</script>
