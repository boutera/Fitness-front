import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
  isUnlocked: boolean;
  points: number;
  category: 'Workout' | 'Running' | 'Strength' | 'Consistency';
}

interface Reward {
  id: string;
  title: string;
  description: string;
  image: string;
  pointsCost: number;
  isLocked: boolean;
  category: 'Premium' | 'Basic' | 'Special';
}

interface Challenge {
  tips: string[];
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Early Bird',
    description: 'Complete 10 workouts before 8 AM',
    icon: 'sunny',
    progress: 7,
    total: 10,
    isUnlocked: false,
    points: 500,
    category: 'Consistency'
  },
  {
    id: '2',
    title: 'Marathon Master',
    description: 'Run a total of 100km',
    icon: 'walk',
    progress: 75,
    total: 100,
    isUnlocked: false,
    points: 1000,
    category: 'Running'
  },
  {
    id: '3',
    title: 'Strength Champion',
    description: 'Complete 50 strength workouts',
    icon: 'barbell',
    progress: 50,
    total: 50,
    isUnlocked: true,
    points: 5000,
    category: 'Strength'
  },
  {
    id: '4',
    title: '30-Day Warrior',
    description: 'Work out for 30 consecutive days',
    icon: 'calendar',
    progress: 22,
    total: 30,
    isUnlocked: false,
    points: 1500,
    category: 'Consistency'
  }
];

const rewards: Reward[] = [
  {
    id: '1',
    title: 'Premium Workout Plan',
    description: 'Unlock exclusive premium workout plans',
    image: 'https://example.com/premium-workout.jpg',
    pointsCost: 2000,
    isLocked: true,
    category: 'Premium'
  },
  {
    id: '2',
    title: 'Personal Trainer Session',
    description: '1-hour virtual session with a certified trainer',
    image: 'https://example.com/trainer.jpg',
    pointsCost: 5000,
    isLocked: true,
    category: 'Premium'
  },
  {
    id: '3',
    title: 'Custom Meal Plan',
    description: 'Personalized nutrition plan for your goals',
    image: 'https://example.com/meal-plan.jpg',
    pointsCost: 3000,
    isLocked: true,
    category: 'Special'
  }
];

export const RewardsScreen: React.FC = () => {
  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements);
  const [availablePoints, setAvailablePoints] = useState<number>(0);
  const [userRewards, setUserRewards] = useState<Reward[]>(rewards);
  const challenge: Challenge = {
    tips: [
      "Complete daily workouts to earn more points",
      "Share your achievements with friends",
      "Join challenges to unlock special rewards",
      "Stay consistent with your fitness routine"
    ]
  };

  const getProgressColor = (progress: number, total: number): string => {
    const percentage = (progress / total) * 100;
    
    if (percentage === 100) return '#2E7D32'; // Very green
    if (percentage >= 75) return '#7CB342';   // Yellow-green
    if (percentage >= 50) return '#FDD835';   // Yellow
    if (percentage >= 25) return '#FB8C00';   // Orange
    return '#D32F2F';                         // Red
  };

  // Calculate total points from unlocked achievements
  React.useEffect(() => {
    const totalPoints = userAchievements
      .filter(achievement => achievement.isUnlocked)
      .reduce((sum, achievement) => sum + achievement.points, 0);
    setAvailablePoints(totalPoints);
  }, [userAchievements]);

  const handleAchievementPress = (achievement: Achievement) => {
    if (achievement.isUnlocked) {
      Alert.alert(
        'Achievement Unlocked',
        `You've already completed "${achievement.title}" and earned ${achievement.points} points!`,
        [{ text: 'OK' }]
      );
    } else if (achievement.progress >= achievement.total) {
      Alert.alert(
        'Congratulations!',
        `You've completed "${achievement.title}"! You've earned ${achievement.points} points!`,
        [
          {
            text: 'Claim',
            onPress: () => {
              // Update achievement status
              setUserAchievements(prev =>
                prev.map(a =>
                  a.id === achievement.id ? { ...a, isUnlocked: true } : a
                )
              );
            },
          },
        ]
      );
    } else {
      Alert.alert(
        'Achievement In Progress',
        `Progress: ${achievement.progress}/${achievement.total}\n${achievement.description}`,
        [{ text: 'OK' }]
      );
    }
  };

  const handleUnlockReward = (reward: Reward) => {
    if (availablePoints < reward.pointsCost) {
      Alert.alert(
        'Not Enough Points',
        'You need more points to unlock this reward. Keep completing achievements to earn more points!',
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Unlock Reward',
      `Are you sure you want to spend ${reward.pointsCost} points to unlock "${reward.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Unlock',
          onPress: () => {
            // Update points
            setAvailablePoints(prev => prev - reward.pointsCost);
            
            // Update reward status
            setUserRewards(prev =>
              prev.map(r =>
                r.id === reward.id ? { ...r, isLocked: false } : r
              )
            );

            // Show success message
            Alert.alert(
              'Success!',
              `You've successfully unlocked ${reward.title}!`,
              [{ text: 'OK' }]
            );
          },
        },
      ]
    );
  };

  const renderAchievementCard = (achievement: Achievement) => (
    <TouchableOpacity 
      key={achievement.id}
      style={[
        styles.achievementCard,
        {
          backgroundColor: achievement.isUnlocked 
            ? '#2E7D32' // Very green for unlocked
            : getProgressColor(achievement.progress, achievement.total)
        }
      ]}
      onPress={() => handleAchievementPress(achievement)}
    >
      <View style={styles.achievementIcon}>
        <Ionicons 
          name={achievement.icon as any} 
          size={32} 
          color="#fff" 
        />
      </View>
      <Text style={styles.achievementTitle}>{achievement.title}</Text>
      <Text style={styles.achievementDescription}>{achievement.description}</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${(achievement.progress / achievement.total) * 100}%` }
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {achievement.progress}/{achievement.total}
        </Text>
      </View>
      <View style={styles.pointsContainer}>
        <Ionicons name="star" size={16} color="#FFD700" />
        <Text style={styles.pointsText}>{achievement.points} pts</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRewardCard = (reward: Reward) => (
    <TouchableOpacity 
      key={reward.id}
      style={[
        styles.rewardCard,
        reward.isLocked && styles.rewardCardLocked
      ]}
    >
      <Image
        source={{ uri: reward.image }}
        style={styles.rewardImage}
      />
      <View style={styles.rewardContent}>
        <Text style={styles.rewardTitle}>{reward.title}</Text>
        <Text style={styles.rewardDescription}>{reward.description}</Text>
        <View style={styles.rewardPoints}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rewardPointsText}>{reward.pointsCost} pts</Text>
        </View>
        {reward.isLocked && (
          <TouchableOpacity 
            style={[
              styles.unlockButton,
              availablePoints < reward.pointsCost && styles.unlockButtonDisabled
            ]}
            disabled={availablePoints < reward.pointsCost}
            onPress={() => handleUnlockReward(reward)}
          >
            <Text style={styles.unlockButtonText}>
              {availablePoints >= reward.pointsCost ? 'Unlock Now' : 'Not Enough Points'}
            </Text>
          </TouchableOpacity>
        )}
        {!reward.isLocked && (
          <View style={styles.unlockedBadge}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.unlockedText}>Unlocked</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rewards & Achievements</Text>
        <View style={styles.pointsDisplay}>
          <Ionicons name="star" size={24} color="#FFD700" />
          <Text style={styles.totalPoints}>{availablePoints} pts</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.achievementsContainer}
        >
          {userAchievements.map(renderAchievementCard)}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Rewards</Text>
        <View style={styles.rewardsContainer}>
          {rewards.map(renderRewardCard)}
        </View>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  pointsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    minWidth: 100,
  },
  totalPoints: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
  achievementsContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  achievementCard: {
    width: width * 0.7,
    marginRight: 15,
    borderRadius: 15,
    padding: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 15,
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
    textAlign: 'right',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    marginLeft: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  rewardsContainer: {
    gap: 15,
  },
  rewardCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  rewardCardLocked: {
    opacity: 0.8,
  },
  rewardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  rewardContent: {
    padding: 15,
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  rewardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  rewardPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rewardPointsText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  unlockButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  unlockButtonDisabled: {
    backgroundColor: '#ccc',
  },
  unlockButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  unlockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  unlockedText: {
    marginLeft: 5,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default RewardsScreen; 