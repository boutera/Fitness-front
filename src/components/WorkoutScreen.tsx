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
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface WorkoutCategory {
  id: string;
  name: string;
  icon: string;
}

interface Workout {
  id: string;
  title: string;
  duration: string;
  difficulty: string;
  calories: string;
  image: string;
}

const workoutCategories: WorkoutCategory[] = [
  { id: '1', name: 'Strength', icon: 'barbell-outline' },
  { id: '2', name: 'Cardio', icon: 'heart-outline' },
  { id: '3', name: 'Yoga', icon: 'flower-outline' },
  { id: '4', name: 'HIIT', icon: 'flame-outline' },
];

const featuredWorkouts: Workout[] = [
  {
    id: '1',
    title: 'Full Body Strength',
    duration: '45 min',
    difficulty: 'Intermediate',
    calories: '400',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: '2',
    title: 'Cardio Blast',
    duration: '30 min',
    difficulty: 'Advanced',
    calories: '350',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: '3',
    title: 'Yoga Flow',
    duration: '60 min',
    difficulty: 'Beginner',
    calories: '200',
    image: 'https://via.placeholder.com/300',
  },
];

export const WorkoutScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('1');

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
        {workoutCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Ionicons
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
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured Workouts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Workouts</Text>
        {featuredWorkouts.map((workout) => (
          <TouchableOpacity key={workout.id} style={styles.workoutCard}>
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