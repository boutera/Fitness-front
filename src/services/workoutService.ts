import axios from 'axios';
import { Workout } from '../types/workout';

// For Android emulator, use 10.0.2.2 instead of localhost
// For iOS simulator, use localhost
// For physical devices, use your computer's IP address
const API_URL = 'http://192.168.11.120:8080/api'; // For Android emulator
// const API_URL = 'http://localhost:8080/api'; // For iOS simulator
// const API_URL = 'http://192.168.11.119:8080/api'; // For physical devices

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

export const workoutService = {
  getAllWorkouts: async (): Promise<Workout[]> => {
    try {
      const response = await api.get('/workouts');
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      throw error;
    }
  },

  getWorkoutById: async (id: string): Promise<Workout> => {
    try {
      const response = await api.get(`/workouts/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching workout:', error);
      throw error;
    }
  },

  createWorkout: async (workout: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>): Promise<Workout> => {
    try {
      const response = await api.post('/workouts', workout);
      return response.data;
    } catch (error: any) {
      console.error('Error creating workout:', error);
      throw error;
    }
  },

  updateWorkout: async (id: string, workout: Partial<Workout>): Promise<Workout> => {
    try {
      const response = await api.put(`/workouts/${id}`, workout);
      return response.data;
    } catch (error: any) {
      console.error('Error updating workout:', error);
      throw error;
    }
  },

  deleteWorkout: async (id: string): Promise<void> => {
    try {
      await api.delete(`/workouts/${id}`);
    } catch (error: any) {
      console.error('Error deleting workout:', error);
      throw error;
    }
  }
}; 