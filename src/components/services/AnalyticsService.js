import apiService from './api';

class AnalyticsService {
  // Get dashboard analytics
  async getDashboardStats() {
    try {
      // Combine multiple API calls for dashboard data
      const [inventoryStats, orderStats, userStats] = await Promise.all([
        apiService.get('/inventory/stats'),
        apiService.get('/orders/stats'),
        apiService.get('/users/stats')
      ]);

      return {
        inventory: inventoryStats.data,
        orders: orderStats.data,
        users: userStats.data
      };
    } catch (error) {
      console.error('Get dashboard stats error:', error);
      throw error;
    }
  }

  // Get sales analytics
  async getSalesAnalytics(period = '30d') {
    try {
      const response = await apiService.get(`/orders/stats?period=${period}`);
      return response.data;
    } catch (error) {
      console.error('Get sales analytics error:', error);
      throw error;
    }
  }

  // Get inventory analytics
  async getInventoryAnalytics() {
    try {
      const response = await apiService.get('/inventory/stats');
      return response.data;
    } catch (error) {
      console.error('Get inventory analytics error:', error);
      throw error;
    }
  }

  // Get low stock alerts
  async getLowStockAlerts() {
    try {
      const response = await apiService.get('/inventory/alerts');
      return response.data;
    } catch (error) {
      console.error('Get low stock alerts error:', error);
      throw error;
    }
  }
}

export default new AnalyticsService();