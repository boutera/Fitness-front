import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration?: string;
  description: string;
  image: string;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  calories: number;
  trainer: string;
  equipment: string[];
  exercises: Exercise[];
  image: string;
}

interface WorkoutCategory {
  id: string;
  title: string;
  icon: string;
}

const categories: WorkoutCategory[] = [
  { id: '1', title: 'Strength', icon: 'fitness-center' },
  { id: '2', title: 'Cardio', icon: 'directions-run' },
  { id: '3', title: 'Yoga', icon: 'self-improvement' },
  { id: '4', title: 'HIIT', icon: 'whatshot' }
];

const workouts: Workout[] = [
  {
    id: '1',
    title: 'Full Body Workout',
    trainer: 'John Smith',
    duration: '45 min',
    difficulty: 'Intermediate',
    calories: 350,
    description: 'A comprehensive full-body workout targeting all major muscle groups.',
    equipment: ['Dumbbells', 'Yoga mat'],
    image: 'https://example.com/full-body-workout.jpg',
    exercises: [
      {
        id: '1',
        name: 'Push-ups',
        sets: 3,
        reps: 15,
        image: 'https://example.com/pushup.jpg',
        description: 'Classic push-ups targeting chest, shoulders, and triceps.'
      },
      {
        id: '2',
        name: 'Squats',
        sets: 4,
        reps: 12,
        image: 'https://example.com/squat.jpg',
        description: 'Traditional bodyweight squats for lower body strength.'
      },
      {
        id: '3',
        name: 'Plank',
        sets: 3,
        reps: 60,
        image: 'https://example.com/plank.jpg',
        description: 'Core-strengthening exercise holding a plank position.'
      }
    ]
  },
  {
    id: '2',
    title: 'HIIT Cardio',
    trainer: 'Sarah Johnson',
    duration: '30 min',
    difficulty: 'Advanced',
    calories: 450,
    description: 'High-intensity interval training to boost cardio and burn calories.',
    equipment: ['None'],
    image: 'https://example.com/hiit-cardio.jpg',
    exercises: [
      {
        id: '4',
        name: 'Burpees',
        sets: 4,
        reps: 20,
        duration: '45 sec',
        image: 'https://example.com/burpee.jpg',
        description: 'Full-body exercise combining a squat, push-up, and jump.'
      },
      {
        id: '5',
        name: 'Mountain Climbers',
        sets: 3,
        reps: 30,
        duration: '45 sec',
        image: 'https://example.com/mountain-climber.jpg',
        description: 'Dynamic exercise targeting core and improving cardio.'
      },
      {
        id: '6',
        name: 'Jump Rope',
        sets: 4,
        reps: 50,
        duration: '60 sec',
        image: 'https://example.com/jump-rope.jpg',
        description: 'Cardio exercise improving coordination and endurance.'
      }
    ]
  },
  {
    id: '3',
    title: 'Yoga Flow',
    trainer: 'Emma Davis',
    duration: '60 min',
    difficulty: 'Beginner',
    calories: 175,
    description: 'Relaxing yoga flow focusing on flexibility and mindfulness.',
    equipment: ['Yoga mat'],
    image: 'https://example.com/yoga-flow.jpg',
    exercises: [
      {
        id: '7',
        name: 'Sun Salutation',
        sets: 3,
        reps: 5,
        duration: '60 sec',
        image: 'https://example.com/sun-salutation.jpg',
        description: 'Traditional yoga sequence warming up the entire body.'
      },
      {
        id: '8',
        name: 'Warrior Poses',
        sets: 2,
        reps: 8,
        duration: '45 sec',
        image: 'https://example.com/warrior.jpg',
        description: 'Series of standing poses building strength and balance.'
      },
      {
        id: '9',
        name: 'Child\'s Pose',
        sets: 2,
        reps: 3,
        duration: '60 sec',
        image: 'https://example.com/child-pose.jpg',
        description: 'Restorative pose for relaxation and gentle stretching.'
      }
    ]
  }
];

export const WorkoutScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('1');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Workouts</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <MaterialIcons
              name={category.icon as any}
              size={24}
              color={selectedCategory === category.id ? '#fff' : '#4c669f'}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText,
              ]}
            >
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured Workouts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Workouts</Text>
        {workouts.map((workout) => (
          <TouchableOpacity
            key={workout.id}
            style={styles.workoutCard}
            onPress={() => navigation.navigate('WorkoutDetail', { workout })}
          >
            <Image source={{ uri: workout.image }} style={styles.workoutImage} />
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutTitle}>{workout.title}</Text>
              <View style={styles.workoutDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{workout.duration}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="speedometer-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{workout.difficulty}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="flame-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{workout.calories} cal</Text>
                </View>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Start Workout Button */}
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Start New Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  filterButton: {
    padding: 8,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 25,
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  selectedCategory: {
    backgroundColor: '#4c669f',
  },
  categoryText: {
    marginLeft: 8,
    color: '#4c669f',
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  workoutCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    alignItems: 'center',
    padding: 10,
  },
  workoutImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  workoutInfo: {
    flex: 1,
    marginLeft: 15,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  workoutDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  detailText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 12,
  },
  startButton: {
    backgroundColor: '#4c669f',
    margin: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 