import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../components/HomeScreen';
import { WorkoutScreen } from '../components/WorkoutScreen';
import { ScheduleScreen } from '../components/ScheduleScreen';
import { ProgressScreen } from '../components/ProgressScreen';
import { WorkoutDetailScreen } from '../components/WorkoutDetailScreen';
import type { Workout } from '../components/WorkoutScreen';

export type RootStackParamList = {
  Home: undefined;
  Workout: undefined;
  Schedule: undefined;
  Progress: undefined;
  WorkoutDetail: {
    workout: Workout;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#f5f5f5' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 