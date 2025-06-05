import apiService from './api';

class InventoryService {
  // Get all products
  async getProducts(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/inventory?${queryString}` : '/inventory';
      const response = await apiService.get(endpoint);
      return response;
    } catch (error) {
      console.error('Get products error:', error);
      throw error;
    }
  }

  // Get single product
  async getProduct(id) {
    try {
      const response = await apiService.get(`/inventory/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get product error:', error);
      throw error;
    }
  }

  // Create product
  async createProduct(productData) {
    try {
      const response = await apiService.post('/inventory', productData);
      return response;
    } catch (error) {
      console.error('Create product error:', error);
      throw error;
    }
  }

  // Update product
  async updateProduct(id, productData) {
    try {
      const response = await apiService.put(`/inventory/${id}`, productData);
      return response;
    } catch (error) {
      console.error('Update product error:', error);
      throw error;
    }
  }

  // Delete product
  async deleteProduct(id) {
    try {
      const response = await apiService.delete(`/inventory/${id}`);
      return response;
    } catch (error) {
      console.error('Delete product error:', error);
      throw error;
    }
  }

  // Update stock
  async updateStock(id, quantity, operation = 'set') {
    try {
      const response = await apiService.put(`/inventory/${id}/stock`, {
        quantity,
        operation
      });
      return response;
    } catch (error) {
      console.error('Update stock error:', error);
      throw error;
    }
  }

  // Get inventory statistics
  async getInventoryStats() {
    try {
      const response = await apiService.get('/inventory/stats');
      return response.data;
    } catch (error) {
      console.error('Get inventory stats error:', error);
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

export default new InventoryService();