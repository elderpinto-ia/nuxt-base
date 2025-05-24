// import axios from 'axios'; // TODO: Configure Axios instance
// const apiClient = ...

export const dashboardService = {
  getSummaryData: async () => {
    console.log('DashboardService: Called getSummaryData');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    // Example:
    // if (Math.random() < 0.1) { // Simulate a 10% chance of error
    //   throw new Error('Simulated API error fetching dashboard data.');
    // }
    return {
      totalUsers: Math.floor(Math.random() * 200) + 50, // Random number between 50-250
      totalProducts: Math.floor(Math.random() * 100) + 20, // Random number between 20-120
      openOrders: Math.floor(Math.random() * 30) + 5, // Random number between 5-35
    };
    // Replace with actual API call:
    // const response = await apiClient.get('/dashboard/summary');
    // return response.data;
  },
};
