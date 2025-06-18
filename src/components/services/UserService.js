import apiService from './api';

class UserService {
  // Get all users
  async getUsers(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/users?${queryString}` : '/users';
      const response = await apiService.get(endpoint);
      return response;
    } catch (error) {
      console.error('Get users error:', error);
      throw error;
    }
  }

  // Get single user
  async getUser(id) {
    try {
      const response = await apiService.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  }

  // Create user
  async createUser(userData) {
    try {
      const response = await apiService.post('/users', userData);
      return response;
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  }

  // Update user
  async updateUser(id, userData) {
    try {
      const response = await apiService.put(`/users/${id}`, userData);
      return response;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(id) {
    try {
      const response = await apiService.delete(`/users/${id}`);
      return response;
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  }

  // Get user statistics
  async getUserStats() {
    try {
      const response = await apiService.get('/users/stats');
      return response.data;
    } catch (error) {
      console.error('Get user stats error:', error);
      throw error;
    }
  }
}

export default new UserService();