import { Workout } from '../types/workout';

const API_BASE_URL = 'http://localhost:8080/api';

export const workoutService = {
    getWorkouts: async (): Promise<Workout[]> => {
        try {
            const response = await fetch(`${API_BASE_URL}/workouts`);
            if (!response.ok) {
                throw new Error('Failed to fetch workouts');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching workouts:', error);
            throw error;
        }
    }
}; 