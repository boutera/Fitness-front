import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../components/HomeScreen';
import { WorkoutScreen } from '../components/WorkoutScreen';
import { ScheduleScreen } from '../components/ScheduleScreen';
import { ProgressScreen } from '../components/ProgressScreen';
import { WorkoutDetailScreen } from '../components/WorkoutDetailScreen';
import ChallengeDetailScreen from '../components/ChallengeDetailScreen';
import { RewardsScreen } from '../components/RewardsScreen';
import type { Workout } from '../components/WorkoutScreen';
import AuthScreen from '../components/AuthScreen';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  currentDay: number;
  totalDays: number;
  requirements: string[];
  rewards: string[];
  tips: string[];
}

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Workout: undefined;
  Schedule: {
    newWorkout?: {
      id: string;
      title: string;
      time: string;
      duration: string;
      trainer: string;
      type: string;
    };
  };
  Progress: undefined;
  Rewards: undefined;
  Profile: undefined;
  WorkoutDetail: {
    workout: Workout;
  };
  ChallengeDetail: {
    challenge: Challenge;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#f5f5f5' },
        }}
      >
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="Rewards" component={RewardsScreen} />
        <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
        <Stack.Screen name="ChallengeDetail" component={ChallengeDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 