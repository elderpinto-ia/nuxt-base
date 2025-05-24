export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean; // Example property
  createdAt: string; // Example property
}

// You might also want types for user creation or update payloads
export interface UserCreationPayload {
  name: string;
  email: string;
  // password?: string; // If creating user with password
}
export interface UserUpdatePayload {
  name?: string;
  email?: string;
  isActive?: boolean;
}
