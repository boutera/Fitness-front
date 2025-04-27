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

interface ScheduledWorkout {
  id: string;
  title: string;
  time: string;
  duration: string;
  trainer: string;
  type: string;
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const scheduledWorkouts: ScheduledWorkout[] = [
  {
    id: '1',
    title: 'Morning Yoga',
    time: '07:00 AM',
    duration: '60 min',
    trainer: 'Sarah Johnson',
    type: 'Yoga',
  },
  {
    id: '2',
    title: 'HIIT Training',
    time: '05:30 PM',
    duration: '45 min',
    trainer: 'Mike Thompson',
    type: 'HIIT',
  },
  {
    id: '3',
    title: 'Strength Training',
    time: '02:00 PM',
    duration: '50 min',
    trainer: 'David Wilson',
    type: 'Strength',
  },
];

export const ScheduleScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const generateWeekDates = () => {
    const dates = [];
    const today = new Date();
    const firstDay = new Date(today);
    firstDay.setDate(today.getDate() - today.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDay);
      date.setDate(firstDay.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Schedule</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color="#4c669f" />
        </TouchableOpacity>
      </View>

      {/* Calendar Strip */}
      <View style={styles.calendarStrip}>
        {generateWeekDates().map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateButton,
              isToday(date) && styles.todayButton,
              selectedDate.getDate() === date.getDate() && styles.selectedDate,
            ]}
            onPress={() => setSelectedDate(date)}
          >
            <Text
              style={[
                styles.dayText,
                (isToday(date) || selectedDate.getDate() === date.getDate()) &&
                  styles.selectedText,
              ]}
            >
              {daysOfWeek[date.getDay()]}
            </Text>
            <Text
              style={[
                styles.dateText,
                (isToday(date) || selectedDate.getDate() === date.getDate()) &&
                  styles.selectedText,
              ]}
            >
              {date.getDate()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Scheduled Workouts */}
      <ScrollView style={styles.workoutList}>
        {scheduledWorkouts.map((workout) => (
          <View key={workout.id} style={styles.workoutCard}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{workout.time}</Text>
              <Text style={styles.durationType}>
                {workout.duration} • {workout.type}
              </Text>
            </View>
            <View style={styles.workoutDetails}>
              <Text style={styles.workoutTitle}>{workout.title}</Text>
              <View style={styles.trainerContainer}>
                <Ionicons name="person-outline" size={16} color="#666" />
                <Text style={styles.trainerName}>{workout.trainer}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <Ionicons name="ellipsis-vertical" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Add Workout Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>Schedule Workout</Text>
      </TouchableOpacity>
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
  addButton: {
    padding: 8,
  },
  calendarStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  dateButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  todayButton: {
    backgroundColor: '#e6e6e6',
  },
  selectedDate: {
    backgroundColor: '#4c669f',
  },
  dayText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
  workoutList: {
    flex: 1,
    padding: 20,
  },
  workoutCard: {
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
  timeContainer: {
    width: 80,
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4c669f',
  },
  durationType: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  workoutDetails: {
    flex: 1,
    marginLeft: 15,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  trainerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trainerName: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  moreButton: {
    padding: 8,
  },
  floatingButton: {
    backgroundColor: '#4c669f',
    margin: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 