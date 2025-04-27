import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface StatCard {
  title: string;
  value: string;
  unit: string;
  icon: string;
  change: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
}

const stats: StatCard[] = [
  {
    title: 'Workouts',
    value: '24',
    unit: 'sessions',
    icon: 'fitness-outline',
    change: '+3',
  },
  {
    title: 'Calories',
    value: '12,450',
    unit: 'kcal',
    icon: 'flame-outline',
    change: '+850',
  },
  {
    title: 'Time',
    value: '18.5',
    unit: 'hours',
    icon: 'time-outline',
    change: '+2.5',
  },
  {
    title: 'Distance',
    value: '48.2',
    unit: 'km',
    icon: 'map-outline',
    change: '+5.7',
  },
];

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Workout Warrior',
    description: 'Complete 30 workouts in a month',
    icon: 'trophy-outline',
    progress: 24,
    target: 30,
  },
  {
    id: '2',
    title: 'Early Bird',
    description: 'Complete 10 morning workouts',
    icon: 'sunny-outline',
    progress: 7,
    target: 10,
  },
  {
    id: '3',
    title: 'Calorie Crusher',
    description: 'Burn 15,000 calories',
    icon: 'flame-outline',
    progress: 12450,
    target: 15000,
  },
];

const timeFrames = ['Week', 'Month', 'Year'];

export const ProgressScreen: React.FC = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('Week');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Progress</Text>
        <View style={styles.timeFrameSelector}>
          {timeFrames.map((timeFrame) => (
            <TouchableOpacity
              key={timeFrame}
              style={[
                styles.timeFrameButton,
                selectedTimeFrame === timeFrame && styles.selectedTimeFrame,
              ]}
              onPress={() => setSelectedTimeFrame(timeFrame)}
            >
              <Text
                style={[
                  styles.timeFrameText,
                  selectedTimeFrame === timeFrame && styles.selectedTimeFrameText,
                ]}
              >
                {timeFrame}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name={stat.icon as any} size={24} color="#4c669f" />
              <View style={styles.changeIndicator}>
                <Text style={styles.changeText}>{stat.change}</Text>
              </View>
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statUnit}>{stat.unit}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </View>
        ))}
      </View>

      {/* Achievements Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        {achievements.map((achievement) => (
          <View key={achievement.id} style={styles.achievementCard}>
            <View style={styles.achievementIcon}>
              <Ionicons
                name={achievement.icon as any}
                size={24}
                color="#4c669f"
              />
            </View>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>
                {achievement.description}
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${(achievement.progress / achievement.target) * 100}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {achievement.progress} / {achievement.target}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Monthly Goal Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monthly Goal</Text>
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalTitle}>Workout Frequency</Text>
            <Text style={styles.goalProgress}>18/20 workouts</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '90%' }]} />
          </View>
          <Text style={styles.goalDescription}>
            You're almost there! Just 2 more workouts to reach your monthly goal.
          </Text>
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
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  timeFrameSelector: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
  },
  timeFrameButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedTimeFrame: {
    backgroundColor: '#4c669f',
  },
  timeFrameText: {
    color: '#666',
    fontWeight: '600',
  },
  selectedTimeFrameText: {
    color: '#fff',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  changeIndicator: {
    backgroundColor: '#e6f0ff',
    padding: 4,
    borderRadius: 6,
  },
  changeText: {
    color: '#4c669f',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statUnit: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
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
  achievementCard: {
    flexDirection: 'row',
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
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e6f0ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4c669f',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  goalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  goalProgress: {
    fontSize: 14,
    color: '#4c669f',
    fontWeight: '600',
  },
  goalDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
}); 