import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';

type ScheduleWorkoutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ScheduleWorkout'>;

const ScheduleWorkoutScreen = () => {
  const navigation = useNavigation<ScheduleWorkoutScreenNavigationProp>();
  const [workoutName, setWorkoutName] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setDate(selectedTime);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSchedule = () => {
    if (workoutName) {
      navigation.navigate('Schedule', {
        newWorkout: {
          title: workoutName,
          date: date,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule Workout</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Workout Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter workout name"
          value={workoutName}
          onChangeText={setWorkoutName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity 
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{formatDate(date)}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Time</Text>
        <TouchableOpacity 
          style={styles.input}
          onPress={() => setShowTimePicker(true)}
        >
          <Text>{formatTime(date)}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onTimeChange}
          />
        )}
      </View>

      <TouchableOpacity 
        style={[styles.scheduleButton, !workoutName && styles.disabledButton]}
        onPress={handleSchedule}
        disabled={!workoutName}
      >
        <Text style={styles.scheduleButtonText}>Schedule Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  scheduleButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScheduleWorkoutScreen; 