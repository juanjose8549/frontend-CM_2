// API Client for backend communication
const API_BASE_URL = process.env.REACT_APP_API_URL


export const apiClient = {
  /**
   * Update a user by ID
   * @param {number} userId - The ID of the user to update
   * @param {Object} updateData - The data to update (name, surname, password, is_active)
   * @param {number} updaterId - The ID of the user making the update (sent as X-User-ID header)
   * @returns {Promise<Object>} - Response from the server
   */
  updateUser: async (userId, updateData, updaterId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-User-ID': updaterId.toString(),
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error('Failed to update user');
        error.detail = errorData.detail
        throw error
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
