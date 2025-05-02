import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

type ChallengeDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'ChallengeDetail'>;
};

// Sample challenge data - replace this with your actual data fetching logic
const sampleChallenges: { [key: string]: any } = {
  '1': {
    id: '1',
    title: '30 Day Running Streak',
    description: 'Build a consistent running habit by completing a run every day for 30 days.',
    currentDay: 5,
    totalDays: 30,
    requirements: [
      'Run at least 1 mile per day',
      'Track your runs using the app',
      'Share your progress with friends'
    ],
    rewards: [
      'Improved cardiovascular health',
      'Increased endurance',
      'Badge of achievement'
    ],
    tips: [
      'Start with a comfortable pace',
      'Stay hydrated',
      'Listen to your body'
    ]
  },
  '2': {
    id: '2',
    title: 'Core Strength Challenge',
    description: 'Strengthen your core with daily exercises for 21 days.',
    currentDay: 3,
    totalDays: 21,
    requirements: [
      'Complete daily core exercises',
      'Follow the provided workout plan',
      'Track your progress'
    ],
    rewards: [
      'Stronger core muscles',
      'Improved posture',
      'Better balance'
    ],
    tips: [
      'Focus on form over speed',
      'Engage your core throughout',
      'Take rest days when needed'
    ]
  }
};

export const ChallengeDetailScreen: React.FC<ChallengeDetailScreenProps> = ({ route }) => {
  const { challengeId } = route.params;
  const challenge = sampleChallenges[challengeId];

  if (!challenge) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Challenge not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{challenge.title}</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Day {challenge.currentDay} of {challenge.totalDays}</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(challenge.currentDay / challenge.totalDays) * 100}%` }
              ]} 
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{challenge.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Requirements</Text>
        {challenge.requirements.map((requirement: string, index: number) => (
          <View key={index} style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={24} color="#4c669f" />
            <Text style={styles.requirementText}>{requirement}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rewards</Text>
        {challenge.rewards.map((reward: string, index: number) => (
          <View key={index} style={styles.rewardItem}>
            <Ionicons name="trophy" size={24} color="#ffd700" />
            <Text style={styles.rewardText}>{reward}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tips</Text>
        {challenge.tips.map((tip: string, index: number) => (
          <View key={index} style={styles.tipItem}>
            <Ionicons name="bulb" size={24} color="#4c669f" />
            <Text style={styles.tipText}>{tip}</Text>
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
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
    marginTop: 20,
  },
  header: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4c669f',
    borderRadius: 4,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  requirementText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rewardText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
    flex: 1,
  },
});

export default ChallengeDetailScreen; 