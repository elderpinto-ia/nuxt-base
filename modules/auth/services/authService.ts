// import axios from 'axios'; // TODO: Configure Axios instance

// const apiClient = axios.create({
//   baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api', // Fallback if .env is not loaded
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    console.log('AuthService: Called login with', credentials);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    if (credentials.email === 'fail@example.com') {
      throw new Error('Simulated API login failure.');
    }
    return {
      token: 'mock-jwt-token-from-service',
      user: { id: '1', email: credentials.email, name: 'Mock User' },
    };
    // Replace with actual API call:
    // const response = await apiClient.post('/auth/login', credentials);
    // return response.data;
  },

  register: async (userData: any) => { // Replace 'any' with your UserData type
    console.log('AuthService: Called register with', userData);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      user: { id: '2', email: userData.email, name: userData.name || 'New User' },
      token: 'mock-jwt-token-for-new-user',
    };
    // const response = await apiClient.post('/auth/register', userData);
    // return response.data;
  },

  forgotPassword: async (email: string) => {
    console.log('AuthService: Called forgotPassword with', email);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { message: 'If your email is registered, you will receive a password reset link.' };
    // const response = await apiClient.post('/auth/forgot-password', { email });
    // return response.data;
  },

  // Add other auth-related API calls here (e.g., verifyEmail, resetPassword)
};
