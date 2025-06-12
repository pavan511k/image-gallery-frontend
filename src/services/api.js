// src/services/api.js
import axios from 'axios';
import { getIdToken } from './auth';

// --- MODIFIED LINE HERE ---
// Use import.meta.env to access Vite environment variables.
// VITE_API_BASE_URL will be used in production builds (from .env.production).
// The || 'https://localhost:7001/api' provides a fallback for local development
// if VITE_API_BASE_URL is not defined in your local .env or .env.development.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7001/api';
// --- END MODIFIED LINE ---

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add the Firebase ID token to headers
api.interceptors.request.use(async (config) => {
  const token = await getIdToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Register user in your backend database
export const registerUserInBackend = async () => {
  try {
    const response = await api.post('/Images/registerUser'); // Endpoint is on ImagesController
    return response.data;
  } catch (error) {
    console.error("Error registering user in backend:", error);
    throw error;
  }
};

// Image related API calls
export const uploadImages = async (files) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file); // 'files' must match the parameter name in your C# API
  });

  try {
    const response = await api.post('/Images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

export const getImages = async () => {
  try {
    const response = await api.get('/Images');
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

export const deleteImage = async (id) => {
  try {
    const response = await api.delete(`/Images/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

export default api;