import axios from 'axios';
import { Workout } from '../types/workout';

const API_URL = 'http://localhost:3000/api'; // Replace with your actual API URL

export const workoutService = {
  getAllWorkouts: async (): Promise<Workout[]> => {
    const response = await axios.get(`${API_URL}/workouts`);
    return response.data;
  },

  getWorkoutById: async (id: string): Promise<Workout> => {
    const response = await axios.get(`${API_URL}/workouts/${id}`);
    return response.data;
  },

  createWorkout: async (workout: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>): Promise<Workout> => {
    const response = await axios.post(`${API_URL}/workouts`, workout);
    return response.data;
  },

  updateWorkout: async (id: string, workout: Partial<Workout>): Promise<Workout> => {
    const response = await axios.put(`${API_URL}/workouts/${id}`, workout);
    return response.data;
  },

  deleteWorkout: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/workouts/${id}`);
  }
}; 