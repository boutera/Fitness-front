import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { AuthScreen } from '../components/AuthScreen';
import { HomeScreen } from '../components/HomeScreen';
import WorkoutScreen from '../components/WorkoutScreen';
import { ScheduleScreen } from '../components/ScheduleScreen';
import { ProgressScreen } from '../components/ProgressScreen';
import { RewardsScreen } from '../components/RewardsScreen';
import { WorkoutDetailScreen } from '../components/WorkoutDetailScreen';
import { ChallengeDetailScreen } from '../components/ChallengeDetailScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Workout: undefined;
  Schedule: undefined;
  Progress: undefined;
  Rewards: undefined;
  WorkoutDetail: { workoutId: string };
  ChallengeDetail: { challengeId: string };
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Home' : 'Auth'}
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Workout" component={WorkoutScreen} />
            <Stack.Screen name="Schedule" component={ScheduleScreen} />
            <Stack.Screen name="Progress" component={ProgressScreen} />
            <Stack.Screen name="Rewards" component={RewardsScreen} />
            <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
            <Stack.Screen name="ChallengeDetail" component={ChallengeDetailScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 