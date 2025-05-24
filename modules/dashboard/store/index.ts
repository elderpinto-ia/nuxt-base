import { defineStore } from 'pinia';
// import { dashboardService } from '~/modules/dashboard/services/dashboardService'; // TODO

export interface DashboardSummaryData {
  totalUsers: number;
  totalProducts: number;
  openOrders: number;
  // Add other summary fields as needed
}

export interface DashboardState {
  summaryData: DashboardSummaryData | null;
  isLoading: boolean;
  error: string | null;
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    summaryData: null,
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchSummaryData() {
      this.isLoading = true;
      this.error = null;
      try {
        console.log('DashboardStore: Fetching summary data...');
        // const data = await dashboardService.getSummaryData(); // TODO
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.summaryData = { // Placeholder data
          totalUsers: 150,
          totalProducts: 75,
          openOrders: 25,
        };
        console.log('DashboardStore: Summary data fetched (simulated).');
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch summary data';
        console.error('DashboardStore: Error fetching summary data:', this.error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
