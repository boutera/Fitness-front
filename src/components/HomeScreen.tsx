import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Workout } from './WorkoutScreen';  // Import Workout type
import type { Challenge } from '../navigation/AppNavigator';

type RootStackParamList = {
  Home: undefined;
  Workout: undefined;
  Schedule: undefined;
  Progress: undefined;
  WorkoutDetail: {
    workout: Workout;
  };
  ChallengeDetail: {
    challenge: Challenge;
  };
};

const { width } = Dimensions.get('window');

// Sample recent workouts data
const recentWorkouts: Workout[] = [
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
    exercises: []
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
    exercises: []
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
    exercises: []
  }
];

const activeChallenge: Challenge = {
  id: '1',
  title: '30 Day Running Streak',
  description: 'Build a consistent running habit by completing a run every day for 30 days. This challenge helps improve cardiovascular fitness, build endurance, and establish a regular exercise routine.',
  currentDay: 15,
  totalDays: 30,
  requirements: [
    'Complete at least a 1-mile run each day',
    'Log your run in the app',
    'Maintain the streak for 30 consecutive days',
    'Rest days should include at least a light jog'
  ],
  rewards: [
    'Special Achievement Badge',
    'Runner\'s Milestone Trophy',
    '500 Fitness Points',
    'Access to exclusive running programs'
  ],
  tips: [
    'Start slow and gradually increase your pace',
    'Stay hydrated before and after your run',
    'Invest in proper running shoes',
    'Listen to your body and adjust intensity as needed'
  ]
};

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleChallengePress = () => {
    navigation.navigate('ChallengeDetail', { challenge: activeChallenge });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good Morning,</Text>
          <Text style={styles.userName}>John Doe</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={40} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Today's Summary Card */}
      <View style={styles.summaryCard}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.gradient}
        >
          <Text style={styles.summaryTitle}>Today's Summary</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2,453</Text>
              <Text style={styles.statLabel}>Steps</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1.2</Text>
              <Text style={styles.statLabel}>km</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>320</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Workout')}
          >
            <Ionicons name="fitness-outline" size={24} color="#4c669f" />
            <Text style={styles.actionText}>Start Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Schedule')}
          >
            <Ionicons name="calendar-outline" size={24} color="#4c669f" />
            <Text style={styles.actionText}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Progress')}
          >
            <Ionicons name="stats-chart-outline" size={24} color="#4c669f" />
            <Text style={styles.actionText}>Progress</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Workouts */}
      <View style={styles.recentWorkouts}>
        <Text style={styles.sectionTitle}>Recent Workouts</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentWorkouts.map((workout) => (
            <TouchableOpacity 
              key={workout.id} 
              style={styles.workoutCard}
              onPress={() => navigation.navigate('WorkoutDetail', { workout })}
            >
              <View style={styles.workoutImageContainer}>
                <Image
                  source={{ uri: workout.image }}
                  style={styles.workoutImage}
                />
              </View>
              <Text style={styles.workoutTitle}>{workout.title}</Text>
              <Text style={styles.workoutSubtitle}>{workout.duration} • {workout.difficulty}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Challenges Section */}
      <View style={styles.challenges}>
        <Text style={styles.sectionTitle}>Active Challenges</Text>
        <View style={styles.challengeCard}>
          <View style={styles.challengeInfo}>
            <Text style={styles.challengeTitle}>{activeChallenge.title}</Text>
            <Text style={styles.challengeProgress}>
              Day {activeChallenge.currentDay} of {activeChallenge.totalDays}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(activeChallenge.currentDay / activeChallenge.totalDays) * 100}%` }
                ]} 
              />
            </View>
          </View>
          <TouchableOpacity 
            style={styles.challengeButton}
            onPress={handleChallengePress}
          >
            <Text style={styles.challengeButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileButton: {
    padding: 8,
  },
  summaryCard: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    padding: 20,
  },
  summaryTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  quickActions: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: (width - 60) / 3,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  actionText: {
    marginTop: 8,
    color: '#333',
    fontSize: 12,
  },
  recentWorkouts: {
    padding: 20,
  },
  workoutCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 15,
    width: 200,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  workoutImageContainer: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  workoutImage: {
    width: '100%',
    height: '100%',
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  workoutSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  challenges: {
    padding: 20,
    paddingBottom: 40,
  },
  challengeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  challengeInfo: {
    marginBottom: 15,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  challengeProgress: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginTop: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4c669f',
    borderRadius: 3,
  },
  challengeButton: {
    backgroundColor: '#4c669f',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  challengeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 