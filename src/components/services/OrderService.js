import apiService from './api';

class OrderService {
  // Get all orders
  async getOrders(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/orders?${queryString}` : '/orders';
      const response = await apiService.get(endpoint);
      return response;
    } catch (error) {
      console.error('Get orders error:', error);
      throw error;
    }
  }

  // Get single order
  async getOrder(id) {
    try {
      const response = await apiService.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get order error:', error);
      throw error;
    }
  }

  // Create order
  async createOrder(orderData) {
    try {
      const response = await apiService.post('/orders', orderData);
      return response;
    } catch (error) {
      console.error('Create order error:', error);
      throw error;
    }
  }

  // Update order
  async updateOrder(id, orderData) {
    try {
      const response = await apiService.put(`/orders/${id}`, orderData);
      return response;
    } catch (error) {
      console.error('Update order error:', error);
      throw error;
    }
  }

  // Update order status
  async updateOrderStatus(id, status) {
    try {
      const response = await apiService.put(`/orders/${id}/status`, { status });
      return response;
    } catch (error) {
      console.error('Update order status error:', error);
      throw error;
    }
  }

  // Delete order
  async deleteOrder(id) {
    try {
      const response = await apiService.delete(`/orders/${id}`);
      return response;
    } catch (error) {
      console.error('Delete order error:', error);
      throw error;
    }
  }

  // Get order statistics
  async getOrderStats() {
    try {
      const response = await apiService.get('/orders/stats');
      return response.data;
    } catch (error) {
      console.error('Get order stats error:', error);
      throw error;
    }
  }
}

export default new OrderService();