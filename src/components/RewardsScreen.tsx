import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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
    points: 800,
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
  const userPoints = 2500;

  const renderAchievementCard = (achievement: Achievement) => (
    <TouchableOpacity 
      key={achievement.id}
      style={[
        styles.achievementCard,
        achievement.isUnlocked && styles.achievementCardUnlocked
      ]}
    >
      <LinearGradient
        colors={achievement.isUnlocked ? ['#4CAF50', '#45a049'] : ['#4c669f', '#3b5998']}
        style={styles.achievementGradient}
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
      </LinearGradient>
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
              userPoints < reward.pointsCost && styles.unlockButtonDisabled
            ]}
            disabled={userPoints < reward.pointsCost}
          >
            <Text style={styles.unlockButtonText}>
              {userPoints >= reward.pointsCost ? 'Unlock Now' : 'Not Enough Points'}
            </Text>
          </TouchableOpacity>
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
          <Text style={styles.totalPoints}>{userPoints} pts</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.achievementsContainer}
        >
          {achievements.map(renderAchievementCard)}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Rewards</Text>
        <View style={styles.rewardsContainer}>
          {rewards.map(renderRewardCard)}
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
    padding: 10,
    borderRadius: 20,
  },
  totalPoints: {
    marginLeft: 8,
    fontSize: 18,
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
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  achievementCardUnlocked: {
    opacity: 0.9,
  },
  achievementGradient: {
    padding: 20,
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
});

export default RewardsScreen; 