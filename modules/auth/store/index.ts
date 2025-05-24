import { defineStore } from 'pinia';
// import { authService } from '~/modules/auth/services/authService'; // TODO: Uncomment when service is ready

export interface AuthState {
  user: any | null; // Replace 'any' with your User type
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isLoading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) : boolean => !!state.token && !!state.user,
  },
  actions: {
    async login(credentials: { email: string; password: string }) {
      this.isLoading = true;
      this.error = null;
      try {
        console.log('Attempting login with store action:', credentials);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // const response = await authService.login(credentials); // TODO: Uncomment when service is ready
        // this.token = response.token;
        // this.user = response.user;
        this.token = 'fake-token'; // Placeholder
        this.user = { email: credentials.email, name: 'Test User' }; // Placeholder
        console.log('Login successful (simulated)');
      } catch (err: any) {
        this.error = err.message || 'Failed to login';
        this.token = null;
        this.user = null;
        console.error('Login failed:', this.error);
      } finally {
        this.isLoading = false;
      }
    },
    async register(userData: { name: string, email: string; password: string }) {
      this.isLoading = true;
      this.error = null;
      try {
        console.log('Attempting registration with store action:', userData);
        // const response = await authService.register(userData); // TODO: Uncomment when service is ready
        // Simulate API call from service
        await new Promise(resolve => setTimeout(resolve, 1000));
        // For simulation, we'll just log and not set user/token on register
        // as typically user might need to verify email or login separately
        console.log('Registration successful (simulated for user:', userData.email, ')');
        // In a real scenario, you might get back user data and token
        // this.user = response.user;
        // this.token = response.token;
      } catch (err: any) {
        this.error = err.message || 'Failed to register';
        console.error('Registration failed:', this.error);
      } finally {
        this.isLoading = false;
      }
    },
    async forgotPassword(email: string) {
      this.isLoading = true;
      this.error = null;
      try {
        console.log('Attempting forgot password with store action for email:', email);
        // const response = await authService.forgotPassword(email); // TODO: Uncomment when service is ready
        // Simulate API call from service
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Forgot password request successful (simulated for email:', email, ')');
        // Typically, the backend handles sending the email and the frontend just shows a success message.
        // No user/token state change here.
        // return response.message; // Or some success indicator
      } catch (err: any) {
        this.error = err.message || 'Failed to send password reset email';
        console.error('Forgot password failed:', this.error);
        // throw err; // Optionally re-throw if the component needs to react to specific errors
      } finally {
        this.isLoading = false;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      console.log('User logged out');
      // TODO: Call service to invalidate token on backend if necessary
    },
  },
});
