import type { User, UserCreationPayload, UserUpdatePayload } from '~/modules/users/types';

let mockUsers: User[] = [
  { id: '1', name: 'Alice Wonderland', email: 'alice@example.com', isActive: true, createdAt: new Date().toISOString() },
  { id: '2', name: 'Bob The Builder', email: 'bob@example.com', isActive: false, createdAt: new Date().toISOString() },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', isActive: true, createdAt: new Date().toISOString() },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', isActive: true, createdAt: new Date().toISOString() },
  { id: '5', name: 'Edward Scissorhands', email: 'edward@example.com', isActive: false, createdAt: new Date().toISOString() },
];

export const userService = {
  fetchUsers: async (): Promise<User[]> => {
    console.log('UserService: Fetching users...');
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return [...mockUsers];
  },

  fetchUserById: async (id: string): Promise<User | undefined> => {
    console.log(`UserService: Fetching user by id ${id}...`);
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUsers.find(user => user.id === id);
  },

  createUser: async (userData: UserCreationPayload): Promise<User> => {
    console.log('UserService: Creating user...', userData);
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser: User = {
      id: String(mockUsers.length + 1),
      ...userData,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return newUser;
  },

  updateUser: async (id: string, userData: UserUpdatePayload): Promise<User | undefined> => {
    console.log(`UserService: Updating user ${id}...`, userData);
    await new Promise(resolve => setTimeout(resolve, 500));
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
    return mockUsers[userIndex];
  },

  deleteUser: async (id: string): Promise<boolean> => {
    console.log(`UserService: Deleting user ${id}...`);
    await new Promise(resolve => setTimeout(resolve, 500));
    const initialLength = mockUsers.length;
    mockUsers = mockUsers.filter(user => user.id !== id);
    return mockUsers.length < initialLength;
  },
};
