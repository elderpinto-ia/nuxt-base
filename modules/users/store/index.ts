import { defineStore } from 'pinia';
import type { User, UserCreationPayload, UserUpdatePayload } from '~/modules/users/types';
import { userService } from '~/modules/users/services/userService';

export interface UsersState {
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

export const useUserStore = defineStore('users', {
  state: (): UsersState => ({
    users: [],
    currentUser: null,
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchUsers() {
      this.isLoading = true;
      this.error = null;
      try {
        this.users = await userService.fetchUsers();
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch users';
      } finally {
        this.isLoading = false;
      }
    },
    async fetchUserById(id: string) {
      this.isLoading = true;
      this.error = null;
      try {
        this.currentUser = await userService.fetchUserById(id) || null;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch user';
      } finally {
        this.isLoading = false;
      }
    },
    async createUser(payload: UserCreationPayload) {
      this.isLoading = true;
      this.error = null;
      try {
        const newUser = await userService.createUser(payload);
        await this.fetchUsers(); // Refetch the list to see the new user
        console.log('User created successfully', newUser);
      } catch (err: any) {
        this.error = err.message || 'Failed to create user';
        console.error('Create user failed:', this.error);
      } finally {
        this.isLoading = false;
      }
    },
    async updateUser(id: string, payload: UserUpdatePayload) {
      this.isLoading = true;
      this.error = null;
      try {
        const updatedUser = await userService.updateUser(id, payload);
        if (updatedUser) {
          await this.fetchUsers(); // Refetch the list to see changes.
          if (this.currentUser && this.currentUser.id === id) {
            this.currentUser = { ...this.currentUser, ...updatedUser };
          }
          console.log('User updated successfully', updatedUser);
        } else {
          throw new Error('User not found or update failed at service level.');
        }
      } catch (err: any) {
        this.error = err.message || 'Failed to update user';
        console.error('Update user failed:', this.error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteUser(id: string) {
      this.isLoading = true; // Indicate loading state for UI feedback
      this.error = null;
      try {
        const success = await userService.deleteUser(id);
        if (success) {
          await this.fetchUsers(); // Refetch the list to reflect deletion
          console.log('User deleted successfully', id);
          if (this.currentUser && this.currentUser.id === id) {
            this.currentUser = null; // Clear current user if it was the one deleted
          }
        } else {
          throw new Error('User not found or delete failed at service level.');
        }
      } catch (err: any) {
        this.error = err.message || 'Failed to delete user';
        console.error('Delete user failed:', this.error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
