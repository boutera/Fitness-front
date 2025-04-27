export interface Workout {
    id: number;
    userId: number;
    name: string;
    description?: string;
    workoutDate: string;
    durationMinutes?: number;
    caloriesBurned?: number;
    distanceKm?: number;
    steps?: number;
    createdAt: string;
    updatedAt: string;
} 