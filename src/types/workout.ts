import { ImageSourcePropType } from 'react-native';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  duration?: number; // in seconds, for timed exercises
  restTime: number; // in seconds
  imageUrl?: string;
  videoUrl?: string;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'Strength' | 'Cardio' | 'Yoga' | 'HIIT';
  imageUrl: string;
  exercises: Exercise[];
  createdAt: Date;
  updatedAt: Date;
} 