export type RootStackParamList = {
  Home: undefined;
  ScheduleWorkout: undefined;
  Schedule: {
    newWorkout?: {
      title: string;
      date: Date;
    };
  };
  WorkoutDetail: { workoutId: string };
  Profile: undefined;
  Auth: undefined;
  Challenges: undefined;
  ChallengeDetail: { challengeId: string };
}; 