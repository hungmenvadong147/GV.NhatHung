import axios from 'axios';
import { SiteData, Course, MenuItem, GalleryImage } from '../types';

const API_BASE_URL = '/api';

export const api = {
  // Get all data
  getData: async (): Promise<SiteData> => {
    const response = await axios.get(`${API_BASE_URL}/data`);
    return response.data;
  },

  // Contact
  updateContact: async (phone: string, email: string) => {
    const response = await axios.put(`${API_BASE_URL}/contact`, { phone, email });
    return response.data;
  },

  // Menu Items
  updateMenuItem: async (id: string, data: Partial<MenuItem>) => {
    const response = await axios.put(`${API_BASE_URL}/menu-items/${id}`, data);
    return response.data;
  },

  // Courses
  getCourses: async (): Promise<Course[]> => {
    const response = await axios.get(`${API_BASE_URL}/courses`);
    return response.data;
  },

  createCourse: async (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await axios.post(`${API_BASE_URL}/courses`, course);
    return response.data;
  },

  updateCourse: async (id: string, course: Partial<Course>) => {
    const response = await axios.put(`${API_BASE_URL}/courses/${id}`, course);
    return response.data;
  },

  deleteCourse: async (id: string) => {
    const response = await axios.delete(`${API_BASE_URL}/courses/${id}`);
    return response.data;
  },

  // Gallery
  updateGalleryImage: async (id: string, data: Partial<GalleryImage>) => {
    const response = await axios.put(`${API_BASE_URL}/gallery/${id}`, data);
    return response.data;
  },

  // Upload
  uploadVideo: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('video', file);
    const response = await axios.post(`${API_BASE_URL}/upload/video`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.url;
  },

  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await axios.post(`${API_BASE_URL}/upload/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.url;
  }
};
