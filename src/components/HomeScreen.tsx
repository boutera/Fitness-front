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
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation/types';

const { width } = Dimensions.get('window');

// Sample recent workouts data
const recentWorkouts = [
  {
    id: '1',
    title: 'Full Body Workout',
    trainer: 'John Smith',
    duration: '45 min',
    difficulty: 'Intermediate',
    calories: 350,
    description: 'A comprehensive full-body workout targeting all major muscle groups.',
    equipment: ['Dumbbells', 'Yoga mat'],
    image: require('../../assets/full-body-workout.jpg'),
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
    image: require('../../assets/hiit-cardio.gif'),
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
    image: require('../../assets/yoga-flow.png'),
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

const activeChallenge = {
  id: '1',
  title: '30 Day Running Streak',
  description: 'Build a consistent running habit by completing a run every day for 30 days.',
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
  const { user } = useAuth();

  const handleChallengePress = () => {
    navigation.navigate('ChallengeDetail', { challengeId: '1' });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good Morning,</Text>
          <Text style={styles.userName}>
            {user?.firstName} {user?.lastName}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
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
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.actionButtonsContainer}
        >
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
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Rewards')}
            >
              <Ionicons name="trophy-outline" size={24} color="#4c669f" />
              <Text style={styles.actionText}>Rewards</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Recent Workouts */}
      <View style={styles.recentWorkouts}>
        <Text style={styles.sectionTitle}>Recent Workouts</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentWorkouts.map((workout) => (
            <TouchableOpacity 
              key={workout.id} 
              style={styles.workoutCard}
              onPress={() => navigation.navigate('WorkoutDetail', { workoutId: workout.id })}
            >
              <View style={styles.workoutImageContainer}>
                <Image
                  source={workout.image}
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
  actionButtonsContainer: {
    marginHorizontal: -20,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: (width - 75) / 3,
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