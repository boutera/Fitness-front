import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ImageSourcePropType,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Workout } from '../types/workout';
import { workoutService } from '../services/workoutService';

const { width } = Dimensions.get('window');

interface WorkoutCategory {
  id: string;
  title: string;
  icon: string;
}

const categories: WorkoutCategory[] = [
  { id: '1', title: 'Strength', icon: 'fitness-center' },
  { id: '2', title: 'Cardio', icon: 'directions-run' },
  { id: '3', title: 'Yoga', icon: 'self-improvement' },
  { id: '4', title: 'HIIT', icon: 'whatshot' }
];


const WorkoutScreen: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('1');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const data = await workoutService.getAllWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error('Error loading workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderWorkoutItem = ({ item }: { item: Workout }) => (
    <TouchableOpacity
      style={styles.workoutCard}
      onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}
    >
      <Image
        source={ require('../../assets/yoga-flow.png' )}
        style={styles.workoutImage}
        resizeMode="cover"
      />
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutTitle}>{item.title}</Text>
        <Text style={styles.workoutDescription}>{item.description}</Text>
        <View style={styles.workoutMeta}>
          <Text style={styles.workoutDuration}>{item.duration} min</Text>
          <Text style={styles.workoutDifficulty}>{item.difficulty}</Text>
          <Text style={styles.workoutType}>{item.type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Workouts</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item.id && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(item.id)}
          >
            <MaterialIcons
              name={item.icon as any}
              size={24}
              color={selectedCategory === item.id ? '#fff' : '#4c669f'}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item.id && styles.selectedCategoryText,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.categoriesContainer}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Workouts</Text>
      </View>
    </View>
  );

  const renderFooter = () => (
    <TouchableOpacity style={styles.startButton}>
      <Text style={styles.startButtonText}>Start New Workout</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading workouts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        renderItem={renderWorkoutItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  workoutInfo: {
    padding: 16,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  workoutDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  workoutMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  workoutDuration: {
    fontSize: 14,
    color: '#666',
  },
  workoutDifficulty: {
    fontSize: 14,
    color: '#666',
  },
  workoutType: {
    fontSize: 14,
    color: '#666',
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
  listContainer: {
    paddingBottom: 20,
  },
});

export default WorkoutScreen; 