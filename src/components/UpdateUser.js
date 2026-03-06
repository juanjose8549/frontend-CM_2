import React, { useState } from 'react';
import { apiClient } from '../services/apiClient';
import '../styles/UpdateUser.css';

const UpdateUser = () => {
  const [userId, setUserId] = useState('');
  const [updaterId, setUpdaterId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    password: '',
    is_active: true,
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    // Validate required fields
    if (!userId.trim() || !updaterId.trim()) {
      setError('User ID and Updater ID are required');
      setLoading(false);
      return;
    }

    // Prepare update data (only include non-empty fields)
    const updatePayload = {};
    if (formData.name.trim()) updatePayload.name = formData.name;
    if (formData.surname.trim()) updatePayload.surname = formData.surname;
    if (formData.password.trim()) updatePayload.password = formData.password;
    if (Object.keys(updatePayload).length > 0 || formData.is_active !== true) {
      updatePayload.is_active = formData.is_active;
    }

    try {
      const result = await apiClient.updateUser(
        parseInt(userId),
        updatePayload,
        parseInt(updaterId)
      );
      setResponse({
        status: 'success',
        message: result.message,
        data: result,
      });
      // Reset form
      setFormData({ name: '', surname: '', password: '', is_active: true });
    } catch (err) {
      setError(err.message);
      setResponse({
        status: 'error',
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-user-container">
      <h2>Actualizar Usuario</h2>
      <form onSubmit={handleSubmit} className="update-user-form">
        <div className="form-section">
          <h3>IDs Requeridos</h3>
          <div className="form-group">
            <label htmlFor="userId">ID de Usuario(a actualizar):</label>
            <input
              type="number"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="updaterId">ID de quien actualiza:</label>
            <input
              type="number"
              id="updaterId"
              value={updaterId}
              onChange={(e) => setUpdaterId(e.target.value)}
              placeholder="Enter your user ID"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Datos de Usuario a Actulizar</h3>
          <div className="form-group">
            <label htmlFor="name">Nombre (opcional):</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Leave empty to skip"
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Apellido (opcional):</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              placeholder="Leave empty to skip"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña (opcional):</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Leave empty to skip"
            />
          </div>
          <div className="form-group checkbox">
            <label htmlFor="is_active">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
              />
              Usuario Activo
            </label>
          </div>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Procesando...' : 'Actulizar'}
        </button>
      </form>

      {/* Response Messages */}
      {response && (
        <div className={`response-container response-${response.status}`}>
          <h3>Mensaje</h3>
          <p className="response-message">{response.message}</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <h3>Error</h3>
          <p className="error-message">{error}</p>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
