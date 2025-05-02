import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type ChallengesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Challenges'>;

export const ChallengesScreen: React.FC = () => {
  const navigation = useNavigation<ChallengesScreenNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Challenges</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Available Challenges</Text>
        <TouchableOpacity 
          style={styles.challengeCard}
          onPress={() => navigation.navigate('ChallengeDetail', { challengeId: '1' })}
        >
          <Text style={styles.challengeTitle}>30 Day Running Streak</Text>
          <Text style={styles.challengeDescription}>
            Build a consistent running habit by completing a run every day for 30 days.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.challengeCard}
          onPress={() => navigation.navigate('ChallengeDetail', { challengeId: '2' })}
        >
          <Text style={styles.challengeTitle}>Core Strength Challenge</Text>
          <Text style={styles.challengeDescription}>
            Strengthen your core with daily exercises for 21 days.
          </Text>
        </TouchableOpacity>
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
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  challengeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#666',
  },
}); 