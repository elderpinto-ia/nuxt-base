export interface User {
  id: string;
  email: string;
  name?: string;
  // Add other user properties as needed
}

export interface LoginResponse {
  token: string;
  user: User;
}
