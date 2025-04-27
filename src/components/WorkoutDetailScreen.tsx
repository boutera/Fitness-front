import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';

type WorkoutDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'WorkoutDetail'>;
};

export const WorkoutDetailScreen: React.FC<WorkoutDetailScreenProps> = ({ route }) => {
  const { workout } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: workout.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{workout.title}</Text>
        <Text style={styles.trainer}>by {workout.trainer}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Duration</Text>
            <Text style={styles.statValue}>{workout.duration}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Difficulty</Text>
            <Text style={styles.statValue}>{workout.difficulty}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Calories</Text>
            <Text style={styles.statValue}>{workout.calories}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{workout.description}</Text>

        <Text style={styles.sectionTitle}>Equipment Needed</Text>
        {workout.equipment.map((item, index) => (
          <Text key={index} style={styles.equipmentItem}>• {item}</Text>
        ))}

        <Text style={styles.sectionTitle}>Exercises</Text>
        {workout.exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseItem}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseDetails}>
              {exercise.sets} sets × {exercise.reps} reps
              {exercise.duration && ` (${exercise.duration})`}
            </Text>
            <Text style={styles.exerciseDescription}>{exercise.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  trainer: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
  },
  equipmentItem: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  exerciseItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
}); 