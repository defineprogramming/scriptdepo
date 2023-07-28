import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const getScripts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/scripts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getScriptById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/scripts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createScript = async (script, token) => {
  try {
    const response = await axios.post(`${API_URL}/api/scripts`, script, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateScript = async (id, script, token) => {
  try {
    const response = await axios.put(`${API_URL}/api/scripts/${id}`, script, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteScript = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/api/scripts/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};