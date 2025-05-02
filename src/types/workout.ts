import { ImageSourcePropType } from 'react-native';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  duration?: string;
  image?: string;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  type: string;
  image: string;
  trainer: string;
  calories?: number;
  equipment?: string[];
  exercises?: Exercise[];
  createdAt?: Date;
  updatedAt?: Date;
} 