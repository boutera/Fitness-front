import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

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
  completed: boolean;
}

const timeFrames = ['Week', 'Month', 'Year'];

// Sample data for different time frames
const statsData = {
  Week: [
    { title: 'Workouts', value: '5', unit: 'sessions', icon: 'fitness-outline', change: '+2' },
    { title: 'Calories', value: '3,250', unit: 'kcal', icon: 'flame-outline', change: '+450' },
    { title: 'Time', value: '4.5', unit: 'hours', icon: 'time-outline', change: '+1.2' },
    { title: 'Distance', value: '12.8', unit: 'km', icon: 'map-outline', change: '+2.3' },
  ],
  Month: [
    { title: 'Workouts', value: '24', unit: 'sessions', icon: 'fitness-outline', change: '+3' },
    { title: 'Calories', value: '12,450', unit: 'kcal', icon: 'flame-outline', change: '+850' },
    { title: 'Time', value: '18.5', unit: 'hours', icon: 'time-outline', change: '+2.5' },
    { title: 'Distance', value: '48.2', unit: 'km', icon: 'map-outline', change: '+5.7' },
  ],
  Year: [
    { title: 'Workouts', value: '156', unit: 'sessions', icon: 'fitness-outline', change: '+24' },
    { title: 'Calories', value: '98,750', unit: 'kcal', icon: 'flame-outline', change: '+6,250' },
    { title: 'Time', value: '156.5', unit: 'hours', icon: 'time-outline', change: '+12.5' },
    { title: 'Distance', value: '425.8', unit: 'km', icon: 'map-outline', change: '+35.7' },
  ],
};

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Workout Warrior',
    description: 'Complete 30 workouts in a month',
    icon: 'trophy-outline',
    progress: 24,
    target: 30,
    completed: false,
  },
  {
    id: '2',
    title: 'Early Bird',
    description: 'Complete 10 morning workouts',
    icon: 'sunny-outline',
    progress: 7,
    target: 10,
    completed: false,
  },
  {
    id: '3',
    title: 'Calorie Crusher',
    description: 'Burn 15,000 calories',
    icon: 'flame-outline',
    progress: 12450,
    target: 15000,
    completed: false,
  },
];

export const ProgressScreen: React.FC = () => {
  const { user } = useAuth();
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('Week');
  const [stats, setStats] = useState<StatCard[]>(statsData.Week);
  const [achievementProgress] = useState(new Animated.Value(0));
  const [monthlyGoal, setMonthlyGoal] = useState({ current: 18, target: 20 });

  useEffect(() => {
    // Update stats when time frame changes
    setStats(statsData[selectedTimeFrame as keyof typeof statsData]);
    
    // Animate achievement progress
    Animated.timing(achievementProgress, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [selectedTimeFrame]);

  const handleTimeFrameChange = (timeFrame: string) => {
    setSelectedTimeFrame(timeFrame);
  };

  const getProgressColor = (progress: number, target: number) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 100) return '#4CAF50';
    if (percentage >= 75) return '#2196F3';
    if (percentage >= 50) return '#FFC107';
    return '#F44336';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Progress</Text>
        <Text style={styles.welcomeText}>Welcome back, {user?.firstName}!</Text>
        <View style={styles.timeFrameSelector}>
          {timeFrames.map((timeFrame) => (
            <TouchableOpacity
              key={timeFrame}
              style={[
                styles.timeFrameButton,
                selectedTimeFrame === timeFrame && styles.selectedTimeFrame,
              ]}
              onPress={() => handleTimeFrameChange(timeFrame)}
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
          <Animated.View 
            key={index} 
            style={[
              styles.statCard,
              {
                opacity: achievementProgress,
                transform: [{
                  translateY: achievementProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                }],
              },
            ]}
          >
            <View style={styles.statHeader}>
              <Ionicons name={stat.icon as any} size={24} color="#4c669f" />
              <View style={styles.changeIndicator}>
                <Text style={styles.changeText}>{stat.change}</Text>
              </View>
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statUnit}>{stat.unit}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </Animated.View>
        ))}
      </View>

      {/* Achievements Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        {achievements.map((achievement) => (
          <Animated.View 
            key={achievement.id} 
            style={[
              styles.achievementCard,
              {
                opacity: achievementProgress,
                transform: [{
                  translateX: achievementProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                }],
              },
            ]}
          >
            <View style={styles.achievementIcon}>
              <Ionicons
                name={achievement.icon as any}
                size={24}
                color={getProgressColor(achievement.progress, achievement.target)}
              />
            </View>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>
                {achievement.description}
              </Text>
              <View style={styles.progressBar}>
                <Animated.View
                  style={[
                    styles.progressFill,
                    {
                      width: achievementProgress.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', `${(achievement.progress / achievement.target) * 100}%`],
                      }),
                      backgroundColor: getProgressColor(achievement.progress, achievement.target),
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {achievement.progress} / {achievement.target}
              </Text>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Monthly Goal Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monthly Goal</Text>
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalTitle}>Workout Frequency</Text>
            <Text style={styles.goalProgress}>
              {monthlyGoal.current}/{monthlyGoal.target} workouts
            </Text>
          </View>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: achievementProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', `${(monthlyGoal.current / monthlyGoal.target) * 100}%`],
                  }),
                  backgroundColor: getProgressColor(monthlyGoal.current, monthlyGoal.target),
                },
              ]}
            />
          </View>
          <Text style={styles.goalDescription}>
            {monthlyGoal.current >= monthlyGoal.target
              ? 'Congratulations! You\'ve reached your monthly goal!'
              : `You're ${monthlyGoal.target - monthlyGoal.current} workouts away from your monthly goal.`}
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
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  timeFrameSelector: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  timeFrameButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedTimeFrame: {
    backgroundColor: '#4c669f',
  },
  timeFrameText: {
    fontSize: 14,
    color: '#666',
  },
  selectedTimeFrameText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  statCard: {
    width: (width - 40) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    margin: 10,
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
  },
  changeIndicator: {
    backgroundColor: '#e6f3ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
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
    marginTop: 10,
  },
  statUnit: {
    fontSize: 14,
    color: '#666',
  },
  statTitle: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  goalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
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
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  goalProgress: {
    fontSize: 14,
    color: '#4c669f',
    fontWeight: 'bold',
  },
  goalDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
}); 